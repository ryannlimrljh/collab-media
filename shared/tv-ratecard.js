/* The Video (TV) rate card.
   ─────────────────────────────────────────────────────────────────────
   Transcribed from RUNS_ON_CHIPS.md, which was read out of the
   production database on 5 Oct 2026 (Collab: Sales data of 26 Aug
   2026). 86 channels, 176 buyable lines. The channel census, the
   channel numbers, the segments and every line's entitlement, timebelt,
   days, pricing category and 30 second price are production's own.

   A line is what you actually buy:

     ch       channel number, which is how production joins a line to a
              channel. Never by name: Zee Cinema/Z Cinema and Astro
              Tutor TV/Tutor TV are each two numbers for one brand.
     ent      entitlement, what is being sold
     belt     timebelt or programme
     days     which days it runs
     cat      pricing category off the TV rate card
     rate     ringgit for a 30 second spot
     daypart  DERIVED, see daypartOf() in the generator. The only field
              production does not carry. Replace it the moment the feed
              grows a real classification.

   Five channels carry no priced line and so cannot be bought: 804, 812,
   813 (their rate card rows name another channel as their pricing
   category), 117 and 603. They are kept here because production still
   shows them, greyed, under Runs on.

   Eight channels have no published reach. Verbatim oddities from the
   source are preserved on purpose, including the Astro Ceria timebelt
   of "d" and channel 550's name being a sentence. */
window.TV_RATECARD = {
  universe: 15262000,
  reachSource: 'Kantar Media DTAM, Total Individual, universe 15,262K',
  channels: [
    {
      "id": "104",
      "no": 104,
      "name": "Astro Ria",
      "reach": 7860000,
      "segment": "Malay",
      "lines": 14
    },
    {
      "id": "105",
      "no": 105,
      "name": "Astro Prima",
      "reach": 6810000,
      "segment": "Malay",
      "lines": 5
    },
    {
      "id": "801",
      "no": 801,
      "name": "Astro Arena",
      "reach": 5310000,
      "segment": "Sports",
      "lines": 4
    },
    {
      "id": "802",
      "no": 802,
      "name": "Astro Arena 2",
      "reach": 5310000,
      "segment": "Sports",
      "lines": 3
    },
    {
      "id": "108",
      "no": 108,
      "name": "Astro Citra",
      "reach": 4710000,
      "segment": "Malay",
      "lines": 2
    },
    {
      "id": "803",
      "no": 803,
      "name": "Astro Arena Bola",
      "reach": 4420000,
      "segment": "Sports",
      "lines": 7
    },
    {
      "id": "804",
      "no": 804,
      "name": "Astro Arena Bola 2",
      "reach": 4420000,
      "segment": "",
      "lines": 0
    },
    {
      "id": "106",
      "no": 106,
      "name": "Astro Oasis",
      "reach": 4400000,
      "segment": "Malay",
      "lines": 2
    },
    {
      "id": "811",
      "no": 811,
      "name": "Astro Premier League",
      "reach": 3740000,
      "segment": "Sports",
      "lines": 3
    },
    {
      "id": "812",
      "no": 812,
      "name": "Astro Premier League 2",
      "reach": 3740000,
      "segment": "",
      "lines": 0
    },
    {
      "id": "813",
      "no": 813,
      "name": "Astro Premier League 3",
      "reach": 3740000,
      "segment": "",
      "lines": 0
    },
    {
      "id": "815",
      "no": 815,
      "name": "Astro Badminton",
      "reach": 3670000,
      "segment": "Sports",
      "lines": 2
    },
    {
      "id": "413",
      "no": 413,
      "name": "Astro Showcase",
      "reach": 3200000,
      "segment": "English",
      "lines": 2
    },
    {
      "id": "611",
      "no": 611,
      "name": "Astro Ceria",
      "reach": 3000000,
      "segment": "GenNext",
      "lines": 2
    },
    {
      "id": "701",
      "no": 701,
      "name": "AXN",
      "reach": 2600000,
      "segment": "English",
      "lines": 3
    },
    {
      "id": "401",
      "no": 401,
      "name": "HITS Movies",
      "reach": 2600000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "810",
      "no": 810,
      "name": "Astro Grandstand",
      "reach": 2560000,
      "segment": "Sports",
      "lines": 2
    },
    {
      "id": "404",
      "no": 404,
      "name": "Astro BOO",
      "reach": 2530000,
      "segment": "Malay",
      "lines": 1
    },
    {
      "id": "501",
      "no": 501,
      "name": "Astro AWANI",
      "reach": 2400000,
      "segment": "News",
      "lines": 9
    },
    {
      "id": "203",
      "no": 203,
      "name": "Astro Vellithirai",
      "reach": 2300000,
      "segment": "Indian",
      "lines": 2
    },
    {
      "id": "416",
      "no": 416,
      "name": "tvN Movies",
      "reach": 2200000,
      "segment": "Korean",
      "lines": 1
    },
    {
      "id": "112",
      "no": 112,
      "name": "Astro Rania",
      "reach": 2160000,
      "segment": "Malay",
      "lines": 1
    },
    {
      "id": "202",
      "no": 202,
      "name": "Astro Vinmeen",
      "reach": 2100000,
      "segment": "Indian",
      "lines": 2
    },
    {
      "id": "113",
      "no": 113,
      "name": "Astro Aura",
      "reach": 1630000,
      "segment": "Malay",
      "lines": 1
    },
    {
      "id": "306",
      "no": 306,
      "name": "Astro AEC",
      "reach": 1600000,
      "segment": "Chinese",
      "lines": 15
    },
    {
      "id": "117",
      "no": 117,
      "name": "Z Cinema",
      "reach": 1600000,
      "segment": "",
      "lines": 0
    },
    {
      "id": "709",
      "no": 709,
      "name": "Asian Food Network",
      "reach": 1500000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "393",
      "no": 393,
      "name": "Astro Daebak",
      "reach": 1500000,
      "segment": "Korean",
      "lines": 2
    },
    {
      "id": "309",
      "no": 309,
      "name": "Celestial Movies",
      "reach": 1500000,
      "segment": "Chinese",
      "lines": 2
    },
    {
      "id": "216",
      "no": 216,
      "name": "KTV",
      "reach": 1500000,
      "segment": "Indian",
      "lines": 2
    },
    {
      "id": "211",
      "no": 211,
      "name": "Sun TV",
      "reach": 1500000,
      "segment": "Indian",
      "lines": 2
    },
    {
      "id": "814",
      "no": 814,
      "name": "Astro Football",
      "reach": 1490000,
      "segment": "Sports",
      "lines": 2
    },
    {
      "id": "201",
      "no": 201,
      "name": "Astro Vaanavil",
      "reach": 1400000,
      "segment": "Indian",
      "lines": 3
    },
    {
      "id": "222",
      "no": 222,
      "name": "Colors Tamil HD",
      "reach": 1400000,
      "segment": "Indian",
      "lines": 1
    },
    {
      "id": "223",
      "no": 223,
      "name": "Zee Tamil HD",
      "reach": 1400000,
      "segment": "Indian",
      "lines": 2
    },
    {
      "id": "703",
      "no": 703,
      "name": "Lifetime",
      "reach": 1300000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "214",
      "no": 214,
      "name": "Adithya",
      "reach": 1200000,
      "segment": "Indian",
      "lines": 1
    },
    {
      "id": "116",
      "no": 116,
      "name": "Colors Hindi HD",
      "reach": 1200000,
      "segment": "Indian",
      "lines": 1
    },
    {
      "id": "212",
      "no": 212,
      "name": "Sun Music",
      "reach": 1100000,
      "segment": "Indian",
      "lines": 1
    },
    {
      "id": "707",
      "no": 707,
      "name": "TLC",
      "reach": 1100000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "395",
      "no": 395,
      "name": "tvN",
      "reach": 1100000,
      "segment": "Korean",
      "lines": 2
    },
    {
      "id": "311",
      "no": 311,
      "name": "Astro AOD",
      "reach": 1000000,
      "segment": "Chinese",
      "lines": 4
    },
    {
      "id": "217",
      "no": 217,
      "name": "Sun Life",
      "reach": 1000000,
      "segment": "Indian",
      "lines": 2
    },
    {
      "id": "310",
      "no": 310,
      "name": "TVB Jade",
      "reach": 975000,
      "segment": "Chinese",
      "lines": 6
    },
    {
      "id": "555",
      "no": 555,
      "name": "HISTORY",
      "reach": 968000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "300",
      "no": 300,
      "name": "iQIYI HD",
      "reach": 937000,
      "segment": "Chinese",
      "lines": 2
    },
    {
      "id": "706",
      "no": 706,
      "name": "HITS",
      "reach": 916000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "392",
      "no": 392,
      "name": "KBS World",
      "reach": 910000,
      "segment": "Korean",
      "lines": 1
    },
    {
      "id": "308",
      "no": 308,
      "name": "Astro QJ",
      "reach": 905000,
      "segment": "Chinese",
      "lines": 2
    },
    {
      "id": "321",
      "no": 321,
      "name": "Celestial Classic Movies",
      "reach": 897000,
      "segment": "Chinese",
      "lines": 1
    },
    {
      "id": "553",
      "no": 553,
      "name": "Discovery Asia",
      "reach": 896000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "305",
      "no": 305,
      "name": "TVB Classic",
      "reach": 884000,
      "segment": "Chinese",
      "lines": 2
    },
    {
      "id": "554",
      "no": 554,
      "name": "BBC Earth",
      "reach": 868000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "333",
      "no": 333,
      "name": "Astro Hua Hee Dai",
      "reach": 831000,
      "segment": "Chinese",
      "lines": 5
    },
    {
      "id": "552",
      "no": 552,
      "name": "Discovery Channel",
      "reach": 826000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "396",
      "no": 396,
      "name": "K-PLUS",
      "reach": 784000,
      "segment": "Korean",
      "lines": 2
    },
    {
      "id": "215",
      "no": 215,
      "name": "Sun News",
      "reach": 765000,
      "segment": "Indian",
      "lines": 1
    },
    {
      "id": "715",
      "no": 715,
      "name": "HGTV",
      "reach": 687000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "702",
      "no": 702,
      "name": "HITS NOW",
      "reach": 682000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "618",
      "no": 618,
      "name": "Moonbug",
      "reach": 681000,
      "segment": "GenNext",
      "lines": 1
    },
    {
      "id": "319",
      "no": 319,
      "name": "TVB Xing He",
      "reach": 619000,
      "segment": "Chinese",
      "lines": 2
    },
    {
      "id": "511",
      "no": 511,
      "name": "CNN",
      "reach": 604000,
      "segment": "News",
      "lines": 1
    },
    {
      "id": "316",
      "no": 316,
      "name": "CTI Asia",
      "reach": 586000,
      "segment": "Chinese",
      "lines": 1
    },
    {
      "id": "817",
      "no": 817,
      "name": "Astro Sports Plus",
      "reach": 575000,
      "segment": "Sports",
      "lines": 2
    },
    {
      "id": "325",
      "no": 325,
      "name": "Phoenix Chinese Channel",
      "reach": 568000,
      "segment": "Chinese",
      "lines": 1
    },
    {
      "id": "615",
      "no": 615,
      "name": "Cartoon Network",
      "reach": 563000,
      "segment": "GenNext",
      "lines": 1
    },
    {
      "id": "320",
      "no": 320,
      "name": "TVBS Asia",
      "reach": 554000,
      "segment": "Chinese",
      "lines": 2
    },
    {
      "id": "326",
      "no": 326,
      "name": "Phoenix InfoNews Channel",
      "reach": 544000,
      "segment": "Chinese",
      "lines": 1
    },
    {
      "id": "512",
      "no": 512,
      "name": "BBC News",
      "reach": 473000,
      "segment": "News",
      "lines": 1
    },
    {
      "id": "515",
      "no": 515,
      "name": "CNA",
      "reach": 465000,
      "segment": "News",
      "lines": 1
    },
    {
      "id": "714",
      "no": 714,
      "name": "Crime + Investigation",
      "reach": 429000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "513",
      "no": 513,
      "name": "Al Jazeera English",
      "reach": 424000,
      "segment": "News",
      "lines": 2
    },
    {
      "id": "717",
      "no": 717,
      "name": "BBC Lifestyle",
      "reach": 337000,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "619",
      "no": 619,
      "name": "Blippi & Friends",
      "reach": 326000,
      "segment": "GenNext",
      "lines": 1
    },
    {
      "id": "831",
      "no": 831,
      "name": "Astro Golf",
      "reach": 321000,
      "segment": "Sports",
      "lines": 2
    },
    {
      "id": "603",
      "no": 603,
      "name": "Tutor TV",
      "reach": 314000,
      "segment": "",
      "lines": 0
    },
    {
      "id": "517",
      "no": 517,
      "name": "Bloomberg TV",
      "reach": 298000,
      "segment": "News",
      "lines": 1
    },
    {
      "id": "516",
      "no": 516,
      "name": "CNBC Asia",
      "reach": 136000,
      "segment": "News",
      "lines": 1
    },
    {
      "id": "412",
      "no": 412,
      "name": "Astro FAM Time",
      "reach": 0,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "411",
      "no": 411,
      "name": "Astro Showtime",
      "reach": 0,
      "segment": "English",
      "lines": 2
    },
    {
      "id": "819",
      "no": 819,
      "name": "Astro Tennis",
      "reach": 0,
      "segment": "Sports",
      "lines": 2
    },
    {
      "id": "601",
      "no": 601,
      "name": "Astro Tutor TV",
      "reach": 0,
      "segment": "GenNext",
      "lines": 1
    },
    {
      "id": "550",
      "no": 550,
      "name": "Love Nature Commercial buy is not available on Love Nature 4K channel",
      "reach": 0,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "414",
      "no": 414,
      "name": "Rock Action",
      "reach": 0,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "415",
      "no": 415,
      "name": "Rock X Stream",
      "reach": 0,
      "segment": "English",
      "lines": 1
    },
    {
      "id": "251",
      "no": 251,
      "name": "Zee Cinema",
      "reach": 0,
      "segment": "Indian",
      "lines": 1
    }
  ],
  lines: [
    {
      "id": "tv-104-1",
      "ch": "104",
      "ent": "TVC Spot",
      "belt": "12am - 12pm",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-104-2",
      "ch": "104",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-104-3",
      "ch": "104",
      "ent": "Branded Promo",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-104-4",
      "ch": "104",
      "ent": "TVC Spot",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-104-5",
      "ch": "104",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-6",
      "ch": "104",
      "ent": "1 minute special report coverage",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-7",
      "ch": "104",
      "ent": "Animated Bug",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-8",
      "ch": "104",
      "ent": "Lower 3rd Bottom Banner",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-9",
      "ch": "104",
      "ent": "Opening & Closing",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-10",
      "ch": "104",
      "ent": "TVC Inside Program",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-11",
      "ch": "104",
      "ent": "TVC Spot",
      "belt": "11pm - 12am",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Late"
    },
    {
      "id": "tv-104-12",
      "ch": "104",
      "ent": "TVC Spot",
      "belt": "6pm - 10pm",
      "days": "Mon - Thu",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-13",
      "ch": "104",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Fri - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-104-14",
      "ch": "104",
      "ent": "TVC Spot",
      "belt": "10pm -11pm",
      "days": "Mon - Thu",
      "cat": "x15",
      "rate": 15000,
      "daypart": "Prime"
    },
    {
      "id": "tv-105-1",
      "ch": "105",
      "ent": "TVC Spot",
      "belt": "12pm - 12pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-105-2",
      "ch": "105",
      "ent": "TVC Spot",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-105-3",
      "ch": "105",
      "ent": "TVC Spot",
      "belt": "6pm - 12mn",
      "days": "Sat - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-105-4",
      "ch": "105",
      "ent": "TVC Spot",
      "belt": "7pm - 12mn",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-105-5",
      "ch": "105",
      "ent": "TVC Spot",
      "belt": "6pm -7pm",
      "days": "Mon - Fri",
      "cat": "x14",
      "rate": 14000,
      "daypart": "Prime"
    },
    {
      "id": "tv-801-1",
      "ch": "801",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-801-2",
      "ch": "801",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-801-3",
      "ch": "801",
      "ent": "Any",
      "belt": "News and Talk Shows (1st Run)",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-801-4",
      "ch": "801",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-802-1",
      "ch": "802",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-802-2",
      "ch": "802",
      "ent": "Any",
      "belt": "News and Talk Shows (1st Run)",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-802-3",
      "ch": "802",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-108-1",
      "ch": "108",
      "ent": "TVC Spot",
      "belt": "12am - 9pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-108-2",
      "ch": "108",
      "ent": "TVC Spot",
      "belt": "9pm - 1am",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Late"
    },
    {
      "id": "tv-803-1",
      "ch": "803",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-803-2",
      "ch": "803",
      "ent": "Any",
      "belt": "Asean Championship Mitsubishi Cup, AFC Champions League Elite, AFC Champions League TWO, Asian Cup Championship",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-803-3",
      "ch": "803",
      "ent": "Any",
      "belt": "Liga Super Malaysia (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x12",
      "rate": 12000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-803-4",
      "ch": "803",
      "ent": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Knock Out Stage (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x12",
      "rate": 12000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-803-5",
      "ch": "803",
      "ent": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Quarter-Finals (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x15",
      "rate": 15000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-803-6",
      "ch": "803",
      "ent": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Semi-Finals (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x18",
      "rate": 18000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-803-7",
      "ch": "803",
      "ent": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Finals (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x20",
      "rate": 20000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-106-1",
      "ch": "106",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-106-2",
      "ch": "106",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-811-1",
      "ch": "811",
      "ent": "Any",
      "belt": "Others vs Others (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-811-2",
      "ch": "811",
      "ent": "Any",
      "belt": "Big 6 vs Others (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x15",
      "rate": 15000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-811-3",
      "ch": "811",
      "ent": "Any",
      "belt": "Big 6 vs Big 6 (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x20",
      "rate": 20000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-815-1",
      "ch": "815",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-815-2",
      "ch": "815",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-413-1",
      "ch": "413",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-413-2",
      "ch": "413",
      "ent": "TVC Spot",
      "belt": "6pm -12am",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Prime"
    },
    {
      "id": "tv-611-1",
      "ch": "611",
      "ent": "Any",
      "belt": "d",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Not stated"
    },
    {
      "id": "tv-611-2",
      "ch": "611",
      "ent": "Any",
      "belt": "8am - 6pm",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-701-1",
      "ch": "701",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-701-2",
      "ch": "701",
      "ent": "TVC Spot",
      "belt": "6pm - 9pm",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Prime"
    },
    {
      "id": "tv-701-3",
      "ch": "701",
      "ent": "TVC Spot",
      "belt": "9pm - 12am",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Prime"
    },
    {
      "id": "tv-401-1",
      "ch": "401",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-810-1",
      "ch": "810",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-810-2",
      "ch": "810",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x15",
      "rate": 15000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-404-1",
      "ch": "404",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-501-1",
      "ch": "501",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-501-2",
      "ch": "501",
      "ent": "1 minute special report coverage",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-3",
      "ch": "501",
      "ent": "Animated Bug",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-4",
      "ch": "501",
      "ent": "Branded Promo",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-5",
      "ch": "501",
      "ent": "Lower 3rd Bottom Banner",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-6",
      "ch": "501",
      "ent": "Lower Third Banner",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-7",
      "ch": "501",
      "ent": "Opening & Closing",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-8",
      "ch": "501",
      "ent": "TVC Inside Program",
      "belt": "7.45pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-501-9",
      "ch": "501",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-203-1",
      "ch": "203",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-203-2",
      "ch": "203",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Prime"
    },
    {
      "id": "tv-416-1",
      "ch": "416",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-112-1",
      "ch": "112",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-202-1",
      "ch": "202",
      "ent": "TVC Spot",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-202-2",
      "ch": "202",
      "ent": "TVC Spot",
      "belt": "8pm - 12am",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-113-1",
      "ch": "113",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-306-1",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "12am - 12pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-306-2",
      "ch": "306",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-306-3",
      "ch": "306",
      "ent": "Extension 1 minute market spotlight",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-306-4",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-306-5",
      "ch": "306",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm)",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-6",
      "ch": "306",
      "ent": "Branded Stage with sponsor's logo",
      "belt": "6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm)",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-7",
      "ch": "306",
      "ent": "Extension 1 minute market spotlight",
      "belt": "6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm)",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-8",
      "ch": "306",
      "ent": "Lower Third Banner",
      "belt": "6pm - 12am (excl. 8pm - 8:30pm & 10:30pm - 11pm)",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-9",
      "ch": "306",
      "ent": "Opening & Closing",
      "belt": "8pm - 8.30pm",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-10",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "10.30pm - 12mn",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Late"
    },
    {
      "id": "tv-306-11",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "6pm - 8pm",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-12",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "8.30pm - 10.30pm",
      "days": "Mon - Sun",
      "cat": "x9",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-13",
      "ch": "306",
      "ent": "1 minute market spotlight (PRIME TALK)",
      "belt": "8pm - 8.30pm",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-14",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "10.30pm - 11pm",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-306-15",
      "ch": "306",
      "ent": "TVC Spot",
      "belt": "8pm - 8.30pm",
      "days": "Mon - Sun",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-709-1",
      "ch": "709",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-393-1",
      "ch": "393",
      "ent": "TVC Spot",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-393-2",
      "ch": "393",
      "ent": "TVC Spot",
      "belt": "8pm - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-309-1",
      "ch": "309",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-309-2",
      "ch": "309",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-216-1",
      "ch": "216",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-216-2",
      "ch": "216",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Prime"
    },
    {
      "id": "tv-211-1",
      "ch": "211",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-211-2",
      "ch": "211",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-814-1",
      "ch": "814",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-814-2",
      "ch": "814",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-201-1",
      "ch": "201",
      "ent": "TVC Spot",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-201-2",
      "ch": "201",
      "ent": "TVC Spot",
      "belt": "8pm - 12am",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Prime"
    },
    {
      "id": "tv-201-3",
      "ch": "201",
      "ent": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-222-1",
      "ch": "222",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-223-1",
      "ch": "223",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-223-2",
      "ch": "223",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Prime"
    },
    {
      "id": "tv-703-1",
      "ch": "703",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-214-1",
      "ch": "214",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-116-1",
      "ch": "116",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-212-1",
      "ch": "212",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-707-1",
      "ch": "707",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-395-1",
      "ch": "395",
      "ent": "TVC Spot",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-395-2",
      "ch": "395",
      "ent": "TVC Spot",
      "belt": "8pm - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-311-1",
      "ch": "311",
      "ent": "TVC Spot",
      "belt": "10.30pm - 12am",
      "days": "Mon - Fri",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Late"
    },
    {
      "id": "tv-311-2",
      "ch": "311",
      "ent": "TVC Spot",
      "belt": "12am - 8.30pm",
      "days": "Mon - Fri",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-311-3",
      "ch": "311",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Sat - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-311-4",
      "ch": "311",
      "ent": "TVC Spot",
      "belt": "8.30pm - 10.30pm",
      "days": "Mon - Fri",
      "cat": "x13",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "tv-217-1",
      "ch": "217",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-217-2",
      "ch": "217",
      "ent": "TVC Spot",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-310-1",
      "ch": "310",
      "ent": "TVC Spot",
      "belt": "12am - 1pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-310-2",
      "ch": "310",
      "ent": "TVC Spot",
      "belt": "1pm - 12am",
      "days": "Sat - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-310-3",
      "ch": "310",
      "ent": "TVC Spot",
      "belt": "1pm - 6.30pm",
      "days": "Mon - Fri",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-310-4",
      "ch": "310",
      "ent": "TVC Spot",
      "belt": "10.30pm - 12am",
      "days": "Mon - Fri",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Late"
    },
    {
      "id": "tv-310-5",
      "ch": "310",
      "ent": "TVC Spot",
      "belt": "6.30pm - 8.30pm",
      "days": "Mon - Fri",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-310-6",
      "ch": "310",
      "ent": "TVC Spot",
      "belt": "8.30pm - 10.30pm",
      "days": "Mon - Fri",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-555-1",
      "ch": "555",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-300-1",
      "ch": "300",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-300-2",
      "ch": "300",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-706-1",
      "ch": "706",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-392-1",
      "ch": "392",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-308-1",
      "ch": "308",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-308-2",
      "ch": "308",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-321-1",
      "ch": "321",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-553-1",
      "ch": "553",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-305-1",
      "ch": "305",
      "ent": "TVC Spot",
      "belt": "12am - 12pm",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-305-2",
      "ch": "305",
      "ent": "TVC Spot",
      "belt": "12pm - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-554-1",
      "ch": "554",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-333-1",
      "ch": "333",
      "ent": "TVC Spot",
      "belt": "12am - 12pm",
      "days": "Mon - Sun",
      "cat": "x4.5",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-333-2",
      "ch": "333",
      "ent": "Extension 1 minute market spotlight",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-333-3",
      "ch": "333",
      "ent": "TVC Spot",
      "belt": "12pm - 6pm",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-333-4",
      "ch": "333",
      "ent": "Extension 1 minute market spotlight",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-333-5",
      "ch": "333",
      "ent": "TVC Spot",
      "belt": "6pm - 12mn",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "tv-552-1",
      "ch": "552",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-396-1",
      "ch": "396",
      "ent": "TVC Spot",
      "belt": "12am - 8pm",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-396-2",
      "ch": "396",
      "ent": "TVC Spot",
      "belt": "8pm - 12am",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tv-215-1",
      "ch": "215",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-715-1",
      "ch": "715",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-702-1",
      "ch": "702",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-618-1",
      "ch": "618",
      "ent": "Any",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-319-1",
      "ch": "319",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-319-2",
      "ch": "319",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tv-511-1",
      "ch": "511",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-316-1",
      "ch": "316",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x2.5",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-817-1",
      "ch": "817",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-817-2",
      "ch": "817",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-325-1",
      "ch": "325",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x2.5",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-615-1",
      "ch": "615",
      "ent": "Any",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-320-1",
      "ch": "320",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x2.5",
      "rate": 2500,
      "daypart": "Daytime"
    },
    {
      "id": "tv-320-2",
      "ch": "320",
      "ent": "TVC Spot",
      "belt": "6pm - 12am",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Prime"
    },
    {
      "id": "tv-326-1",
      "ch": "326",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x2.5",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-512-1",
      "ch": "512",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-515-1",
      "ch": "515",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-714-1",
      "ch": "714",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-513-1",
      "ch": "513",
      "ent": "Branded Promo",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-513-2",
      "ch": "513",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-717-1",
      "ch": "717",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x4",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-619-1",
      "ch": "619",
      "ent": "Any",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3.5",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-831-1",
      "ch": "831",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-831-2",
      "ch": "831",
      "ent": "Any",
      "belt": "Competitive Rounds (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x8",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-517-1",
      "ch": "517",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-516-1",
      "ch": "516",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-412-1",
      "ch": "412",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-411-1",
      "ch": "411",
      "ent": "TVC Spot",
      "belt": "12am - 6pm",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tv-411-2",
      "ch": "411",
      "ent": "TVC Spot",
      "belt": "6pm -12am",
      "days": "Mon - Sun",
      "cat": "x10",
      "rate": 10000,
      "daypart": "Prime"
    },
    {
      "id": "tv-819-1",
      "ch": "819",
      "ent": "Any",
      "belt": "Others",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-819-2",
      "ch": "819",
      "ent": "Any",
      "belt": "All (Live or Delayed)",
      "days": "Mon - Sun",
      "cat": "x6",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "tv-601-1",
      "ch": "601",
      "ent": "Any",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x3",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-550-1",
      "ch": "550",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-414-1",
      "ch": "414",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x7",
      "rate": 7000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-415-1",
      "ch": "415",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tv-251-1",
      "ch": "251",
      "ent": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "days": "Mon - Sun",
      "cat": "x5",
      "rate": 5000,
      "daypart": "Run of schedule"
    }
  ]
};
