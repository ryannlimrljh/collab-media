/* Collab:Media — ad format catalogue.

   Every unit KULT can run, in one list. Specs (objective, sizes, devices,
   industries, benchmark) are transcribed from each format's page on
   kult.my/gallery on 2026-09-07; "bestFor", "cpm" and "inventory" come from
   the planner's rate card (Karen's catalogue) and are null when nothing is
   on file. The nine standard display units have no gallery page, so their
   copy and sizes are catalogue defaults (source: "catalogue") — verify
   before quoting them to a client.

   preview  — which live sample the format-previews module renders
   mobile   — the sample plays inside a phone frame rather than a page
   funnel   — the gallery's own filter tags: awareness, consideration,
              conversion, leadgen, game, video, high-impact           */
window.FORMAT_FAMILIES = ['Interactive', 'Gamification', 'Video', 'Social', 'High impact', 'Display'];
window.FORMAT_FUNNEL = [
  { key: 'awareness',     label: 'Awareness' },
  { key: 'consideration', label: 'Consideration' },
  { key: 'conversion',    label: 'Conversion' },
  { key: 'leadgen',       label: 'Lead gen' },
  { key: 'game',          label: 'Gamification' },
  { key: 'video',         label: 'Video' },
  { key: 'high-impact',   label: 'High impact' }
];
/* KULT's five gallery highlights. Nothing renders these since the Recently
   live wall came off the page on 2026-09-09; kept because the campaigns and
   the units they ran on are transcribed fact, not layout. */
window.FORMAT_SHOWCASES = [
  {
    "brand": "Marigold",
    "formats": [
      "shape-drop"
    ],
    "label": "Animation engagement ad",
    "domain": "marigold.com.my"
  },
  {
    "brand": "Eucerin",
    "formats": [
      "hotspot-interactive"
    ],
    "label": "Hotspot ad",
    "domain": "eucerin.com"
  },
  {
    "brand": "TNB",
    "formats": [
      "skinner",
      "countdown"
    ],
    "label": "Skinner PC + Countdown",
    "domain": "tnb.com.my"
  },
  {
    "brand": "Peel Fresh",
    "formats": [
      "shape-drop",
      "balloon-ad"
    ],
    "label": "Animated + location ad",
    "domain": "marigold.com.my"
  },
  {
    "brand": "KFC",
    "formats": [
      "video-in-banner"
    ],
    "label": "Video in banner",
    "domain": "kfc.com.my"
  }
];
window.FORMATS = [
 {
  "id": "calculator-ad",
  "name": "Calculator Ad",
  "family": "Interactive",
  "tagline": "Let users key in their own numbers within their own budget and see instant, personalised results inside the ad.",
  "desc": "This is built for categories like finance, telco, automotive, insurance, property where comparison drives conversion.",
  "objective": "Consideration + Leads",
  "funnel": [
   "consideration",
   "conversion",
   "leadgen"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Banking",
   "Insurance",
   "Property"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/calculator-ad/",
  "preview": "calc",
  "source": "kult",
  "bestFor": "Consideration, leads",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "carousel-ad",
  "name": "Carousel Ad",
  "family": "Interactive",
  "tagline": "Showcase multiple products, features or stories in a single swipeable unit.",
  "desc": "This ad is perfect for ranges, bundles and campaigns that need more than one frame to land the message.",
  "objective": "Product Browsing + CTR",
  "funnel": [
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "E-commerce",
   "Fashion",
   "Retail"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/carousel-ad/",
  "preview": "carousel",
  "source": "kult",
  "bestFor": "Product browsing, CTR",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "catfish-ad",
  "name": "Catfish Ad",
  "family": "High impact",
  "tagline": "A bold video unit that slides up from the bottom of the mobile screen to demand attention.",
  "desc": "This is ideal for time-sensitive promotions and product launches where you need users to notice you NOW.",
  "objective": "Persistent Interaction",
  "funnel": [
   "high-impact",
   "awareness",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "320×100"
  ],
  "industries": [
   "Banks",
   "Property",
   "Retail"
  ],
  "benchmark": "CTR 1.00%",
  "demo": "https://kult.my/catfish-ad/",
  "preview": "catfish",
  "source": "kult",
  "bestFor": "Persistent interaction",
  "inventory": 11.4,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "countdown",
  "name": "Countdown",
  "family": "Interactive",
  "tagline": "Embed a live countdown timer into your creative to build urgency.",
  "desc": "Countdown Ad is made for sales, events and limited-time offers where every hour to deadline matters.",
  "objective": "Conversion & Launch",
  "funnel": [
   "conversion",
   "awareness"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Automotive",
   "E-commerce",
   "FMCG",
   "Telecommunications"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/countdown/",
  "preview": "countdown",
  "source": "kult",
  "bestFor": "Conversion, launch",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "cross-slider",
  "name": "Cross Slider",
  "family": "Interactive",
  "tagline": "This is made for transformation stories and upgrades where the difference speaks for itself.",
  "desc": "Good for the industries like interior designing, painting, renovation.",
  "objective": "Showcase Multiple Messages",
  "funnel": [
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Beauty",
   "Finance",
   "Property"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/cross-slider-ad/",
  "preview": "slider",
  "source": "kult",
  "bestFor": "Showcase multiple messages",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "cubevibe",
  "name": "CubeVibe",
  "family": "Interactive",
  "tagline": "A rotating 3D cube that showcases up to four clickable faces.",
  "desc": "This is great for highlighting different variants or hero products in one eye-catching interactive unit.",
  "objective": "Rich Media + Interaction",
  "funnel": [
   "high-impact",
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Automotive",
   "Retail",
   "Tech"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/cubevibe/",
  "preview": "cube",
  "source": "kult",
  "bestFor": "Rich media, interaction",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "data-capture",
  "name": "Data Capture",
  "family": "Interactive",
  "tagline": "A lead-gen unit with a built-in form so users can sign up without leaving the page.",
  "desc": "This is ideal for newsletters, samples, trials, contest entries and CRM growth.",
  "objective": "Lead Gen / CRM / Sign-up",
  "funnel": [
   "leadgen",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Automotive",
   "Banking",
   "B2B",
   "Property"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/data-capture/",
  "preview": "form",
  "source": "kult",
  "bestFor": "Lead gen, CRM, sign-up",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "hotspot-interactive",
  "name": "Hotspot Interactive",
  "family": "Interactive",
  "tagline": "Let users tap hotspots on your visual to unlock extra content, features or offers.",
  "desc": "Perfect for complex products, hero visuals and campaigns that reward curiosity.",
  "objective": "Engagement",
  "funnel": [
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Beauty",
   "E-commerce",
   "Travel"
  ],
  "benchmark": "CTR 0.15%",
  "demo": "https://kult.my/hotspot/",
  "preview": "hotspot",
  "source": "kult",
  "bestFor": "Engagement",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "interstitial",
  "name": "Interstitial",
  "family": "High impact",
  "tagline": "A high-impact full-screen placement that appears between content, putting your brand moment as the focus on desktop and mobile.",
  "desc": "Ideal for launches, promos and key visuals where you want users’ undivided attention before they scroll away.",
  "objective": "High-impact Awareness",
  "funnel": [
   "high-impact",
   "awareness",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "320×480",
   "800×600"
  ],
  "industries": [
   "Automotive",
   "Telco",
   "Travel"
  ],
  "benchmark": "CTR 0.40%",
  "demo": "https://kult.my/interstitial/",
  "preview": "interstitial",
  "source": "kult",
  "bestFor": "High-impact awareness",
  "inventory": 11.4,
  "cpm": 20,
  "mobile": true
 },
 {
  "id": "merryview",
  "name": "MerryView",
  "family": "Interactive",
  "tagline": "A 3D-style product gallery that users can scroll or swipe through.",
  "desc": "This gives your range a premium, editorial feel: ideal for launches, seasonal collections and curated edits.",
  "objective": "Rich Media Branding",
  "funnel": [
   "high-impact",
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Beauty",
   "E-commerce",
   "FMCG"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/merryview/",
  "preview": "cube",
  "source": "kult",
  "bestFor": "Rich media branding",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "mini-game",
  "name": "Mini Game",
  "family": "Gamification",
  "tagline": "Turn your campaign into a quick, snackable game that lives inside the ad.",
  "desc": "This boosts interaction and time spent with your brand, then closes with a strong call-to-action or brand recall.",
  "objective": "Engagement / Interaction",
  "funnel": [
   "game",
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "320×480",
   "300×600"
  ],
  "industries": [
   "FMCG",
   "Gaming",
   "Youth Brands"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/mini-game/",
  "preview": "invaders",
  "source": "kult",
  "bestFor": "Engagement, interaction",
  "inventory": 11.4,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "multi-tab",
  "name": "Multi-tab",
  "family": "Interactive",
  "tagline": "One ad, multiple tabs.",
  "desc": "Multi Tab lets users switch between different products, plans or messages within a single unit, keeping your campaign tidy while still telling the full story.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Automotive",
   "Home & Living",
   "Retail & E-commerce"
  ],
  "benchmark": null,
  "demo": "https://kult.my/multi-tab/",
  "preview": "tabs",
  "source": "kult",
  "bestFor": "Consideration, information depth",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "product-collector",
  "name": "Product Collector",
  "family": "Gamification",
  "tagline": "A fun game where users “collect” your products as they play.",
  "desc": "Designed to build affinity and familiarity with your range, ending with a clear path to hit the objective.",
  "objective": "E-commerce Product Browsing",
  "funnel": [
   "consideration",
   "conversion",
   "leadgen"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "320×480",
   "300×600"
  ],
  "industries": [
   "Fashion",
   "FMCG",
   "Retail"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/product-collector/",
  "preview": "collector",
  "source": "kult",
  "bestFor": "E-commerce product browsing",
  "inventory": 11.4,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "puzzle-ad",
  "name": "Puzzle Ad",
  "family": "Gamification",
  "tagline": "A simple jigsaw-style interaction where your brand visual is revealed as users complete the puzzle.",
  "desc": "This ad boosts time spent and memorability for awareness campaigns that want a playful twist.",
  "objective": "Engagement",
  "funnel": [
   "game",
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Beauty & Fashion",
   "Retail & E-commerce",
   "Sports & Fitness",
   "Telecommunications"
  ],
  "benchmark": null,
  "demo": "https://kult.my/puzzle-ad/",
  "preview": "puzzle",
  "source": "kult",
  "bestFor": "Attention capture, memory encoding",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "quiz-ad",
  "name": "Quiz Ad",
  "family": "Gamification",
  "tagline": "An interactive unit that guides users through quick, tap-through questions to reveal a tailored result or recommendation.",
  "desc": "Quiz is ideal for engagement-led campaigns, helping users explore products or messages in a fun, conversational flow while keeping the experience light, personalised and highly clickable.",
  "objective": "Engagement",
  "funnel": [
   "game",
   "awareness",
   "consideration",
   "leadgen"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480"
  ],
  "industries": [
   "Automotive",
   "Financial Services",
   "Telecommunications"
  ],
  "benchmark": null,
  "demo": "https://kult.my/quiz-ad/",
  "preview": "quiz",
  "source": "kult",
  "bestFor": "Engagement, preference discovery",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "reveal-mystery-box",
  "name": "Reveal Mystery Box",
  "family": "Gamification",
  "tagline": "Build curiosity with a tap-to-reveal mechanic that hides your hero product, offer or surprise.",
  "desc": "Great for teasers, launches and campaigns that trade on intrigue.",
  "objective": "Conversion",
  "funnel": [
   "game",
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Beauty & Fashion",
   "Retail & E-commerce",
   "Sports & Fitness"
  ],
  "benchmark": null,
  "demo": "https://kult.my/reveal-mystery-box/",
  "preview": "mystery",
  "source": "kult",
  "bestFor": "Incentivised engagement, offer reveal",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "shape-drop",
  "name": "Shape Drop",
  "family": "Gamification",
  "tagline": "Branded shapes drop into place to reveal the key message.",
  "desc": "",
  "objective": "Engagement",
  "funnel": [
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480"
  ],
  "industries": [
   "Education",
   "Retail & E-commerce",
   "Technology & Electronics"
  ],
  "benchmark": null,
  "demo": "https://kult.my/shape-drop/",
  "preview": "shapes",
  "source": "kult",
  "bestFor": "Gamified engagement, brand recall",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "storytelling",
  "name": "Storytelling",
  "family": "Interactive",
  "tagline": "A single-track audio story that plays as users engage.",
  "desc": "",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/storytelling/",
  "preview": "audio",
  "source": "kult",
  "bestFor": "Brand storytelling, emotional engagement",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "wave-cards",
  "name": "Wave Cards",
  "family": "Interactive",
  "tagline": "A stack of product cards that animate into view as users interact.",
  "desc": "",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480"
  ],
  "industries": [
   "Beauty & Fashion",
   "Retail & E-commerce",
   "Sports & Fitness"
  ],
  "benchmark": null,
  "demo": "https://kult.my/wave-cards/",
  "preview": "wave",
  "source": "kult",
  "bestFor": "Feature discovery, product education",
  "inventory": 11.4,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "half-page",
  "name": "Half Page",
  "family": "Display",
  "tagline": "A tall, above-the-fold unit with room for a full brand message.",
  "desc": "The largest standard sidebar unit. Sits alongside editorial for the whole read, so it suits creative with a headline, a visual and a call to action in one frame.",
  "objective": "Brand exposure",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop",
  "sizes": [
   "300×600"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Brand exposure",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "large-mobile-banner",
  "name": "Large Mobile Banner",
  "family": "Display",
  "tagline": "A double-height mobile banner that stays legible on a phone.",
  "desc": "Twice the height of the standard mobile banner, so the message and button both fit without shrinking the type.",
  "objective": "Traffic, visibility",
  "funnel": [
   "awareness",
   "conversion"
  ],
  "devices": "Mobile",
  "sizes": [
   "320×100"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Traffic, visibility",
  "inventory": null,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "leaderboard",
  "name": "Leaderboard",
  "family": "Display",
  "tagline": "The wide strip at the top of every page.",
  "desc": "First thing in view on desktop, on nearly every page across the network. Best for reach and frequency at a low CPM.",
  "objective": "Reach, awareness",
  "funnel": [
   "awareness"
  ],
  "devices": "Desktop",
  "sizes": [
   "728×90",
   "970×90"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Reach, awareness",
  "inventory": 2.6,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "masthead",
  "name": "Masthead",
  "family": "Display",
  "tagline": "The premium branding unit above the fold on a site homepage.",
  "desc": "Buy it for the statement. A homepage masthead owns the first screen for the day and is priced accordingly.",
  "objective": "Branding, launches",
  "funnel": [
   "awareness",
   "high-impact"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "970×250",
   "1920×250"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Branding, launches",
  "inventory": 1.3,
  "cpm": 10,
  "mobile": false
 },
 {
  "id": "mobile-banner",
  "name": "Mobile Banner",
  "family": "Display",
  "tagline": "The workhorse mobile strip.",
  "desc": "Cheapest reach on mobile. Small canvas, so keep the message to a line and a button.",
  "objective": "Mass reach",
  "funnel": [
   "awareness"
  ],
  "devices": "Mobile",
  "sizes": [
   "320×50"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Mass reach",
  "inventory": null,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "mobile-leaderboard",
  "name": "Mobile Leaderboard",
  "family": "Display",
  "tagline": "Top-of-page strip on mobile.",
  "desc": "Sits at the top of the mobile page rather than in-content. Flexible objective, priced at standard display rates.",
  "objective": "Various objectives",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Mobile",
  "sizes": [
   "320×50",
   "320×100"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Various objectives",
  "inventory": null,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "mrec",
  "name": "MREC",
  "family": "Display",
  "tagline": "The medium rectangle that runs everywhere.",
  "desc": "The most widely available unit on the network and the base size most rich-media formats build on. Strong for click-through when it sits in content.",
  "objective": "Traffic, CTR",
  "funnel": [
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "banner",
  "source": "catalogue",
  "bestFor": "Traffic, CTR",
  "inventory": 3.0,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "social-display-ad",
  "name": "Social Display Ad",
  "family": "Social",
  "tagline": "Turn your best-performing social posts into high-performing display.",
  "desc": "This ad repurposes your social creative and cues into standard display units, helping you scale what already works.",
  "objective": "Rich Media Branding",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480"
  ],
  "industries": [
   "Automotive",
   "Food & Beverage",
   "Retail & E-commerce",
   "Technology & Electronics"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/social-display-ad/",
  "preview": "social",
  "source": "kult",
  "bestFor": "Traffic, CTR",
  "inventory": null,
  "cpm": 14,
  "mobile": false
 },
 {
  "id": "3d-social-video",
  "name": "3D Social Video",
  "family": "Social",
  "tagline": "A social-style video unit with depth and motion that feels native to the feed.",
  "desc": "Ideal for extending your existing social content into premium media without losing that “thumb-stopping” feel.",
  "objective": "Rich Media/ Social Media Branding",
  "funnel": [
   "high-impact",
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480"
  ],
  "industries": [
   "Automotive",
   "Food & Beverage",
   "Retail & E-commerce",
   "Technology & Electronics"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/3d-social-video/",
  "preview": "social",
  "source": "kult",
  "bestFor": "Reach, awareness",
  "inventory": null,
  "cpm": 9,
  "mobile": false
 },
 {
  "id": "in-read-video",
  "name": "In-Read Video",
  "family": "Video",
  "tagline": "Video that plays inside the article as the reader reaches it.",
  "desc": "Opens between paragraphs when scrolled into view, sound off, and collapses when done. Cheaper than in-stream, with completion driven by placement rather than pre-roll.",
  "objective": "CTR, completion",
  "funnel": [
   "video",
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "16:9 in-content"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "inread",
  "source": "catalogue",
  "bestFor": "CTR, completion",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "video-everywhere",
  "name": "Video Everywhere",
  "family": "Video",
  "tagline": "Put your film in front of audiences across Astro’s premium digital inventory.",
  "desc": "Video Everywhere delivers audio-on, high-attention views that are ideal for launches, brand stories and big campaign moments.",
  "objective": "Awareness + View Through",
  "funnel": [
   "video",
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "1920×1080"
  ],
  "industries": [
   "Beauty",
   "Entertainment",
   "FMCG",
   "Property",
   "Telco"
  ],
  "benchmark": "CTR 0.05% | VTR 45-50%",
  "demo": "https://kult.my/video-everywhere/",
  "preview": "instream",
  "source": "kult",
  "bestFor": "Awareness, view-through",
  "inventory": 24.4,
  "cpm": 25,
  "mobile": false
 },
 {
  "id": "video-in-banner",
  "name": "Video In-banner",
  "family": "Video",
  "tagline": "Turn a standard banner into a mini cinema.",
  "desc": "Video In-Banner auto-plays inside display units, giving you moving storytelling and a clear call-to-action without pulling users away from what they’re reading or watching.",
  "objective": "Engagement + CTR",
  "funnel": [
   "video",
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Beauty",
   "Product Launches",
   "Retail"
  ],
  "benchmark": "CTR 0.25% | VTR 28-30%",
  "demo": "https://kult.my/gallery-video-in-banner/",
  "preview": "inbanner",
  "source": "kult",
  "bestFor": "Engagement, CTR",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "site-takeover",
  "name": "Site Takeover",
  "family": "High impact",
  "tagline": "Every unit on the page, for one brand, for one day.",
  "desc": "Skinner, masthead and in-content units bought together so the whole page is yours. Launch days and tentpole moments.",
  "objective": "Full-funnel brand impact",
  "funnel": [
   "high-impact",
   "awareness"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "Skinner + Masthead + MREC"
  ],
  "industries": [],
  "benchmark": null,
  "demo": null,
  "preview": "takeover",
  "source": "catalogue",
  "bestFor": "Full-funnel brand impact",
  "inventory": 1.9,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "skinner",
  "name": "Skinner",
  "family": "High impact",
  "tagline": "Wrap the site in your brand while keeping the content visible.",
  "desc": "",
  "objective": "Brand Takeover",
  "funnel": [
   "high-impact",
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "1920×1080"
  ],
  "industries": [
   "Automotive",
   "FMCG",
   "Government Campaigns",
   "Luxury",
   "Telco"
  ],
  "benchmark": null,
  "demo": "https://kult.my/skinner/",
  "preview": "skinner",
  "source": "kult",
  "bestFor": "Brand takeover",
  "inventory": 1.3,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "space-invader",
  "name": "Space Invader",
  "family": "Gamification",
  "tagline": "A lightweight arcade shooter, embedded in the creative.",
  "desc": "Playable Game Ad is designed to boost brand recall and user intent through interactive, arcade-style gameplay.",
  "objective": "Engagement & Conversion",
  "funnel": [
   "awareness",
   "consideration",
   "game"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×600",
   "320×480"
  ],
  "industries": [
   "E-commerce",
   "FMCG",
   "Telecommunications",
   "Entertainment"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/space-invader/",
  "preview": "invaders",
  "source": "kult",
  "bestFor": "Gamified dwell time, brand recall",
  "inventory": null,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "spin-wheel",
  "name": "Spin Wheel",
  "family": "Gamification",
  "tagline": "MerryView 3D",
  "desc": "Spin-to-win, built directly into your ad. This drives excitement, repeat engagement and data capture for promos, loyalty pushes and campaigns that need a little bit of “game show” energy.",
  "objective": "Rich Media Branding",
  "funnel": [
   "awareness",
   "consideration",
   "game"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Automotive",
   "Food & Beverage",
   "Retail & E-commerce",
   "Technology & Electronics"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/spin-wheel/",
  "preview": "spin",
  "source": "kult",
  "bestFor": "Incentivised engagement, offer reveal",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "balloon-ad",
  "name": "Balloon Ad",
  "family": "High impact",
  "tagline": "A floating balloon teaser that opens into a full-screen experience.",
  "desc": "Balloon Ad helps you qualify leads, collect preferences and guide users towards samples, sign-ups or offers in a conversational way.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "leadgen",
   "high-impact"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "150×150 expand to full-screen responsive"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/ballon-ad/",
  "preview": "balloon",
  "source": "kult",
  "bestFor": "Playful interaction, brand recall",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "movement-flip",
  "name": "Movement Flip",
  "family": "Interactive",
  "tagline": "An animated unit where panels “flip” on interaction to reveal more content, offers or variants.",
  "desc": "It is ideal when you want to tell a layered story in a compact space and reward users for exploring.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/movement-flip/",
  "preview": "flip",
  "source": "kult",
  "bestFor": "Attention capture, message reveal",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "reservation-booking-ad",
  "name": "Reservation / Booking Ad",
  "family": "Interactive",
  "tagline": "Inspire, then book: all in one unit.",
  "desc": "This ad combines rich visuals with a built-in booking call-to-action, ideal for industries that want to close the loop quickly.",
  "objective": "Rich Media Branding",
  "funnel": [
   "conversion",
   "leadgen"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Automotive",
   "Financial Services",
   "Insurance",
   "Healthcare & Pharmaceuticals",
   "Beauty & Personal Care",
   "Tourism",
   "Hospitality",
   "Real Estate",
   "Education",
   "Sports & Fitness"
  ],
  "benchmark": "CTR >0.25%",
  "demo": "https://kult.my/reservation-booking-ad/",
  "preview": "booking",
  "source": "kult",
  "bestFor": "Bookings, lead capture in-unit",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "shop-with-video",
  "name": "Shop with Video",
  "family": "Video",
  "tagline": "Turn your video into a shoppable storefront.",
  "desc": "It lets users watch your film while tapping on tagged products to view details and click straight through to purchase or learn more.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "video"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/shop-with-video/",
  "preview": "shopvideo",
  "source": "kult",
  "bestFor": "Product browsing, e-commerce CTR",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "chatbot",
  "name": "Chatbot",
  "family": "Interactive",
  "tagline": "A conversational ad unit that opens into a guided chat experience.",
  "desc": "Chatbot helps you answer questions, qualify leads and recommend products in real time, then drives users to sign up, book or buy with tailored prompts.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "leadgen"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/chatbot/",
  "preview": "chat",
  "source": "kult",
  "bestFor": "Qualification, lead capture",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "tap-explore-gallery",
  "name": "Tap & Explore Gallery",
  "family": "Interactive",
  "tagline": "A visual-led unit that opens into an image or content gallery when users tap.",
  "desc": "This ad is perfect for product ranges, lookbooks, menus and collections where people want to browse through multiple options before clicking out.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/tap-explore-gallery/",
  "preview": "gallery",
  "source": "kult",
  "bestFor": "Product discovery, information depth",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "sticky-note",
  "name": "Sticky Note",
  "family": "Interactive",
  "tagline": "A small but unmissable “note” that stays pinned on-screen as users scroll.",
  "desc": "Sticky Note is ideal for highlighting promo codes, reminders, key messages or CTAs that you want visible at all times without taking over the page.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/sticky-note/",
  "preview": "sticky",
  "source": "kult",
  "bestFor": "Persistent reminder, recall",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "flip-book",
  "name": "Flip Book",
  "family": "Interactive",
  "tagline": "An interactive flip-through experience that behaves like a mini digital brochure.",
  "desc": "This is great for catalogues, menus, guides and campaign lookbooks where users can turn pages, discover more and click through when something catches their eye.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "video",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/flip-book/",
  "preview": "flipbook",
  "source": "kult",
  "bestFor": "Catalogue browsing, feature depth",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "tilt-pop-carousel",
  "name": "Tilt-Pop Carousel",
  "family": "Interactive",
  "tagline": "A carousel where each card subtly tilts and “pops” on interaction.",
  "desc": "This Carousel gives your products or visuals extra depth and movement, making it ideal for line-ups, curated edits and hero ranges that need to stand out.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/tilt-pop-carousel/",
  "preview": "tiltpop",
  "source": "kult",
  "bestFor": "Product browsing, multiple messages",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "3d-float-flip",
  "name": "3D Float-flip",
  "family": "Interactive",
  "tagline": "A 3D-style unit where cards or objects float above the background and flip to reveal more detail on interaction.",
  "desc": "3D Float-flip is built for premium, visually-driven campaigns that want to showcase features or variants in a modern, high-impact way.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/3d-float-flip/",
  "preview": "flip",
  "source": "kult",
  "bestFor": "Rich media branding, interaction",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "video-teaser-ad",
  "name": "Video Teaser Ad",
  "family": "Video",
  "tagline": "A short, thumb-stopping video that teases your full story, launch or offer.",
  "desc": "This ad asset is designed to spark curiosity and drive users to click through to the main film, landing page or campaign hub.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "video"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "970×250"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/video-teaser-ad/",
  "preview": "teaser",
  "source": "kult",
  "bestFor": "Launch teasing, view-through",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "dynamic-video",
  "name": "Dynamic Video",
  "family": "Video",
  "tagline": "Pair your hero video with a branded frame that keeps your key message, price or offer always in view.",
  "desc": "This ad is built to boost recall and drive action in one clean, high-impact format.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "video",
   "awareness",
   "consideration",
   "conversion"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "300×250",
   "300×600",
   "320×480",
   "800×600",
   "970×250"
  ],
  "industries": [
   "Beauty & Fashion",
   "Food & Beverage",
   "Retail & E-commerce",
   "Sports & Fitness"
  ],
  "benchmark": null,
  "demo": "https://kult.my/dynamic-video/",
  "preview": "dynvideo",
  "source": "kult",
  "bestFor": "Personalised video, relevance at scale",
  "inventory": null,
  "cpm": null,
  "mobile": false
 },
 {
  "id": "tiktok-display-card",
  "name": "TikTok Display Card",
  "family": "Social",
  "tagline": "An interactive overlay for TikTok in-feed video that keeps your key message and CTA as the focus.",
  "desc": "This is built to convert attention on TikTok into site visits and actions.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "video",
   "consideration"
  ],
  "devices": "TikTok mobile app",
  "sizes": [
   "1920×1080"
  ],
  "industries": [],
  "benchmark": null,
  "demo": "https://kult.my/tiktok-display-card/",
  "preview": "tiktok",
  "source": "kult",
  "bestFor": "Native social display, traffic",
  "inventory": null,
  "cpm": null,
  "mobile": true
 },
 {
  "id": "fullscreen-expandable",
  "name": "Fullscreen expandable",
  "family": "High impact",
  "tagline": "Start with a simple teaser banner, and expand into a full-screen brand experience when users tap or swipe.",
  "desc": "This lets you tell the full story; from product details to offers, without cluttering the page.",
  "objective": "Brand / Product Awareness",
  "funnel": [
   "awareness",
   "consideration",
   "leadgen",
   "high-impact"
  ],
  "devices": "Desktop & mobile",
  "sizes": [
   "320×150 expand to full-screen responsive"
  ],
  "industries": [
   "Education",
   "Financial Services",
   "Public Services"
  ],
  "benchmark": null,
  "demo": "https://kult.my/fullscreen-expandable/",
  "preview": "expand",
  "source": "kult",
  "bestFor": "High-impact awareness, takeover moments",
  "inventory": null,
  "cpm": null,
  "mobile": true
 }
];

/* ── Placements ───────────────────────────────────────────────────────
   Where on a page each unit actually sits. This is a curation, not a
   KULT-published field: it is derived from the sizes each format is sold
   in, with the handful of units whose size string does not say where they
   go written out by hand below. Two things are recorded per format —
   `placements`, every slot it can fill, and `home`, the one slot it was
   designed for. A planner arrives with a slot already bought, so the
   placement view asks that question first and the catalogue answers it. */
window.FORMAT_PLACEMENTS = [
  { key: 'masthead',  label: 'Masthead',      short: 'Across the top',      icon: 'ph-rows',
    desc: 'The strip above the story. The first thing on the page, and the last thing a reader can miss.' },
  { key: 'skin',      label: 'Page skin',     short: 'Wraps the page',      icon: 'ph-selection-background',
    desc: 'Dresses the margins either side of the story, so the whole page reads as the ad.' },
  { key: 'sidebar',   label: 'Side rail',     short: 'Beside the story',    icon: 'ph-sidebar',
    desc: 'The tall unit down the right. In view for most of the scroll, which is why the games live here.' },
  { key: 'inarticle', label: 'In the article', short: 'Inside the story',   icon: 'ph-article',
    desc: 'The box set into the body copy, where the reader already has their eyes. The workhorse slot.' },
  { key: 'invideo',   label: 'In the player',  short: 'Inside the video',   icon: 'ph-play-circle',
    desc: 'Runs inside the video player, either in the break or in the content itself.' },
  { key: 'sticky',    label: 'Sticky footer',  short: 'Pinned to the bottom', icon: 'ph-arrow-line-down',
    desc: 'Clings to the bottom edge and stays there while the page moves underneath it.' },
  { key: 'overlay',   label: 'Full screen',    short: 'Covers everything',  icon: 'ph-frame-corners',
    desc: 'Takes the entire screen for a beat, then hands the page back. The loudest thing on the rate card.' },
  { key: 'feed',      label: 'In the feed',    short: 'Between the posts',  icon: 'ph-device-mobile',
    desc: 'Sits in a social feed and behaves like the posts either side of it.' }
];
(function () {
  /* A size says where a unit goes, most of the time. */
  var BY_SIZE = {
    '970×250': 'masthead', '1920×250': 'masthead', '728×90': 'masthead', '970×90': 'masthead',
    '300×250': 'inarticle', '800×600': 'inarticle',
    '300×600': 'sidebar',
    '320×480': 'overlay',
    '320×50': 'sticky', '320×100': 'sticky'
  };
  /* And where it does not, it is written down. */
  var EXTRA = {
    'skinner': ['skin'], 'site-takeover': ['skin', 'masthead', 'inarticle'],
    'in-read-video': ['invideo'], 'video-everywhere': ['invideo'],
    'social-display-ad': ['feed'], '3d-social-video': ['feed'], 'tiktok-display-card': ['feed'],
    'interstitial': ['overlay'], 'balloon-ad': ['overlay'], 'fullscreen-expandable': ['overlay', 'sticky'],
    'catfish-ad': ['sticky'], 'mobile-banner': ['sticky'], 'mobile-leaderboard': ['sticky'],
    'large-mobile-banner': ['sticky']
  };
  /* The slot each unit was built for. Anything not named here is an
     in-article unit: the 300×250 is where the interactive work runs. */
  var HOME = {
    'masthead': 'masthead', 'leaderboard': 'masthead',
    'skinner': 'skin', 'site-takeover': 'skin',
    'half-page': 'sidebar', 'mini-game': 'sidebar', 'product-collector': 'sidebar', 'space-invader': 'sidebar',
    'in-read-video': 'invideo', 'video-everywhere': 'invideo',
    'catfish-ad': 'sticky', 'mobile-banner': 'sticky', 'mobile-leaderboard': 'sticky',
    'large-mobile-banner': 'sticky', 'fullscreen-expandable': 'sticky',
    'interstitial': 'overlay', 'balloon-ad': 'overlay',
    'social-display-ad': 'feed', '3d-social-video': 'feed', 'tiktok-display-card': 'feed'
  };
  var order = window.FORMAT_PLACEMENTS.map(function (p) { return p.key; });
  window.FORMATS.forEach(function (f) {
    var set = {};
    f.sizes.forEach(function (s) { var z = BY_SIZE[s.replace(/\s+/g, ' ').trim()]; if (z) set[z] = 1; });
    (EXTRA[f.id] || []).forEach(function (z) { set[z] = 1; });
    f.home = HOME[f.id] || 'inarticle';
    set[f.home] = 1;
    f.placements = order.filter(function (k) { return set[k]; });
  });

  /* What a planner needs to know about a slot before they pick it: what it
     runs at, where it runs, and which units were sold for it. Sizes come
     from the map above where a slot has sizes of its own — those are the
     ones that define it — and from the units built for it where it does
     not. Composite labels like "Skinner + Masthead + MREC" name a bundle
     rather than a size, so they are left out. */
  var bySlot = {};
  Object.keys(BY_SIZE).forEach(function (sz) { (bySlot[BY_SIZE[sz]] = bySlot[BY_SIZE[sz]] || []).push(sz); });
  function devicesOf(f) {
    var d = (f.devices || '').toLowerCase(), out = [];
    if (d.indexOf('desktop') > -1) out.push('Desktop');
    if (d.indexOf('mobile') > -1) out.push('Mobile');
    if (d.indexOf('tiktok') > -1) out.push('TikTok');
    return out;
  }
  window.FORMAT_PLACEMENTS.forEach(function (pl) {
    var homes = window.FORMATS.filter(function (f) { return f.home === pl.key; });
    var seen = {}, sizes = bySlot[pl.key] ? bySlot[pl.key].slice() : [];
    if (!sizes.length) {
      homes.forEach(function (f) {
        f.sizes.forEach(function (sz) { if (sz.indexOf(' + ') < 0 && !seen[sz]) { seen[sz] = 1; sizes.push(sz); } });
      });
    }
    pl.sizes = sizes;
    pl.leads = homes.map(function (f) { return f.name; }).sort();
    pl.devices = homes.reduce(function (a, f) {
      devicesOf(f).forEach(function (d) { if (a.indexOf(d) < 0) a.push(d); });
      return a;
    }, []);
  });
})();
