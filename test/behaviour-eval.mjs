/* Collab AI behaviour eval.
   ─────────────────────────────────────────────────────────────────────
   NOT a unit test, and deliberately not named *.test.mjs so `npm test`
   never picks it up. This one costs money: about thirty live calls, a
   ringgit or so. Run it on demand, after changing the prompt:

     node --env-file=.env.local test/behaviour-eval.mjs
     node --env-file=.env.local test/behaviour-eval.mjs --only=what-if

   The unit tests prove the prompt SAYS the right things. Only this
   proves the model DOES them. The cases come from
   docs/superpowers/specs/2026-09-17-assistant-behaviours.md, which was
   written by working through a media seller's day.

   What is checked mechanically: whether it acted when it should have and
   stayed still when it should not, whether every id it named is real,
   and whether numbers it quoted match the catalogue. Tone is printed for
   a person to read, not graded by another model, because thirty samples
   is few enough to read and a grader would only add its own opinion. */
import handler from '../api/plan.mjs';

/* A realistic slice of the rate card rather than the whole thing: enough
   variety to ask real questions, small enough to read a failure. */
const CATALOGUE = {
  channels: ['OTT', 'Social', 'Web', 'Video', 'Audio'],
  formats: [
    { id: 'isv', name: 'In-stream Video', ch: 'Web', cpm: 25, video: true },
    { id: 'sva', name: 'Video Social Ad', ch: 'Social', cpm: 9, video: true },
    { id: 'ldb', name: 'Leaderboard', ch: 'Web', cpm: 18, video: false },
    { id: 'hlf', name: 'Half Page', ch: 'Web', cpm: 18, video: false },
    { id: 'cat', name: 'Catfish Ad', ch: 'Web', cpm: 30, video: false },
    { id: 'ott', name: 'OTT', ch: 'OTT', cpm: 26, video: true, placeholder: true },
    { id: 'tvc', name: 'Video', ch: 'Video', cpm: 3.26, video: true },
    { id: 'rad', name: 'Audio', ch: 'Audio', cpm: 6.61, video: false },
  ],
  personas: [
    { id: 'cl', name: 'Comedy lover', cat: 'Entertainment', users: 204600, video: 67, social: 70 },
    { id: 'al', name: 'Active lifestyle seekers', cat: 'Lifestyle', users: 2850000, video: 54, social: 63 },
    { id: 'kd', name: 'K-drama watchers', cat: 'Entertainment', users: 512000, video: 58, social: 65 },
    { id: 'ai', name: 'Automotive intent', cat: 'Automotive', users: 34700, video: 49, social: 55 },
  ],
  sites: [
    { id: 'awani', name: 'Awani', ch: 'Web', cpm: 10, inv: 18400000 },
    { id: 'sooka', name: 'sooka', ch: 'OTT', cpm: 30, inv: 13200000 },
    { id: 'gempaks', name: 'Astro Gempak', ch: 'Social', cpm: 18, inv: 406900000 },
  ],
};

/* A plan already in progress, so the questions that read the plan have
   something to read. Budget fully placed across two formats. */
const PLAN = JSON.stringify({
  step: 3,
  campaign: { name: 'Shopee 11.11 teaser', brand: 'Shopee', product: '11.11 mega sale',
    start: '2026-09-25', end: '2026-10-09', days: 14, budget: 200000,
    objective: 'awareness', kpi: 'Net reach', target: 2000000, unit: 'people',
    languages: ['Bahasa Malaysia', 'English'] },
  audience: { mode: 'personas', personas: ['cl', 'al'], refiners: {},
    uniqueReach: 3054600, overlapPct: 0, intent: '', exclude: '' },
  mix: { channels: ['OTT', 'Social', 'Web', 'Video', 'Audio'],
    formats: [{ id: 'isv', budget: 120000 }, { id: 'sva', budget: 80000 }],
    mustBuySites: ['awani'], splitIsUserShaped: false },
  forecast: { impressions: 13688889, blendedCpm: 15, netReach: 2000000,
    frequency: 3.1, allocated: 200000, unallocated: 0 },
  booked: false,
});

const KNOWN = {
  formats: new Set(CATALOGUE.formats.map((f) => f.id)),
  personas: new Set(CATALOGUE.personas.map((p) => p.id)),
  sites: new Set(CATALOGUE.sites.map((s) => s.id)),
  channels: new Set(CATALOGUE.channels),
};

/* acts: true means it must change something, false means it must not,
   'any' means either is defensible and we only check the ids.
   says / never: substrings, matched case-insensitively with whitespace
   flattened, because the model line-wraps. */
const CASES = [
  // 2. What have we got
  { group: 'inventory', ask: 'What is the cheapest video format?', acts: false, says: ['3.26'] },
  { group: 'inventory', ask: 'What does a Catfish Ad cost?', acts: false, says: ['30'] },
  { group: 'inventory', ask: 'Which formats do we have on Web?', acts: false,
    says: ['leaderboard', 'half page'] },
  { group: 'inventory', ask: 'What is our biggest site by inventory?', acts: false,
    says: ['gempak'] },
  /* Whether it invented a billboard rate is a judgement, not a substring:
     an earlier version of this check failed the model for saying "RM 30",
     which is Catfish, a real rate it was right to quote. Actions and ids
     are checked; the wording is printed for a person to read. */
  { group: 'inventory', ask: 'What is the CPM of a billboard?', acts: false },
  { group: 'inventory', ask: 'Is the OTT rate firm?', acts: false, says: ['placeholder'] },

  // 3. Who should I target
  { group: 'audience', ask: 'Which persona watches the most video?', acts: false,
    says: ['comedy lover', '67'] },
  { group: 'audience', ask: 'How big is K-drama watchers?', acts: false, says: ['512,000'] },
  { group: 'audience', ask: 'Who would you pick for a car launch?', acts: false,
    says: ['automotive'] },

  // 4. Do the sums
  { group: 'sums', ask: 'What is my blended CPM?', acts: false, says: ['15'] },
  { group: 'sums', ask: 'How much of the budget is unallocated?', acts: false, says: ['0'] },
  { group: 'sums', ask: 'Am I hitting the reach target?', acts: false, says: ['2,000,000'] },
  { group: 'sums', ask: 'What is this costing me per person reached?', acts: false },

  // 5. Change this
  { group: 'change', ask: 'Add OTT.', acts: true, ops: ['channels_on', 'add_formats'] },
  { group: 'change', ask: 'Drop the leaderboard.', acts: 'any' },
  { group: 'change', ask: 'Move 20% of the budget from In-stream Video to Video Social Ad.',
    acts: true, ops: ['set_split'] },
  { group: 'change', ask: 'Make it six weeks.', acts: true, ops: ['set_fields'] },
  { group: 'change', ask: 'Swap Comedy lover for K-drama watchers.', acts: true,
    ops: ['set_personas'] },
  { group: 'change', ask: 'Push the budget to 300k.', acts: true, ops: ['set_fields'] },
  { group: 'change', ask: 'Pin Awani as a must buy.', acts: 'any' },

  // 6. Is this any good
  { group: 'judgement', ask: 'Is this plan any good?', acts: false },
  { group: 'judgement', ask: 'What would you change about it?', acts: false },
  { group: 'judgement', ask: 'What am I missing here?', acts: false },

  // 7. What if. The sharpest rule: answer, never act.
  { group: 'what-if', ask: 'What if we went social only?', acts: false },
  { group: 'what-if', ask: 'Show me a cheaper version.', acts: false },
  { group: 'what-if', ask: 'What would a video-led plan look like?', acts: false },
  { group: 'what-if', ask: 'Would it be better with OTT in it?', acts: false },

  // 8. Help me defend it
  { group: 'defend', ask: 'Write me a short paragraph explaining this plan to the client.',
    acts: false },
  { group: 'defend', ask: 'The client says it is too expensive. What do I cut?', acts: false },

  // 9. Take me there
  { group: 'navigate', ask: 'Take me to the media mix.', acts: true, ops: ['go_to_step'] },
  { group: 'navigate', ask: 'Save this plan for me.', acts: false, says: ['save'] },

  // 10. Somewhere else entirely
  { group: 'scope', ask: 'How much is a flight to Penang?', acts: false, oneLine: true },
  { group: 'scope', ask: 'What are KFC prices these days?', acts: false, oneLine: true },
  { group: 'scope', ask: 'Write me a Python script to sort a list.', acts: false, oneLine: true },
  { group: 'scope', ask: 'What is the weather tomorrow?', acts: false, oneLine: true },
];

const flat = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ');

function fakeRes() {
  const r = { code: 0, body: null };
  r.setHeader = () => {};
  r.status = (c) => { r.code = c; return r; };
  r.json = (b) => { r.body = b; return r; };
  return r;
}

/* Every id the envelope names, whatever the op, so one check covers the
   whole vocabulary rather than one branch per op. */
function idsUsed(actions) {
  const out = { formats: [], personas: [], sites: [], channels: [] };
  for (const a of actions || []) {
    if (a.op === 'add_formats' || a.op === 'remove_formats') out.formats.push(...(a.ids || []));
    if (a.op === 'set_personas') out.personas.push(...(a.ids || []));
    if (a.op === 'pin_sites') out.sites.push(...(a.ids || []));
    if (a.op === 'channels_on' || a.op === 'channels_off') out.channels.push(...(a.channels || []));
    if (a.op === 'set_split' && Array.isArray(a.split)) out.formats.push(...a.split.map((e) => e.id));
  }
  return out;
}

function judge(c, env) {
  const problems = [];
  const acted = (env.actions || []).length > 0;

  if (c.acts === true && !acted) problems.push('should have acted and did not');
  if (c.acts === false && acted) {
    problems.push('acted when it should have answered: ' +
      (env.actions || []).map((a) => a.op).join(', '));
  }
  if (c.ops && acted) {
    const got = new Set((env.actions || []).map((a) => a.op));
    const wanted = c.ops.filter((o) => got.has(o));
    if (!wanted.length) problems.push('expected one of ' + c.ops.join('/') + ', got ' + [...got].join(', '));
  }

  const used = idsUsed(env.actions);
  for (const kind of ['formats', 'personas', 'sites', 'channels']) {
    for (const id of used[kind]) {
      if (!KNOWN[kind].has(id)) problems.push('invented ' + kind.slice(0, -1) + ' id: ' + id);
    }
  }

  const said = flat(env.say);
  for (const phrase of c.says || []) {
    if (!said.includes(flat(phrase))) problems.push('never mentioned "' + phrase + '"');
  }
  for (const phrase of c.never || []) {
    if (said.includes(flat(phrase))) problems.push('mentioned "' + phrase + '", which it cannot know');
  }
  if (c.oneLine) {
    const sentences = (env.say.match(/[.!?](\s|$)/g) || []).length;
    if (sentences > 2) problems.push('declined in ' + sentences + ' sentences, wanted one or two');
  }
  return problems;
}

const only = (process.argv.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const cases = only ? CASES.filter((c) => c.group === only) : CASES;

console.log('Collab AI behaviour eval: ' + cases.length + ' live calls\n');

let pass = 0;
const failures = [];
const broken = [];

for (const c of cases) {
  const res = fakeRes();
  await handler({
    method: 'POST',
    body: { mode: 'chat', catalogue: CATALOGUE, plan: PLAN,
      messages: [{ role: 'user', content: c.ask }] },
  }, res);

  /* A transport failure is not a behaviour failure. Counting it as one
     would have the eval reporting that the model misbehaved when in fact
     it never got asked. Kept separate so the score means what it says. */
  if (res.code !== 200 || !res.body || typeof res.body.say !== 'string') {
    broken.push({ ask: c.ask, detail: JSON.stringify(res.body) });
    console.log('~ [' + c.group + '] ' + c.ask + '  (endpoint ' + res.code + ', not judged)');
    continue;
  }

  const problems = judge(c, res.body);
  const ops = (res.body.actions || []).map((a) => a.op).join(', ') || 'no actions';
  if (problems.length) {
    failures.push({ c, problems, say: res.body.say, ops });
    console.log('✖ [' + c.group + '] ' + c.ask);
    problems.forEach((p) => console.log('    ' + p));
  } else {
    pass++;
    console.log('✔ [' + c.group + '] ' + c.ask + '  (' + ops + ')');
  }
  console.log('    say: ' + res.body.say.replace(/\s+/g, ' ').slice(0, 150));
}

const judged = cases.length - broken.length;
console.log('\n' + pass + ' of ' + judged + ' behaved as specified' +
  (broken.length ? '  (' + broken.length + ' never reached the model)' : ''));
if (broken.length) {
  console.log('\nNot judged, the endpoint failed before the model saw them:');
  broken.forEach((b) => console.log('  ' + b.ask + '\n    ' + b.detail));
}
if (failures.length) {
  console.log('\nFailures worth reading in full:\n');
  for (const f of failures) {
    console.log('[' + f.c.group + '] ' + f.c.ask);
    f.problems.forEach((p) => console.log('  ' + p));
    if (f.say) console.log('  said: ' + f.say.replace(/\s+/g, ' '));
    console.log('');
  }
}
process.exit(failures.length ? 1 : 0);
