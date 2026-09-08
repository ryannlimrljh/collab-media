/* Collab:Media — audience catalogue.

   Every segment Collabrium Digitals sells, in one list. Name, group, size,
   description, properties ("where they spend their time"), media
   consumption, top content and portrait were read from kult.my/audience on
   2026-09-08. "size" is KULT's published audience figure — the number sales
   quote. "addressable" and "fit" come from Karen's planner personas
   (planner-wizard-collabrium_270826.html) and are set only on the ten
   segments whose names map unambiguously; they are addressable KULT digital
   users, a different and smaller basis, so never add the two together.

   lens         — who / love / buying: the three lenses over KULT's eight groups
   consumption  — percentages per channel; a missing channel is unknown, not 0
   pair         — the fans-to-buyers twin, on ten segments                  */
window.AUDIENCE_LENSES = [
  {
    "key": "who",
    "label": "Who they are",
    "element": "earth"
  },
  {
    "key": "love",
    "label": "What they love",
    "element": "water"
  },
  {
    "key": "buying",
    "label": "What they're buying",
    "element": "fire"
  }
];
window.AUDIENCE_GROUPS = [
  {
    "key": "ethnicity",
    "label": "Ethnicity",
    "lens": "who"
  },
  {
    "key": "income",
    "label": "Income group",
    "lens": "who"
  },
  {
    "key": "life-stage",
    "label": "Life stage",
    "lens": "who"
  },
  {
    "key": "business",
    "label": "Business & professionals",
    "lens": "who"
  },
  {
    "key": "sports",
    "label": "Sports",
    "lens": "love"
  },
  {
    "key": "entertainment",
    "label": "Entertainment",
    "lens": "love"
  },
  {
    "key": "trendsetter",
    "label": "Trendsetter",
    "lens": "love"
  },
  {
    "key": "shopping",
    "label": "Shopping intent",
    "lens": "buying"
  }
];
window.AUDIENCE_PROPERTIES = [
  {
    "key": "awani",
    "label": "Astro Awani"
  },
  {
    "key": "gempak",
    "label": "Gempak"
  },
  {
    "key": "xuan",
    "label": "XUAN"
  },
  {
    "key": "syok",
    "label": "SYOK"
  },
  {
    "key": "stadium",
    "label": "Stadium Astro"
  },
  {
    "key": "rasa",
    "label": "Rasa"
  },
  {
    "key": "hiburan",
    "label": "Media Hiburan"
  },
  {
    "key": "sooka",
    "label": "sooka"
  },
  {
    "key": "ulagam",
    "label": "Ulagam"
  }
];
/* Karen's refine dimensions, verbatim: each option carries the share of
   the population it keeps. */
window.AUDIENCE_REFINE = [
  { id: 'gen', label: 'Generation', opts: [['', 'Any generation', 1],
    ['z', 'Gen Z (18–27)', .28], ['y', 'Millennial (28–43)', .33],
    ['x', 'Gen X (44–59)', .24], ['b', 'Boomer (60+)', .15]] },
  { id: 'inc', label: 'Income band', opts: [['', 'Any income', 1],
    ['b40', 'B40 — under RM 5,250', .40], ['m40', 'M40 — RM 5,250–11,819', .40],
    ['t20', 'T20 — RM 11,820+', .20]] },
  { id: 'race', label: 'Race', opts: [['', 'Any', 1],
    ['may', 'Malay', .58], ['chi', 'Chinese', .23], ['ind', 'Indian', .07], ['oth', 'Other', .12]] },
  { id: 'geo', label: 'Geography', opts: [['', 'Nationwide', 1],
    ['kl', 'Klang Valley', .27], ['nth', 'Northern region', .18],
    ['sth', 'Southern region', .16], ['ec', 'East Coast', .14], ['em', 'East Malaysia', .20]] }
];
/* Same-group segments overlap ~60%, cross-group ~25% (Karen's planner
   note). Malaysia total is the planner's mass-targeting figure. */
window.AUDIENCE_OVERLAP = { same: 0.60, cross: 0.25, malaysia: 16150000 };
window.AUDIENCES = [
  {
    "id": "malay",
    "name": "Malay",
    "group": "ethnicity",
    "size": 17000000,
    "desc": "The Malay community forms the largest ethnic group in Malaysia and represents the core audience in most cultural and social contexts.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 55,
      "audio": 27,
      "tv": 78,
      "podcast": 50,
      "social": 54
    },
    "topics": [
      "Music",
      "Computer & Technology",
      "Fashion & Beauty",
      "Home & Family",
      "Food & Beverages",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/malay.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/1.Malay_.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "chinese",
    "name": "Chinese",
    "group": "ethnicity",
    "size": 10000000,
    "desc": "As Malaysia’s second-largest ethnic group, Chinese Malaysians balance tradition and modernity, prioritizing education, career success, and family values to secure future generations.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 62,
      "audio": 35,
      "tv": 42,
      "podcast": 52,
      "social": 70
    },
    "topics": [
      "Personal Finance",
      "Business",
      "Computer & Technology",
      "Home & Garden",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/chinese.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/2.Chinese.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "indian",
    "name": "Indian",
    "group": "ethnicity",
    "size": 10000000,
    "desc": "As one of Malaysia’s major ethnic communities, Malaysian Indians uphold rich traditions while embracing modern opportunities, prioritizing education, career growth, and family values for a better future.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "ulagam",
        "note": "Entertainment News, Lifestyle"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 77,
      "audio": 50,
      "tv": 61,
      "podcast": 66,
      "social": 43
    },
    "topics": [
      "Entertainment",
      "Pets",
      "Computer & Technology",
      "Personal Finance",
      "Travel",
      "Outdoor Activities"
    ],
    "portrait": "../assets/audiences/indian.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/3.indian-683x1024.png",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "t15",
    "name": "T15",
    "group": "income",
    "size": 5800000,
    "desc": "Elite earners prioritize status, innovation, and premium experiences at home and abroad.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 75,
      "audio": 45,
      "tv": 53,
      "podcast": 42,
      "social": 84
    },
    "topics": [
      "Home & Family",
      "Personal Finance",
      "Health & Wellness",
      "Automobiles",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/t15.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/4.T15.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "t20",
    "name": "T20",
    "group": "income",
    "size": 14000000,
    "desc": "High-income professionals and business leaders focused on financial success, exclusivity, and emerging technologies.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 58,
      "audio": 27,
      "tv": 42,
      "podcast": 53,
      "social": 67
    },
    "topics": [
      "News",
      "Home & Family",
      "Computer & Technology",
      "Fashion & Beauty",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/t20.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/5.T20.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "m40",
    "name": "M40",
    "group": "income",
    "size": 11000000,
    "desc": "Upwardly mobile earners focused on progress, affordable luxuries, and careful financial planning.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 73,
      "audio": 42,
      "tv": 55,
      "podcast": 60,
      "social": 81
    },
    "topics": [
      "Business",
      "Home & Garden",
      "Computer & Technology",
      "Fashion & Beauty",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/m40.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/6.M40.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "b40",
    "name": "B40",
    "group": "income",
    "size": 4600000,
    "desc": "Malaysia’s lower-income group focused on affordability and stability",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 79,
      "audio": 53,
      "tv": 53,
      "podcast": 64,
      "social": 89
    },
    "topics": [
      "Pets",
      "Entertainment",
      "Computer & Technology",
      "Personal & Technology",
      "Travel",
      "Outdoor Activities"
    ],
    "portrait": "../assets/audiences/b40.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/7.B40.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "gen-z",
    "name": "Gen Z",
    "group": "life-stage",
    "size": 8800000,
    "desc": "Digitally native youths valuing authenticity, inclusivity, sustainability, and on-demand content shaping their connected lifestyles.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 70,
      "audio": 36,
      "tv": 58,
      "podcast": 63,
      "social": 77
    },
    "topics": [
      "Pets",
      "Entertainment",
      "Computer & Technology",
      "Personal & Technology",
      "Business",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/gen-z.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/8.GenZ_-683x1024.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "millennials",
    "name": "Millennials",
    "group": "life-stage",
    "size": 8500000,
    "desc": "Career-driven and family-oriented, Millennials seek balance, self-improvement, and meaningful, relatable media content.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 72,
      "audio": 51,
      "tv": 56,
      "games": 72,
      "social": 79
    },
    "topics": [
      "Pets",
      "Sports & Recreation",
      "Fashion & Beauty",
      "Home & Garden",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/millennials.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/9.-Millennials.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "gen-x",
    "name": "Gen X",
    "group": "life-stage",
    "size": 12000000,
    "desc": "Practical and independent, Gen X values stability, favoring news, business insights, and family-focused content.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 67,
      "audio": 33,
      "tv": 48,
      "podcast": 32,
      "social": 75
    },
    "topics": [
      "Pets",
      "Business",
      "Computer & Technology",
      "Home & Garden",
      "Family & Children",
      "Personal Finance"
    ],
    "portrait": "../assets/audiences/gen-x.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/10.GenX_.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "baby-boomers",
    "name": "Baby Boomers",
    "group": "life-stage",
    "size": 7300000,
    "desc": "Health-conscious and family-oriented, Baby Boomers value stability, trust, and detailed news, finance, and health content.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 78,
      "audio": 49,
      "tv": 52,
      "podcast": 48,
      "social": 86
    },
    "topics": [
      "Entertainment",
      "Business",
      "Health & Wellness",
      "Personal Finance",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/baby-boomers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/11.Boomers.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "young-working-adult",
    "name": "Young Working Adult",
    "group": "life-stage",
    "size": 15000000,
    "desc": "Young professionals seeking growth value convenient, engaging, and informative content matching their fast-paced lifestyles.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 61,
      "audio": 30,
      "tv": 44,
      "games": 61,
      "social": 70
    },
    "topics": [
      "Careers",
      "Health & Wellness",
      "Computer & Technology",
      "Fashion & Beauty",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/young-working-adult.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/12.-Young-Working-Adult.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "student",
    "name": "Student",
    "group": "life-stage",
    "size": 10000000,
    "desc": "Navigating between academics, social life, and personal growth, our student audience, aged 18 to 25, are highly adaptable and tech-savvy individuals. Driven by aspirations for a successful future, they seek flexibility and convenience in all aspects of life.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 72,
      "audio": 43,
      "tv": 50,
      "games": 42,
      "social": 67
    },
    "topics": [
      "Careers",
      "Education",
      "Computer & Technology",
      "Personal Finance",
      "Outdoor Activities"
    ],
    "portrait": "../assets/audiences/student.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/13.Students-683x1024.png",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "solo-lifestylers",
    "name": "Solo Lifestylers",
    "group": "life-stage",
    "size": 13000000,
    "desc": "Driven and self-reliant, Soloists thrive on new experiences, personal growth, and control over their own path.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      }
    ],
    "consumption": {
      "video": 67,
      "audio": 36,
      "tv": 47,
      "games": 49,
      "social": 58
    },
    "topics": [
      "Pets",
      "Entertainment",
      "Computer & Technology",
      "Personal Finance",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/solo-lifestylers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/14.Soloist.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "the-dynamic-duo",
    "name": "The Dynamic Duo",
    "group": "life-stage",
    "size": 11000000,
    "desc": "Ambitious young couples valuing smart spending, quality investments, and balanced, experience-driven lifestyles.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 68,
      "audio": 38,
      "tv": 46,
      "podcast": 36,
      "social": 78
    },
    "topics": [
      "Personal Finance",
      "Computer & Technology",
      "Pets",
      "Real Estate",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/the-dynamic-duo.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/15.Dynamic-Duo-607x1024.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "young-families",
    "name": "Young Families",
    "group": "life-stage",
    "size": 15000000,
    "desc": "Caring and budget-conscious, young parents seek trusted, practical products and resources for their children’s growth.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 59,
      "audio": 28,
      "tv": 46,
      "communities": 49,
      "social": 67
    },
    "topics": [
      "Food & Beverages",
      "Entertainment",
      "Computer & Technology",
      "Health & Wellness",
      "Travel",
      "Family & Children"
    ],
    "portrait": "../assets/audiences/young-families.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/16.-Little-Steps-Advocates.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "new-mothers",
    "name": "New Mothers",
    "group": "life-stage",
    "size": 7200000,
    "desc": "Women in their 20s–30s navigating pregnancy or early motherhood, balancing care, learning, and self-growth.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 64,
      "audio": 32,
      "tv": 46,
      "communities": 56,
      "social": 73
    },
    "topics": [
      "Food & Beverages",
      "Home & Family",
      "Sports & Recreation",
      "Health & Wellness",
      "Travel",
      "News"
    ],
    "portrait": "../assets/audiences/new-mothers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/17.-Youth-Mom.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "family-dynamic",
    "name": "Family Dynamic",
    "group": "life-stage",
    "size": 12000000,
    "desc": "Experienced parents focused on stability, education, and planning for their children’s future.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 63,
      "audio": 32,
      "tv": 50,
      "podcast": 30,
      "social": 73
    },
    "topics": [
      "Personal Finance",
      "Pets",
      "Computer & Technology",
      "Children & Family",
      "Travel",
      "Outdoor Activities"
    ],
    "portrait": "../assets/audiences/family-dynamic.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/18.-Family-Dynamic.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "experienced-mothers",
    "name": "Experienced Mothers",
    "group": "life-stage",
    "size": 11000000,
    "desc": "Experienced mothers caring for kids across life stages, prioritizing structure, practical parenting, and family well-being.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 66,
      "audio": 35,
      "tv": 46,
      "podcast": 33,
      "social": 75
    },
    "topics": [
      "Personal Finance",
      "Outdoor Activities",
      "Family & Children",
      "Real Estate",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/experienced-mothers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/19.-Mommy-Pros-688x1024.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "epl-fans",
    "name": "EPL Fans",
    "group": "sports",
    "size": 13000000,
    "desc": "Malaysian EPL supporters are highly engaged online, following schedules, stats, and match highlights across multiple platforms.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "sooka",
        "note": "Live Football Match, Match Highlights, Sports Podcast & Catch Up"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 65,
      "audio": 32,
      "tv": 48,
      "games": 50,
      "social": 54
    },
    "topics": [
      "Soccer",
      "News",
      "Food & Beverages",
      "Music",
      "Travel",
      "Video Games"
    ],
    "portrait": "../assets/audiences/epl-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/20.EPL-Super-Fans.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "mfl-fans",
    "name": "MFL Fans",
    "group": "sports",
    "size": 1600000,
    "desc": "Passionate supporters of local football, spanning age groups and closely following games and player performance online and in stadiums.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "sooka",
        "note": "Live Football Match, Match Highlights, Sports Podcast & Catch Up"
      }
    ],
    "consumption": {
      "video": 61,
      "audio": 60,
      "tv": 45,
      "podcast": 32,
      "social": 56
    },
    "topics": [
      "Soccer",
      "Food & Beverages",
      "Computer & Technology",
      "Entertainment",
      "Music",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/mfl-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/21.MFL-Super-Fans.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "golf-fans",
    "name": "Golf Fans",
    "group": "sports",
    "size": 9900000,
    "desc": "Affluent individuals who see golf as a lifestyle of precision and prestige, actively playing and following major events.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "sooka",
        "note": "Live Championship, Tournaments Highlights, Sports Podcast & Catch Up"
      }
    ],
    "consumption": {
      "video": 69,
      "audio": 37,
      "tv": 50,
      "podcast": 37,
      "social": 76
    },
    "topics": [
      "Golf",
      "Home & Garden",
      "Computer & Technology",
      "Personal Finance",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/golf-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/22.Golf-Fans.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "badminton-fans",
    "name": "Badminton Fans",
    "group": "sports",
    "size": 270000,
    "desc": "Passionate and diverse, Malaysian badminton fans nationwide follow major tournaments and support national players.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "sooka",
        "note": "Live Badminton Match, Match Highlights, Sports Podcast & Catch Up"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 56,
      "audio": 43,
      "tv": 42,
      "communities": 46,
      "social": 64
    },
    "topics": [
      "Badminton",
      "Health & Wellness",
      "Computer & Technology",
      "Food & Beverages",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/badminton-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/23.Badminton-Fans.jpg",
    "addressable": 798400,
    "fit": "Appointment viewing. Concentrated bursts, not always-on.",
    "pair": null,
    "lens": "love"
  },
  {
    "id": "sepak-takraw-fans",
    "name": "Sepak Takraw Fans",
    "group": "sports",
    "size": 54000,
    "desc": "Passionate and tradition-rooted, Sepak Takraw fans uphold heritage through community tournaments and active participation.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "sooka",
        "note": "Live STL Match, Match Highlights, Sports Podcast & Catch Up"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 74,
      "audio": 77,
      "tv": 60,
      "games": 73,
      "social": 64
    },
    "topics": [
      "Sepak Takraw",
      "Entertainment",
      "Computer & Technology",
      "Food Beverages",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/sepak-takraw-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/24.-Sepak-Takraw.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "e-sports-fans",
    "name": "E-sports Fans",
    "group": "sports",
    "size": 14000000,
    "desc": "Young and tech-savvy, Malaysian esports fans follow tournaments, live streams, and gaming news actively.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 60,
      "audio": 69,
      "tv": 44,
      "games": 47,
      "communities": 50
    },
    "topics": [
      "Video Games",
      "Entertainment",
      "Computer & Technology",
      "Fashion & Beauty",
      "Travel",
      "Food & Beverages"
    ],
    "portrait": "../assets/audiences/e-sports-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/25.-Esports-Fans.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "gadget-gurus",
    "name": "Gadget Gurus",
    "group": "trendsetter",
    "size": 13000000,
    "desc": "A diverse group of early adopters and hobbyists focused on premium tech, innovation, and high-performance gadgets.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      }
    ],
    "consumption": {
      "video": 63,
      "audio": 32,
      "tv": 45,
      "podcast": 56,
      "social": 73
    },
    "topics": [
      "A.I",
      "Mobile & Wireless Devices",
      "Computer & Technology",
      "Electronics Gadgets & Appliances",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/gadget-gurus.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/26.Gadget-Gurus.jpg",
    "addressable": null,
    "fit": null,
    "pair": {
      "id": "tech-gadget-buyers",
      "role": "fan"
    },
    "lens": "love"
  },
  {
    "id": "automotive-fans",
    "name": "Automotive Fans",
    "group": "trendsetter",
    "size": 12000000,
    "desc": "Passionate drivers who appreciate design, engineering, and innovation across classic, luxury, and performance cars.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 64,
      "audio": 34,
      "tv": 45,
      "podcast": 33,
      "social": 75
    },
    "topics": [
      "Automobiles",
      "Business",
      "Health & Wellness",
      "Home & family",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/automotive-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/27.Automative-Enthusiasts.jpg",
    "addressable": 481800,
    "fit": "Upper-funnel only. Do not confuse with in-market intent.",
    "pair": {
      "id": "automotive-buyers",
      "role": "fan"
    },
    "lens": "love"
  },
  {
    "id": "wellness-explorers",
    "name": "Wellness Explorers",
    "group": "trendsetter",
    "size": 10000000,
    "desc": "Health-focused individuals who stay active through workouts, sports, and outdoor adventures for overall well-being.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 54,
      "audio": 25,
      "tv": 40,
      "communities": 45,
      "social": 63
    },
    "topics": [
      "Sports & Recreation",
      "Computer & Technology",
      "Food Beverages",
      "Home & Family",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/wellness-explorers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/28.Active-Lifestyle-Seekers.jpg",
    "addressable": 2850000,
    "fit": "Largest reach pool. Broad enough to anchor a mass awareness plan.",
    "pair": {
      "id": "health-wellness-buyers",
      "role": "fan"
    },
    "lens": "love"
  },
  {
    "id": "adventure-seekers",
    "name": "Adventure Seekers",
    "group": "trendsetter",
    "size": 16000000,
    "desc": "Nature lovers who pursue hiking, camping, and outdoor challenges with reliable, high-performance gear.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      }
    ],
    "consumption": {
      "video": 57,
      "audio": 27,
      "tv": 42,
      "communities": 47,
      "social": 66
    },
    "topics": [
      "Personal Finance",
      "Outdoor Activities",
      "Fashion & Beauty",
      "Food Beverages",
      "Travel",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/adventure-seekers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/29.-Adventure-Enthusiasts.jpg",
    "addressable": 258100,
    "fit": "Event and on-ground campaigns. Strong response to countdown formats.",
    "pair": {
      "id": "travel-experience-seekers",
      "role": "fan"
    },
    "lens": "love"
  },
  {
    "id": "foodies",
    "name": "Foodies",
    "group": "trendsetter",
    "size": 16000000,
    "desc": "Culinary explorers who seek authentic flavors, quality ingredients, and memorable dining experiences.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 57,
      "audio": 27,
      "tv": 43,
      "communities": 48,
      "social": 66
    },
    "topics": [
      "Food Delivery",
      "Groceries",
      "Recipes & Cooking",
      "Food & Beverages",
      "Travel",
      "Restaurant & Dining"
    ],
    "portrait": "../assets/audiences/foodies.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/30.Foodies-734x1024.jpeg",
    "addressable": 1940000,
    "fit": "Short consideration cycle. Pairs well with promo or footfall goals.",
    "pair": null,
    "lens": "love"
  },
  {
    "id": "environmentalist",
    "name": "Environmentalist",
    "group": "trendsetter",
    "size": 8700000,
    "desc": "Sustainability-driven individuals choosing eco-friendly products, ethical brands, and mindful consumption.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 68,
      "audio": 37,
      "tv": 50,
      "communities": 56,
      "social": 77
    },
    "topics": [
      "Outdoor Activities",
      "Home & Garden",
      "Sports & Recreation",
      "Home & Family",
      "Nature & Environment",
      "Food & Beverages"
    ],
    "portrait": "../assets/audiences/environmentalist.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/31.-Eco-Enthusiasts.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "luxury-seekers",
    "name": "Luxury Seekers",
    "group": "trendsetter",
    "size": 13000000,
    "desc": "Affluent individuals seeking exclusivity, craftsmanship, and premium experiences that reflect sophistication and status.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      }
    ],
    "consumption": {
      "video": 64,
      "audio": 34,
      "tv": 46,
      "podcast": 33,
      "social": 74
    },
    "topics": [
      "Sports & Recreation",
      "Health & Wellness",
      "Computer & Technology",
      "Home & Family",
      "Travel",
      "Fashion & Beauty"
    ],
    "portrait": "../assets/audiences/luxury-seekers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/32.Luxury-Seekers.jpg",
    "addressable": null,
    "fit": null,
    "pair": {
      "id": "luxury-buyers",
      "role": "fan"
    },
    "lens": "love"
  },
  {
    "id": "fashion-icons",
    "name": "Fashion Icons",
    "group": "trendsetter",
    "size": 12000000,
    "desc": "Trendsetters expressing individuality through bold, modern, and culturally conscious fashion choices.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      }
    ],
    "consumption": {
      "video": 58,
      "audio": 27,
      "tv": 43,
      "communities": 48,
      "social": 67
    },
    "topics": [
      "Music",
      "Business",
      "Computer & Technology",
      "Food Beverages",
      "Fashion & Beauty",
      "Sports & Recreation"
    ],
    "portrait": "../assets/audiences/fashion-icons.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/33.-Fashion-Icons.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "corporate-leaders",
    "name": "Corporate Leaders",
    "group": "business",
    "size": 12000000,
    "desc": "Senior leaders driving innovation, strategy, and growth through data, leadership insights, and digital transformation.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 61,
      "audio": 29,
      "tv": 44,
      "podcast": 28,
      "social": 69
    },
    "topics": [
      "Personal Finance",
      "Business",
      "Computer & Technology",
      "Health & Wellness",
      "Travel",
      "Fitness & Exercise"
    ],
    "portrait": "../assets/audiences/corporate-leaders.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/34.-Corperate-Visionaries.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "smes",
    "name": "SMEs",
    "group": "business",
    "size": 11000000,
    "desc": "Entrepreneurs focused on scaling businesses through funding, strategy, and sustainable digital growth.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 64,
      "audio": 56,
      "tv": 45,
      "podcast": 33,
      "social": 73
    },
    "topics": [
      "Personal Finance",
      "Business",
      "Computer & Technology",
      "Home & Family",
      "Investing",
      "News"
    ],
    "portrait": "../assets/audiences/smes.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/35.SME_.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "emerging-affluents",
    "name": "Emerging Affluents",
    "group": "business",
    "size": 11000000,
    "desc": "Ambitious professionals elevating their lifestyle through premium experiences, smart investments, and status-driven choices.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 68,
      "audio": 36,
      "tv": 48,
      "podcast": 36,
      "social": 77
    },
    "topics": [
      "Entertainment",
      "Food & Beverages",
      "Computer & Technology",
      "Home & Family",
      "Travel",
      "Fashion & Beauty"
    ],
    "portrait": "../assets/audiences/emerging-affluents.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/36.-Emerging-Affluents.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "start-up-entrepreneurs",
    "name": "Start-up Entrepreneurs",
    "group": "business",
    "size": 11000000,
    "desc": "Driven entrepreneurs turning passions into businesses through creativity, digital innovation, and strong branding.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      }
    ],
    "consumption": {
      "video": 66,
      "audio": 59,
      "tv": 44,
      "podcast": 38,
      "social": 76
    },
    "topics": [
      "Home & Family",
      "Business",
      "Food Beverages",
      "Fashion & Beauty",
      "Sports & Recreation",
      "Personal Finance"
    ],
    "portrait": "../assets/audiences/start-up-entrepreneurs.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/37.-StartUps.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "who"
  },
  {
    "id": "comedy-fans",
    "name": "Comedy Fans",
    "group": "entertainment",
    "size": 13000000,
    "desc": "Fans who seek laughter, witty humour, and lighthearted films that offer fun escapes.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "ulagam",
        "note": "Entertainment News, Lifestyle"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 67,
      "audio": 30,
      "tv": 46,
      "podcast": 30,
      "social": 70
    },
    "topics": [
      "Entertainment",
      "Computer & Technology",
      "Food Beverages",
      "Home & Family",
      "Fashion & Beauty",
      "Celebrities"
    ],
    "portrait": "../assets/audiences/comedy-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/38.-Comedy-Lovers.jpg",
    "addressable": 204600,
    "fit": "Strong organic amplification. Suits social video over premium OTT.",
    "pair": null,
    "lens": "love"
  },
  {
    "id": "rom-com-fans",
    "name": "Rom-Com Fans",
    "group": "entertainment",
    "size": 17000000,
    "desc": "Fans who enjoy humorous, heartwarming love stories filled with charm, wit, and relatable moments.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 58,
      "audio": 26,
      "tv": 45,
      "podcast": 26,
      "social": 65
    },
    "topics": [
      "Entertainment",
      "Food & Beverages",
      "Computer & Technology",
      "Home & Family",
      "Sports & Recreation",
      "Fashion & Beauty"
    ],
    "portrait": "../assets/audiences/rom-com-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/39.-Romantic-Comedy-Lovers.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "animation-fans",
    "name": "Animation Fans",
    "group": "entertainment",
    "size": 13000000,
    "desc": "Audiences captivated by creative storytelling, emotional depth, and imaginative animated worlds for all ages.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 66,
      "audio": 30,
      "tv": 46,
      "podcast": 29,
      "social": 69
    },
    "topics": [
      "Entertainment",
      "Video Games",
      "Computer & Technology",
      "Home & Family",
      "Music",
      "Toys & Games"
    ],
    "portrait": "../assets/audiences/animation-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/40.-Animation.jpg",
    "addressable": 22600,
    "fit": "Small but high-attention. Good for family or school-holiday timing.",
    "pair": null,
    "lens": "love"
  },
  {
    "id": "sci-fi-fantasy-fans",
    "name": "Sci-fi & Fantasy Fans",
    "group": "entertainment",
    "size": 13000000,
    "desc": "Imaginative fans drawn to futuristic worlds, advanced tech, and thought-provoking, mind-expanding storytelling.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      }
    ],
    "consumption": {
      "video": 68,
      "audio": 52,
      "tv": 68,
      "podcast": 30,
      "social": 71
    },
    "topics": [
      "Entertainment",
      "Food & Beverages",
      "Computer & Technology",
      "Home & Family",
      "Toys & Games",
      "Celebrities"
    ],
    "portrait": "../assets/audiences/sci-fi-fantasy-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/41.SciFi_.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "horror-fans",
    "name": "Horror Fans",
    "group": "entertainment",
    "size": 13000000,
    "desc": "Thrill-seekers captivated by suspense, fear, and psychological storytelling that sparks adrenaline and intrigue.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      }
    ],
    "consumption": {
      "video": 67,
      "audio": 30,
      "tv": 47,
      "podcast": 30,
      "social": 70
    },
    "topics": [
      "Entertainment",
      "Food & Beverages",
      "Computer & Technology",
      "Home & Family",
      "Video Games",
      "Celebrities"
    ],
    "portrait": "../assets/audiences/horror-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/42.Horror.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "action-adventure-fans",
    "name": "Action & Adventure Fans",
    "group": "entertainment",
    "size": 13000000,
    "desc": "For those who live for adrenaline: big heroes, daring plots, and cinematic worlds that keep you on the edge.",
    "properties": [
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      }
    ],
    "consumption": {
      "video": 72,
      "audio": 42,
      "tv": 44,
      "podcast": 45,
      "social": 71
    },
    "topics": [
      "Entertainment",
      "Food & Beverages",
      "Computer & Technology",
      "Home & Family",
      "Fitness & Exercise",
      "Travel"
    ],
    "portrait": "../assets/audiences/action-adventure-fans.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/43.-Action-Adventure.jpg",
    "addressable": 169600,
    "fit": "Video-led awareness. Skews late-evening and weekend viewing.",
    "pair": null,
    "lens": "love"
  },
  {
    "id": "music-concert-goers",
    "name": "Music & Concert Goers",
    "group": "entertainment",
    "size": 14000000,
    "desc": "Music lovers seeking authentic live experiences, VIP access, and emotional connection through performance.",
    "properties": [
      {
        "key": "ulagam",
        "note": "Entertainment News, Lifestyle"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      },
      {
        "key": "sooka",
        "note": "Movie Streaming, Entertainment"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      }
    ],
    "consumption": {
      "video": 62,
      "audio": 30,
      "tv": 62,
      "podcast": 29,
      "social": 71
    },
    "topics": [
      "Music",
      "Celebrities",
      "Food & Beverages",
      "Concerts",
      "Travel",
      "Fashion & Beauty"
    ],
    "portrait": "../assets/audiences/music-concert-goers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/44.-Music-Concert-Goers.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "love"
  },
  {
    "id": "online-shoppers",
    "name": "Online Shoppers",
    "group": "shopping",
    "size": 14000000,
    "desc": "Digital-savvy consumers who seek trendy, quality, and convenient purchases that express personal style.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 61,
      "audio": 29,
      "tv": 44,
      "podcast": 28,
      "social": 69
    },
    "topics": [
      "Health & Wellness",
      "Sporting Goods",
      "Electronic Gadget & Appliances",
      "Home & Garden",
      "Food & Beverages",
      "Apparel & Accessories"
    ],
    "portrait": "../assets/audiences/online-shoppers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/45.-Online-Shoppers.jpg",
    "addressable": null,
    "fit": null,
    "pair": null,
    "lens": "buying"
  },
  {
    "id": "automotive-buyers",
    "name": "Automotive Buyers",
    "group": "shopping",
    "size": 12000000,
    "desc": "Car buyers seeking vehicles that balance lifestyle, affordability, safety, and performance.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      }
    ],
    "consumption": {
      "video": 67,
      "audio": 36,
      "tv": 47,
      "podcast": 35,
      "social": 76
    },
    "topics": [
      "Automobiles",
      "Audio",
      "Motorcycles",
      "Vehicles Parts",
      "Apparel & Accessories",
      "Sports Goods & Fitness"
    ],
    "portrait": "../assets/audiences/automotive-buyers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/46.-Automative-Intent.jpg",
    "addressable": 34700,
    "fit": "Small, expensive, converts. Worth a disproportionate budget share.",
    "pair": {
      "id": "automotive-fans",
      "role": "buyer"
    },
    "lens": "buying"
  },
  {
    "id": "home-buyers",
    "name": "Home Buyers",
    "group": "shopping",
    "size": 13000000,
    "desc": "Individuals and families seeking affordable, well-located homes with strong amenities and investment value.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      }
    ],
    "consumption": {
      "video": 65,
      "audio": 55,
      "tv": 46,
      "podcast": 32,
      "social": 73
    },
    "topics": [
      "Personal Finance",
      "Real Estate",
      "Investing",
      "Home & Garden",
      "Electronic Gadget & Appliances",
      "Furniture"
    ],
    "portrait": "../assets/audiences/home-buyers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/47.-Home-Buyers.jpg",
    "addressable": 889000,
    "fit": "Longer consideration. Needs sustained presence, not a burst.",
    "pair": null,
    "lens": "buying"
  },
  {
    "id": "luxury-buyers",
    "name": "Luxury Buyers",
    "group": "shopping",
    "size": 12000000,
    "desc": "Affluent consumers seeking exclusivity, craftsmanship, and personalized luxury across fashion, beauty, homes, and tech.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      }
    ],
    "consumption": {
      "video": 65,
      "audio": 34,
      "tv": 46,
      "podcast": 34,
      "social": 74
    },
    "topics": [
      "Electronic Gadget & Appliances",
      "Beauty & Wellness",
      "Computer & Technology",
      "Automobiles",
      "Apparel & Accessories",
      "Sports Goods & Fitness"
    ],
    "portrait": "../assets/audiences/luxury-buyers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/48.Luxury-Buyers.jpg",
    "addressable": null,
    "fit": null,
    "pair": {
      "id": "luxury-seekers",
      "role": "buyer"
    },
    "lens": "buying"
  },
  {
    "id": "tech-gadget-buyers",
    "name": "Tech & Gadget Buyers",
    "group": "shopping",
    "size": 13000000,
    "desc": "Innovation-driven consumers exploring cutting-edge devices, valuing performance, features, and trusted brand reputation.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "stadium",
        "note": "Sports News & Highlights, Tournament Live Updates"
      },
      {
        "key": "hiburan",
        "note": "Celebrities News"
      }
    ],
    "consumption": {
      "video": 64,
      "audio": 47,
      "tv": 46,
      "communities": 56,
      "social": 73
    },
    "topics": [
      "Electronic Gadget & Appliances",
      "Audio",
      "Computer & Technology",
      "Electronics",
      "Mobile & Wireless Devices",
      "Automobiles"
    ],
    "portrait": "../assets/audiences/tech-gadget-buyers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/49.-TechGadget-Enthusiasts.jpg",
    "addressable": null,
    "fit": null,
    "pair": {
      "id": "gadget-gurus",
      "role": "buyer"
    },
    "lens": "buying"
  },
  {
    "id": "health-wellness-buyers",
    "name": "Health & Wellness Buyers",
    "group": "shopping",
    "size": 15000000,
    "desc": "Health-conscious individuals pursuing balance through fitness, nutrition, and self-care products that enhance well-being.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "rasa",
        "note": "Recipe, Food Guides"
      }
    ],
    "consumption": {
      "video": 58,
      "audio": 29,
      "tv": 42,
      "podcast": 27,
      "social": 67
    },
    "topics": [
      "Electronic Gadget & Appliances",
      "Beauty & Wellness",
      "Personal Care",
      "Home & Garden",
      "Apparel & Accessories",
      "Sports Goods & Fitness"
    ],
    "portrait": "../assets/audiences/health-wellness-buyers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/50.-HealthWellness-Shoppers.jpg",
    "addressable": null,
    "fit": null,
    "pair": {
      "id": "wellness-explorers",
      "role": "buyer"
    },
    "lens": "buying"
  },
  {
    "id": "travel-experience-seekers",
    "name": "Travel & Experience Seekers",
    "group": "shopping",
    "size": 15000000,
    "desc": "Adventurous travelers seeking cultural immersion, comfort, and exclusive, memory-rich experiences worldwide.",
    "properties": [
      {
        "key": "awani",
        "note": "Current Affairs, National News, Global Affairs, Sports News, Lifestyle, Tech"
      },
      {
        "key": "xuan",
        "note": "News, Lifestyle, Entertainment News"
      },
      {
        "key": "gempak",
        "note": "Lifestyle, Entertainment News, Trends"
      },
      {
        "key": "syok",
        "note": "Music & Radio Streaming, Podcast"
      }
    ],
    "consumption": {
      "video": 58,
      "audio": 27,
      "tv": 43,
      "podcast": 48,
      "social": 66
    },
    "topics": [
      "Mobile & Wireless Devices",
      "Beauty & Wellness",
      "Entertainment",
      "Audio",
      "Travel",
      "Apparel & Accessories"
    ],
    "portrait": "../assets/audiences/travel-experience-seekers.jpg",
    "image": "https://kult.my/wp-content/uploads/2025/12/51.-Travel-Experience-Seekers.jpg",
    "addressable": null,
    "fit": null,
    "pair": {
      "id": "adventure-seekers",
      "role": "buyer"
    },
    "lens": "buying"
  }
];
