/* Collab:Media — live format samples (markup + tickers).

   FormatPreviews.mount(el, format) fills an element with the miniature
   for that format's `preview` key and marks it up as a stage;
   FormatPreviews.live(el, on) starts or stops it. Everything visual is
   in format-previews.css — this file only decides which faux page,
   phone, or slot the unit sits in, and runs the two samples that need
   real numbers (a countdown that ticks, a calculator that counts).

   Usage from any page that links format-previews.css:
     FormatPreviews.mount(stageEl, FORMATS[0]);
     stageEl.addEventListener('mouseenter', function(){ FormatPreviews.live(stageEl, true); });     */

(function () {
  'use strict';

  /* ── Skeletons ──────────────────────────────────────────────────── */
  var PATTERN = ['h', '', '85', 'img', '', '70', '', '60', '', 'img', '', '80', '', '65', '', '75'];
  function lines(n, extra) {
    var out = '<div class="fp-lines">' + (extra || '');
    for (var i = 0; i < n; i++) {
      var p = PATTERN[i % PATTERN.length];
      out += p === 'h' ? '<b class="h"></b>' : p === 'img' ? '<b class="img"></b>'
           : p ? '<b style="width:' + p + '%"></b>' : '<b></b>';
    }
    return out + '</div>';
  }
  /* A desktop page: header bar, optional strip under it, a text column,
     and an optional right-hand slot for the unit. */
  function desk(o) {
    o = o || {};
    return '<div class="fp-page' + (o.cls ? ' ' + o.cls : '') + '">' +
      '<div class="fp-bar"><i></i><i></i><i></i><b></b></div>' +
      (o.top || '') +
      '<div class="fp-cols' + (o.colsCls ? ' ' + o.colsCls : '') + '">' +
        (o.content || lines(o.n || 9)) +
        (o.side ? '<div class="fp-side">' + o.side + '</div>' : '') +
      '</div>' + (o.overlay || '') + '</div>';
  }
  function phone(o) {
    o = o || {};
    return '<div class="fp-phone' + (o.cls ? ' ' + o.cls : '') + '">' +
      '<div class="fp-bar"><i></i></div>' +
      (o.noLines ? '' : lines(o.n || 8)) + (o.inner || '') + '</div>';
  }
  function copy(w) { return '<div class="fp-copy"><b></b><b style="width:' + (w || 60) + '%"></b></div>'; }
  function ad(cls, inner, style) { return '<div class="fp-ad ' + cls + '"' + (style ? ' style="' + style + '"' : '') + '>' + inner + '</div>'; }
  function video(extra) { return '<div class="fp-vidbig"><i class="fp-play"></i><i class="fp-prog"></i>' + (extra || '') + '</div>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ── Engines, one per preview key ───────────────────────────────── */
  var E = {
    carousel: function () {
      return desk({ side: ad('fp-carousel',
        '<div class="fp-track">' +
          '<div class="fp-slide s1"><i class="fp-prod"></i><em>New arrivals</em></div>' +
          '<div class="fp-slide s2"><i class="fp-prod" style="border-radius:50%"></i><em>Bundles</em></div>' +
          '<div class="fp-slide s3"><i class="fp-prod" style="border-radius:.3em"></i><em>Best sellers</em></div>' +
        '</div><div class="fp-dots"><i></i><i></i><i></i></div><span class="fp-cta">Shop</span>') });
    },
    flip: function () {
      return desk({ side: ad('fp-flip',
        '<div class="fp-flipcard">' +
          '<div class="fp-face fp-front"><div class="fp-hero"></div><i class="fp-prod"></i><em>Tap to flip</em></div>' +
          '<div class="fp-face fp-back"><strong>20% off</strong><em>this week only</em><span class="fp-cta">Claim</span></div>' +
        '</div>') });
    },
    spin: function () {
      return desk({ side: ad('fp-spin',
        '<div class="fp-hero"></div><i class="fp-pointer"></i><div class="fp-wheel"></div>' +
        '<em class="fp-win">You won 15% off</em><span class="fp-cta fp-spin-btn">SPIN</span>') });
    },
    countdown: function () {
      return desk({ side: ad('fp-countdown',
        '<div class="fp-hero"></div><em>Sale ends in</em>' +
        '<div class="fp-clock"><b data-u="h">02</b><i>:</i><b data-u="m">14</b><i>:</i><b data-u="s">09</b></div>' +
        '<span class="fp-cta">Shop now</span>') });
    },
    hotspot: function () {
      return desk({ side: ad('fp-hotspot',
        '<div class="fp-hero"></div><i class="fp-prod big"></i>' +
        '<i class="fp-dot d1"></i><i class="fp-dot d2"></i><i class="fp-dot d3"></i>' +
        '<div class="fp-tip"><b>Vitamin C serum</b><em>Brighter in 7 days</em></div>') });
    },
    catfish: function () {
      return phone({ inner: ad('fp-catfish',
        '<div class="fp-vid"><i class="fp-play"></i></div>' + copy(60) + '<span class="fp-cta">Watch</span><i class="fp-x"></i>') });
    },
    skinner: function () {
      return desk({ cls: 'fp-skinner', n: 12,
        top: '<div class="fp-skin l"><i class="fp-logo"></i></div><div class="fp-skin r"><span class="fp-cta">Explore</span></div>' });
    },
    takeover: function () {
      return desk({ cls: 'fp-skinner fp-takeover', n: 10,
        top: '<div class="fp-skin l"><i class="fp-logo"></i></div><div class="fp-skin r"><span class="fp-cta">Explore</span></div>' +
             '<div class="fp-mast"><i class="fp-logo"></i>' + copy(50) + '<span class="fp-cta">Launch day</span></div>',
        side: ad('fp-banner', '<div class="fp-hero"></div><i class="fp-logo"></i>' + copy(70) + '<span class="fp-cta">See more</span>') });
    },
    interstitial: function () {
      return phone({ inner: '<div class="fp-inter"><i class="fp-logo"></i><i class="fp-prod"></i><strong>New season.</strong>' +
        '<span class="fp-cta">Discover</span><em>Skip · 5</em></div>' });
    },
    expand: function () {
      return phone({ inner: ad('fp-expand',
        '<i class="fp-logo"></i><em class="fp-teaser-copy">Tap to expand</em><em class="fp-teaser-hint">▸</em>' +
        '<div class="fp-more"><i class="fp-prod"></i><strong>The full story.</strong><span class="fp-cta">Explore</span></div>') });
    },
    balloon: function () {
      return desk({ n: 12, overlay: '<i class="fp-balloon"><b>?</b></i>' +
        '<div class="fp-balloon-full"><i class="fp-prod"></i><strong>Hello, KL.</strong><span class="fp-cta">See offers</span></div>' });
    },
    shopvideo: function () {
      return desk({ side: ad('fp-shop', video() +
        '<i class="fp-ptag t1"><b>RM 89</b></i><i class="fp-ptag t2"><b>RM 149</b></i><span class="fp-cart">2</span>') });
    },
    teaser: function () {
      return desk({ side: ad('fp-teaser', video() + '<span class="fp-cta">Watch the full film</span>') });
    },
    chat: function () {
      return desk({ side: ad('fp-chat',
        '<div class="fp-msgs"><p class="bot">Hi! Looking for a plan?</p><p class="me">Family, 4 lines</p><p class="bot">Try Family 5G · RM 148</p></div>' +
        '<div class="fp-input"><b></b><span class="fp-cta">Send</span></div>') });
    },
    gallery: function () {
      return desk({ side: ad('fp-gallery',
        '<div class="fp-gal"><div class="fp-tile"><i class="fp-prod"></i></div><div class="fp-tile"><i class="fp-prod" style="border-radius:50%"></i></div>' +
        '<div class="fp-tile"><i class="fp-prod" style="border-radius:.3em"></i></div><div class="fp-tile"><i class="fp-prod"></i></div></div>' +
        '<div class="fp-galfull"><i class="fp-prod"></i><span class="fp-cta">View range</span><i class="fp-x"></i></div>') });
    },
    sticky: function () {
      return desk({ cls: 'fp-scroll', n: 16, overlay: '<div class="fp-note">Code: FRESH20<em>Use at checkout</em></div>' });
    },
    flipbook: function () {
      return desk({ side: ad('fp-book',
        '<div class="fp-pg">' + copy(70) + '<i class="fp-prod"></i></div>' +
        '<div class="fp-pg"><div class="fp-leaf"><div class="fp-leaf-front"><i class="fp-prod" style="border-radius:50%"></i>' + copy(50) + '</div>' +
        '<div class="fp-leaf-back">' + copy(80) + '</div></div>' + copy(60) + '<i class="fp-prod" style="border-radius:.3em"></i></div>') });
    },
    tiltpop: function () {
      return desk({ side: ad('fp-tilt',
        '<div class="fp-tcards"><div class="fp-tcard"><i class="fp-prod"></i></div><div class="fp-tcard"><i class="fp-prod" style="border-radius:50%"></i></div>' +
        '<div class="fp-tcard"><i class="fp-prod" style="border-radius:.3em"></i></div></div>') });
    },
    audio: function () {
      var bars = '';
      for (var i = 0; i < 18; i++) {
        var h = 20 + ((i * 37) % 70);
        bars += '<i style="height:' + h + '%; animation-delay:-' + ((i * 113) % 700) + 'ms"></i>';
      }
      return desk({ side: ad('fp-audio', '<div class="fp-hero"></div><i class="fp-playbtn"></i><div class="fp-wave">' + bars + '</div><em>0:12 / 0:30</em>') });
    },
    wave: function () {
      return desk({ side: ad('fp-wave-ad',
        '<div class="fp-wcards"><div class="fp-wcard"><i class="fp-prod"></i><b></b></div><div class="fp-wcard"><i class="fp-prod" style="border-radius:50%"></i><b></b></div>' +
        '<div class="fp-wcard"><i class="fp-prod" style="border-radius:.3em"></i><b></b></div><div class="fp-wcard"><i class="fp-prod"></i><b></b></div></div>') });
    },
    quiz: function () {
      return desk({ side: ad('fp-quiz',
        '<em class="fp-q">Which car suits you?</em><div class="fp-opts"><b>City runs</b><b>Family trips</b><b>Weekend drives</b></div>' +
        '<div class="fp-result"><strong>Your match: Family SUV</strong><span class="fp-cta">See it</span></div>') });
    },
    shapes: function () {
      return desk({ side: ad('fp-shapes',
        '<div class="fp-hero"></div><i class="fp-sh c"></i><i class="fp-sh s"></i><i class="fp-sh t"></i><i class="fp-sh p"></i><strong>Fresh. Every day.</strong>') });
    },
    mystery: function () {
      return desk({ side: ad('fp-mystery',
        '<div class="fp-hero"></div><div class="fp-box"><div class="fp-lid"></div><div class="fp-gift">20%<br>off</div></div>') });
    },
    tabs: function () {
      return desk({ side: ad('fp-tabs',
        '<div class="fp-tabbar"><b>Plans</b><b>Perks</b><b>Sign up</b><i class="fp-ink"></i></div>' +
        '<div class="fp-panels">' +
          '<div class="fp-panel p1"><i class="fp-prod"></i>' + copy(70) + '<span class="fp-cta">Compare</span></div>' +
          '<div class="fp-panel p2"><div class="fp-checks"><b></b><b></b><b></b></div></div>' +
          '<div class="fp-panel p3">' + copy(90) + '<span class="fp-cta">Join</span></div>' +
        '</div>') });
    },
    puzzle: function () {
      return desk({ side: ad('fp-puzzle',
        '<div class="fp-pz"><i></i><i></i><i class="m1"></i><i></i><i></i><i></i><i class="m2"></i><i></i><i></i></div><em class="fp-solved">Solved!</em>') });
    },
    form: function () {
      return desk({ side: ad('fp-form',
        '<em class="fp-q">Get a free sample</em>' +
        '<span class="fp-lbl">Name</span>' +
        '<div class="fp-field f1"><span class="fp-typed">Aisyah Rahman</span></div>' +
        '<span class="fp-lbl">Email</span>' +
        '<div class="fp-field f2"><span class="fp-typed">aisyah@mail.com</span></div>' +
        '<label class="fp-chk"><i></i>Keep me posted</label>' +
        '<span class="fp-cta">Submit</span>' +
        '<div class="fp-done"><strong>Thanks, Aisyah!</strong><em>Sample on its way</em></div>') });
    },
    calc: function () {
      return desk({ side: ad('fp-calc',
        '<em class="fp-q">Loan calculator</em><div class="fp-slider"><b></b><i></i></div><div class="fp-slider s2"><b></b><i></i></div>' +
        '<div class="fp-out"><em>Monthly</em><strong data-from="980" data-to="1460">RM 980</strong></div><span class="fp-cta">Apply</span>') });
    },
    cube: function () {
      return desk({ side: ad('fp-cubewrap',
        '<div class="fp-hero"></div><div class="fp-cube"><div class="f f1"><i class="fp-prod"></i></div><div class="f f2"><i class="fp-prod" style="border-radius:50%"></i></div>' +
        '<div class="f f3"></div><div class="f f4"><i class="fp-prod" style="border-radius:.3em"></i></div></div>') });
    },
    collector: function () {
      return phone({ inner: ad('fp-collect',
        '<div class="fp-hero"></div><i class="fp-fall a"></i><i class="fp-fall b"></i><i class="fp-fall c"></i><div class="fp-basket"></div>' +
        '<span class="fp-score"><b class="n0">0</b><b class="n1">1</b><b class="n2">2</b><b class="n3">3</b></span>') });
    },
    invaders: function () {
      var aliens = ''; for (var i = 0; i < 9; i++) aliens += '<i></i>';
      return phone({ inner: ad('fp-inv',
        '<span class="fp-lvl">SCORE 120</span><div class="fp-aliens">' + aliens + '</div><i class="fp-bullet"></i><i class="fp-ship"></i>') });
    },
    slider: function () {
      return desk({ side: ad('fp-cross',
        '<div class="fp-before"><i class="fp-prod"></i><em>Before</em></div><div class="fp-after"><i class="fp-prod"></i><em>After</em></div><i class="fp-handle"></i>') });
    },
    social: function (f) {
      var isVideo = /video/i.test(f.name);
      return desk({ side: ad('fp-social',
        '<div class="fp-shead"><i></i><b></b></div>' +
        '<div class="fp-simg"><i class="fp-prod"></i>' + (isVideo ? '<i class="fp-play"></i>' : '') + '</div>' +
        '<div class="fp-sfoot"><i class="ph-fill ph-heart fp-heart"></i><span class="fp-likes"><b class="l0">1.2k</b><b class="l1">1.3k</b></span><span class="fp-cta">Shop</span></div>') });
    },
    tiktok: function () {
      return phone({ noLines: true, inner: '<div class="fp-tt"><div class="fp-ttvid"></div><div class="fp-ttside"><i></i><i></i><i></i></div>' +
        '<div class="fp-ttcard"><i class="fp-logo"></i>' + copy(50) + '<span class="fp-cta">Shop</span></div></div>' });
    },
    dynvideo: function () {
      return desk({ side: ad('fp-dyn',
        '<div class="fp-frame"><i class="fp-logo"></i><div class="fp-msgs2"><b>KL · from RM 99</b><b>Penang · from RM 89</b><b>JB · from RM 79</b></div></div>' + video()) });
    },
    instream: function () {
      return desk({ top: '<div class="fp-player">' + video('<em class="fp-adlbl">Ad · Skip in 5</em>') + '</div>', colsCls: 'fp-under', n: 5 });
    },
    inread: function () {
      return desk({ n: 6, content: lines(3, '') .replace('</div>', '') +
        '<div class="fp-ad fp-inread">' + video('<em class="fp-adlbl">Ad · 0:06</em>') + '</div>' +
        lines(8).replace('<div class="fp-lines">', '') });
    },
    inbanner: function () {
      return desk({ side: ad('fp-inbanner', video() + '<div class="fp-under2">' + copy(60) + '<span class="fp-cta">Learn more</span></div>') });
    },
    booking: function () {
      var cells = ''; for (var i = 0; i < 21; i++) cells += '<i' + (i === 10 ? ' class="pick"' : '') + '></i>';
      return desk({ side: ad('fp-book2',
        '<em class="fp-q">Book a test drive</em><div class="fp-cal">' + cells + '</div>' +
        '<div class="fp-times"><b>10:00</b><b class="pick">14:00</b><b>16:30</b></div>' +
        '<span class="fp-cta"><s>Book</s><u>Booked ✓</u></span>') });
    },
    /* Standard display: the unit drawn at its real proportion, in the
       slot it really occupies. */
    banner: function (f) {
      var dim = parseSize((f.sizes || [])[0]) || { w: 300, h: 250 };
      var ratio = dim.w / dim.h;
      var inner = '<div class="fp-hero"></div><i class="fp-logo"></i>' + copy(70) +
        (ratio < 0.8 ? '<i class="fp-prod"></i>' : '') +
        '<span class="fp-cta">Learn more</span><em class="fp-size">' + esc(f.sizes[0]) + '</em><i class="fp-sheen"></i>';
      var ar = 'aspect-ratio:' + dim.w + '/' + dim.h + ';';
      if (f.mobile) {
        var atTop = /leaderboard/i.test(f.name);
        return phone({ n: 9, inner: ad('fp-banner wide' + (atTop ? ' at-top' : ''), inner, ar + 'height:auto;') });
      }
      if (ratio >= 2.4) {
        return desk({ top: '<div class="fp-strip">' + ad('fp-banner wide', inner, ar) + '</div>', colsCls: 'fp-after-strip', n: 7 });
      }
      var style = ar + (ratio < 0.8 ? 'height:96%; width:auto; margin:0 auto;' : '');
      return desk({ side: ad('fp-banner' + (ratio < 0.8 ? ' tall' : ''), inner, style) });
    }
  };

  function parseSize(s) {
    var m = /(\d+)\s*[×x]\s*(\d+)/.exec(s || '');
    return m ? { w: +m[1], h: +m[2] } : null;
  }

  /* ── Tickers: the two samples that need real numbers ────────────── */
  var TICK = {
    countdown: function (el) {
      var h = el.querySelector('[data-u="h"]'), m = el.querySelector('[data-u="m"]'), s = el.querySelector('[data-u="s"]');
      if (!h) return null;
      var t = 2 * 3600 + 14 * 60 + 9;
      var id = setInterval(function () {
        t -= 1; if (t < 0) t = 0;
        h.textContent = pad(Math.floor(t / 3600)); m.textContent = pad(Math.floor(t % 3600 / 60)); s.textContent = pad(t % 60);
      }, 1000);
      return function () { clearInterval(id); h.textContent = '02'; m.textContent = '14'; s.textContent = '09'; };
    },
    calc: function (el) {
      var out = el.querySelector('.fp-out strong');
      if (!out) return null;
      var from = +out.dataset.from, to = +out.dataset.to, start = null, raf = 0, stopped = false;
      function step(ts) {
        if (stopped) return;
        if (!start) start = ts;
        var p = Math.min(1, (ts - start - 300) / 1600);
        if (p > 0) {
          var e = 1 - Math.pow(1 - p, 3);
          out.textContent = 'RM ' + Math.round(from + (to - from) * e).toLocaleString('en-MY');
        }
        if (p < 1) raf = requestAnimationFrame(step);
      }
      raf = requestAnimationFrame(step);
      return function () { stopped = true; cancelAnimationFrame(raf); out.textContent = 'RM ' + from.toLocaleString('en-MY'); };
    }
  };
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.FormatPreviews = {
    html: function (f) { return (E[f.preview] || E.banner)(f); },
    mount: function (el, f) {
      el.classList.add('fp-stage');
      el.setAttribute('data-family', f.family);
      el.setAttribute('data-preview', f.preview);
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = this.html(f);
      if (el._fpStop) { el._fpStop(); el._fpStop = null; }
      el.classList.remove('is-live');
    },
    live: function (el, on) {
      if (!el) return;
      if (el._fpStop) { el._fpStop(); el._fpStop = null; }
      el.classList.toggle('is-live', !!on);
      var t = TICK[el.getAttribute('data-preview')];
      if (on && t) el._fpStop = t(el);
    },
    parseSize: parseSize
  };
})();
