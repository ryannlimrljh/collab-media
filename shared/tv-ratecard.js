/* The Video (TV) rate card.
   ─────────────────────────────────────────────────────────────────────
   One row per buyable line. A line is four fields, not a name:

     ch       the channel it airs on          -> TV_RATECARD.channels
     spot     what you are buying             'TVC Spot', 'Animated Bug'
     belt     the timebelt or programme       '6pm - 10pm', 'Liga Super Malaysia'
     rate     ringgit per 30 second spot
     daypart  derived from belt, for filtering only

   'daypart' is the only field the source feed does not carry. It is
   derived by daypartOf() below so the picker has something coarse to
   filter on; swap in the real classification when the feed grows one.

   RECONSTRUCTED FOR THE PROTOTYPE. The channel census (name, monthly
   reach, line count) is read off the production build; the rates on
   the smaller channels are plausible rather than authoritative. Point
   this at the real feed before anyone quotes a number from it.

   Reach is Kantar Media DTAM monthly, Total Individual universe 15,262K. */
window.TV_RATECARD = {
  universe: 15262000,
  channels: [
    {
      "id": "astro-ria",
      "name": "Astro Ria",
      "reach": 7860000,
      "genre": "Malay",
      "lines": 14
    },
    {
      "id": "astro-prima",
      "name": "Astro Prima",
      "reach": 6810000,
      "genre": "Malay",
      "lines": 5
    },
    {
      "id": "astro-arena",
      "name": "Astro Arena",
      "reach": 5310000,
      "genre": "Sports",
      "lines": 4
    },
    {
      "id": "astro-arena-2",
      "name": "Astro Arena 2",
      "reach": 5310000,
      "genre": "Sports",
      "lines": 3
    },
    {
      "id": "astro-citra",
      "name": "Astro Citra",
      "reach": 4710000,
      "genre": "Malay",
      "lines": 2
    },
    {
      "id": "astro-arena-bola",
      "name": "Astro Arena Bola",
      "reach": 4420000,
      "genre": "Sports",
      "lines": 7
    },
    {
      "id": "astro-arena-bola-2",
      "name": "Astro Arena Bola 2",
      "reach": 4420000,
      "genre": "Sports",
      "lines": 0
    },
    {
      "id": "astro-oasis",
      "name": "Astro Oasis",
      "reach": 4400000,
      "genre": "Malay",
      "lines": 2
    },
    {
      "id": "astro-premier-league",
      "name": "Astro Premier League",
      "reach": 3740000,
      "genre": "Sports",
      "lines": 3
    },
    {
      "id": "astro-premier-league-2",
      "name": "Astro Premier League 2",
      "reach": 3740000,
      "genre": "Sports",
      "lines": 0
    },
    {
      "id": "astro-premier-league-3",
      "name": "Astro Premier League 3",
      "reach": 3740000,
      "genre": "Sports",
      "lines": 0
    },
    {
      "id": "astro-badminton",
      "name": "Astro Badminton",
      "reach": 3670000,
      "genre": "Sports",
      "lines": 2
    },
    {
      "id": "astro-showcase",
      "name": "Astro Showcase",
      "reach": 3200000,
      "genre": "Movies",
      "lines": 2
    },
    {
      "id": "astro-ceria",
      "name": "Astro Ceria",
      "reach": 3000000,
      "genre": "Kids",
      "lines": 2
    },
    {
      "id": "axn",
      "name": "AXN",
      "reach": 2600000,
      "genre": "English",
      "lines": 3
    },
    {
      "id": "hits-movies",
      "name": "HITS Movies",
      "reach": 2600000,
      "genre": "Movies",
      "lines": 1
    },
    {
      "id": "astro-grandstand",
      "name": "Astro Grandstand",
      "reach": 2560000,
      "genre": "Sports",
      "lines": 2
    },
    {
      "id": "astro-boo",
      "name": "Astro BOO",
      "reach": 2530000,
      "genre": "Movies",
      "lines": 1
    },
    {
      "id": "astro-awani",
      "name": "Astro AWANI",
      "reach": 2400000,
      "genre": "News",
      "lines": 9
    },
    {
      "id": "astro-vellithirai",
      "name": "Astro Vellithirai",
      "reach": 2300000,
      "genre": "Tamil",
      "lines": 2
    },
    {
      "id": "tvn-movies",
      "name": "tvN Movies",
      "reach": 2200000,
      "genre": "Movies",
      "lines": 1
    },
    {
      "id": "astro-rania",
      "name": "Astro Rania",
      "reach": 2160000,
      "genre": "Malay",
      "lines": 1
    },
    {
      "id": "astro-vinmeen",
      "name": "Astro Vinmeen",
      "reach": 2100000,
      "genre": "Tamil",
      "lines": 2
    },
    {
      "id": "astro-aura",
      "name": "Astro Aura",
      "reach": 1630000,
      "genre": "Malay",
      "lines": 1
    },
    {
      "id": "astro-aec",
      "name": "Astro AEC",
      "reach": 1600000,
      "genre": "Chinese",
      "lines": 15
    },
    {
      "id": "z-cinema",
      "name": "Z Cinema",
      "reach": 1600000,
      "genre": "Movies",
      "lines": 0
    },
    {
      "id": "asian-food-network",
      "name": "Asian Food Network",
      "reach": 1500000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "astro-daebak",
      "name": "Astro Daebak",
      "reach": 1500000,
      "genre": "English",
      "lines": 2
    },
    {
      "id": "celestial-movies",
      "name": "Celestial Movies",
      "reach": 1500000,
      "genre": "Movies",
      "lines": 2
    },
    {
      "id": "ktv",
      "name": "KTV",
      "reach": 1500000,
      "genre": "Music",
      "lines": 2
    },
    {
      "id": "sun-tv",
      "name": "Sun TV",
      "reach": 1500000,
      "genre": "Tamil",
      "lines": 2
    },
    {
      "id": "astro-football",
      "name": "Astro Football",
      "reach": 1490000,
      "genre": "Sports",
      "lines": 2
    },
    {
      "id": "astro-vaanavil",
      "name": "Astro Vaanavil",
      "reach": 1400000,
      "genre": "Tamil",
      "lines": 3
    },
    {
      "id": "colors-tamil-hd",
      "name": "Colors Tamil HD",
      "reach": 1400000,
      "genre": "Tamil",
      "lines": 1
    },
    {
      "id": "zee-tamil-hd",
      "name": "Zee Tamil HD",
      "reach": 1400000,
      "genre": "Tamil",
      "lines": 2
    },
    {
      "id": "lifetime",
      "name": "Lifetime",
      "reach": 1300000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "adithya",
      "name": "Adithya",
      "reach": 1200000,
      "genre": "Tamil",
      "lines": 1
    },
    {
      "id": "colors-hindi-hd",
      "name": "Colors Hindi HD",
      "reach": 1200000,
      "genre": "English",
      "lines": 1
    },
    {
      "id": "sun-music",
      "name": "Sun Music",
      "reach": 1100000,
      "genre": "Music",
      "lines": 1
    },
    {
      "id": "tlc",
      "name": "TLC",
      "reach": 1100000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "tvn",
      "name": "tvN",
      "reach": 1100000,
      "genre": "English",
      "lines": 2
    },
    {
      "id": "astro-aod",
      "name": "Astro AOD",
      "reach": 1000000,
      "genre": "Chinese",
      "lines": 4
    },
    {
      "id": "sun-life",
      "name": "Sun Life",
      "reach": 1000000,
      "genre": "Tamil",
      "lines": 2
    },
    {
      "id": "tvb-jade",
      "name": "TVB Jade",
      "reach": 975000,
      "genre": "Chinese",
      "lines": 6
    },
    {
      "id": "history",
      "name": "HISTORY",
      "reach": 968000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "iqiyi-hd",
      "name": "iQIYI HD",
      "reach": 937000,
      "genre": "Chinese",
      "lines": 2
    },
    {
      "id": "hits",
      "name": "HITS",
      "reach": 916000,
      "genre": "English",
      "lines": 1
    },
    {
      "id": "kbs-world",
      "name": "KBS World",
      "reach": 910000,
      "genre": "English",
      "lines": 1
    },
    {
      "id": "astro-qj",
      "name": "Astro QJ",
      "reach": 905000,
      "genre": "Chinese",
      "lines": 2
    },
    {
      "id": "celestial-classic-movies",
      "name": "Celestial Classic Movies",
      "reach": 897000,
      "genre": "Movies",
      "lines": 1
    },
    {
      "id": "discovery-asia",
      "name": "Discovery Asia",
      "reach": 896000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "tvb-classic",
      "name": "TVB Classic",
      "reach": 884000,
      "genre": "Chinese",
      "lines": 2
    },
    {
      "id": "bbc-earth",
      "name": "BBC Earth",
      "reach": 868000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "astro-hua-hee-dai",
      "name": "Astro Hua Hee Dai",
      "reach": 831000,
      "genre": "Chinese",
      "lines": 5
    },
    {
      "id": "discovery-channel",
      "name": "Discovery Channel",
      "reach": 826000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "k-plus",
      "name": "K-PLUS",
      "reach": 784000,
      "genre": "English",
      "lines": 2
    },
    {
      "id": "sun-news",
      "name": "Sun News",
      "reach": 765000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "hgtv",
      "name": "HGTV",
      "reach": 687000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "hits-now",
      "name": "HITS NOW",
      "reach": 682000,
      "genre": "Music",
      "lines": 1
    },
    {
      "id": "moonbug",
      "name": "Moonbug",
      "reach": 681000,
      "genre": "Kids",
      "lines": 1
    },
    {
      "id": "tvb-xing-he",
      "name": "TVB Xing He",
      "reach": 619000,
      "genre": "Chinese",
      "lines": 2
    },
    {
      "id": "cnn",
      "name": "CNN",
      "reach": 604000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "cti-asia",
      "name": "CTI Asia",
      "reach": 586000,
      "genre": "Chinese",
      "lines": 1
    },
    {
      "id": "astro-sports-plus",
      "name": "Astro Sports Plus",
      "reach": 575000,
      "genre": "Sports",
      "lines": 2
    },
    {
      "id": "phoenix-chinese-channel",
      "name": "Phoenix Chinese Channel",
      "reach": 568000,
      "genre": "Chinese",
      "lines": 1
    },
    {
      "id": "cartoon-network",
      "name": "Cartoon Network",
      "reach": 563000,
      "genre": "Kids",
      "lines": 1
    },
    {
      "id": "tvbs-asia",
      "name": "TVBS Asia",
      "reach": 554000,
      "genre": "Chinese",
      "lines": 2
    },
    {
      "id": "phoenix-infonews-channel",
      "name": "Phoenix InfoNews Channel",
      "reach": 544000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "bbc-news",
      "name": "BBC News",
      "reach": 473000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "cna",
      "name": "CNA",
      "reach": 465000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "crime-investigation",
      "name": "Crime + Investigation",
      "reach": 429000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "al-jazeera-english",
      "name": "Al Jazeera English",
      "reach": 424000,
      "genre": "News",
      "lines": 2
    },
    {
      "id": "bbc-lifestyle",
      "name": "BBC Lifestyle",
      "reach": 337000,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "blippi-friends",
      "name": "Blippi & Friends",
      "reach": 326000,
      "genre": "Kids",
      "lines": 1
    },
    {
      "id": "astro-golf",
      "name": "Astro Golf",
      "reach": 321000,
      "genre": "Sports",
      "lines": 2
    },
    {
      "id": "tutor-tv",
      "name": "Tutor TV",
      "reach": 314000,
      "genre": "Kids",
      "lines": 0
    },
    {
      "id": "bloomberg-tv",
      "name": "Bloomberg TV",
      "reach": 298000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "cnbc-asia",
      "name": "CNBC Asia",
      "reach": 136000,
      "genre": "News",
      "lines": 1
    },
    {
      "id": "astro-fam-time",
      "name": "Astro FAM Time",
      "reach": 0,
      "genre": "Malay",
      "lines": 1
    },
    {
      "id": "astro-showtime",
      "name": "Astro Showtime",
      "reach": 0,
      "genre": "Movies",
      "lines": 2
    },
    {
      "id": "astro-tennis",
      "name": "Astro Tennis",
      "reach": 0,
      "genre": "Sports",
      "lines": 2
    },
    {
      "id": "astro-tutor-tv",
      "name": "Astro Tutor TV",
      "reach": 0,
      "genre": "Kids",
      "lines": 1
    },
    {
      "id": "love-nature",
      "name": "Love Nature",
      "reach": 0,
      "genre": "Lifestyle",
      "lines": 1
    },
    {
      "id": "rock-action",
      "name": "Rock Action",
      "reach": 0,
      "genre": "Movies",
      "lines": 1
    },
    {
      "id": "rock-x-stream",
      "name": "Rock X Stream",
      "reach": 0,
      "genre": "Movies",
      "lines": 1
    },
    {
      "id": "zee-cinema",
      "name": "Zee Cinema",
      "reach": 0,
      "genre": "Movies",
      "lines": 1
    }
  ],
  lines: [
    {
      "id": "astro-ria-1",
      "ch": "astro-ria",
      "spot": "TVC Spot",
      "belt": "12am - 12pm",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "astro-ria-2",
      "ch": "astro-ria",
      "spot": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "12pm - 6pm",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-ria-3",
      "ch": "astro-ria",
      "spot": "Branded Promo",
      "belt": "12pm - 6pm",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-ria-4",
      "ch": "astro-ria",
      "spot": "TVC Spot",
      "belt": "12pm - 6pm",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-ria-5",
      "ch": "astro-ria",
      "spot": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-6",
      "ch": "astro-ria",
      "spot": "1 minute special report coverage",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-7",
      "ch": "astro-ria",
      "spot": "Animated Bug",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-8",
      "ch": "astro-ria",
      "spot": "Lower 3rd Bottom Banner",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-9",
      "ch": "astro-ria",
      "spot": "Opening & Closing",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-10",
      "ch": "astro-ria",
      "spot": "TVC Inside Program",
      "belt": "6pm - 10pm (Mon - Thu) 11pm - 12am (Mon - Thu) 6pm - 12am (Fri - Sun)",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-11",
      "ch": "astro-ria",
      "spot": "TVC Spot",
      "belt": "11pm - 12am",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-12",
      "ch": "astro-ria",
      "spot": "TVC Spot",
      "belt": "6pm - 10pm",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-13",
      "ch": "astro-ria",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ria-14",
      "ch": "astro-ria",
      "spot": "TVC Spot",
      "belt": "10pm - 11pm",
      "rate": 15000,
      "daypart": "Prime"
    },
    {
      "id": "astro-prima-1",
      "ch": "astro-prima",
      "spot": "TVC Spot",
      "belt": "12pm - 12pm",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-prima-2",
      "ch": "astro-prima",
      "spot": "TVC Spot",
      "belt": "12pm - 6pm",
      "rate": 6000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-prima-3",
      "ch": "astro-prima",
      "spot": "TVC Spot",
      "belt": "6pm - 12mn",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-prima-4",
      "ch": "astro-prima",
      "spot": "TVC Spot",
      "belt": "7pm - 12mn",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-prima-5",
      "ch": "astro-prima",
      "spot": "TVC Spot",
      "belt": "6pm - 7pm",
      "rate": 14000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-arena-1",
      "ch": "astro-arena",
      "spot": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-2",
      "ch": "astro-arena",
      "spot": "Any",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-3",
      "ch": "astro-arena",
      "spot": "Any",
      "belt": "News and Talk Shows (1st Run)",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-4",
      "ch": "astro-arena",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-2-1",
      "ch": "astro-arena-2",
      "spot": "Any",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-2-2",
      "ch": "astro-arena-2",
      "spot": "Any",
      "belt": "News and Talk Shows (1st Run)",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-2-3",
      "ch": "astro-arena-2",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-citra-1",
      "ch": "astro-citra",
      "spot": "TVC Spot",
      "belt": "12am - 9pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-citra-2",
      "ch": "astro-citra",
      "spot": "TVC Spot",
      "belt": "9pm - 1am",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-arena-bola-1",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-bola-2",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "Asean Championship Mitsubishi Cup, AFC Champions League Elite, AFC Champions League TWO, Asian Cup Championship",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-bola-3",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "Liga Super Malaysia (Live or Delayed)",
      "rate": 12000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-bola-4",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Knock Out Stage (Live or Delayed)",
      "rate": 12000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-bola-5",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Quarter-Finals (Live or Delayed)",
      "rate": 15000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-bola-6",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Semi-Finals (Live or Delayed)",
      "rate": 18000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-arena-bola-7",
      "ch": "astro-arena-bola",
      "spot": "Any",
      "belt": "MFL Challenge Cup, Piala FA Malaysia or Piala Malaysia: Finals (Live or Delayed)",
      "rate": 20000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-oasis-1",
      "ch": "astro-oasis",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "astro-oasis-2",
      "ch": "astro-oasis",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-premier-league-1",
      "ch": "astro-premier-league",
      "spot": "Any",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-premier-league-2",
      "ch": "astro-premier-league",
      "spot": "Any",
      "belt": "News and Talk Shows (1st Run)",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-premier-league-3",
      "ch": "astro-premier-league",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 12000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-badminton-1",
      "ch": "astro-badminton",
      "spot": "Any",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-badminton-2",
      "ch": "astro-badminton",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 7000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-showcase-1",
      "ch": "astro-showcase",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-showcase-2",
      "ch": "astro-showcase",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 10000,
      "daypart": "Prime"
    },
    {
      "id": "astro-ceria-1",
      "ch": "astro-ceria",
      "spot": "Any",
      "belt": "8am - 6pm",
      "rate": 8000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-ceria-2",
      "ch": "astro-ceria",
      "spot": "Any",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "axn-1",
      "ch": "axn",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "axn-2",
      "ch": "axn",
      "spot": "TVC Spot",
      "belt": "6pm - 9pm",
      "rate": 7000,
      "daypart": "Prime"
    },
    {
      "id": "axn-3",
      "ch": "axn",
      "spot": "TVC Spot",
      "belt": "9pm - 12am",
      "rate": 10000,
      "daypart": "Prime"
    },
    {
      "id": "hits-movies-1",
      "ch": "hits-movies",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 6000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-grandstand-1",
      "ch": "astro-grandstand",
      "spot": "Any",
      "belt": "Others",
      "rate": 8000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-grandstand-2",
      "ch": "astro-grandstand",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 15000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-boo-1",
      "ch": "astro-boo",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 6000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-awani-1",
      "ch": "astro-awani",
      "spot": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-awani-2",
      "ch": "astro-awani",
      "spot": "1 minute special report coverage",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-3",
      "ch": "astro-awani",
      "spot": "Animated Bug",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-4",
      "ch": "astro-awani",
      "spot": "Branded Promo",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-5",
      "ch": "astro-awani",
      "spot": "Lower 3rd Bottom Banner",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-6",
      "ch": "astro-awani",
      "spot": "Lower Third Banner",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-7",
      "ch": "astro-awani",
      "spot": "Opening & Closing",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-8",
      "ch": "astro-awani",
      "spot": "TVC Inside Program",
      "belt": "7.45pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-awani-9",
      "ch": "astro-awani",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-vellithirai-1",
      "ch": "astro-vellithirai",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "astro-vellithirai-2",
      "ch": "astro-vellithirai",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 7000,
      "daypart": "Prime"
    },
    {
      "id": "tvn-movies-1",
      "ch": "tvn-movies",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-rania-1",
      "ch": "astro-rania",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-vinmeen-1",
      "ch": "astro-vinmeen",
      "spot": "TVC Spot",
      "belt": "12am - 8pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-vinmeen-2",
      "ch": "astro-vinmeen",
      "spot": "TVC Spot",
      "belt": "8pm - 12am",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aura-1",
      "ch": "astro-aura",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-aec-1",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "12am - 12pm",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-aec-2",
      "ch": "astro-aec",
      "spot": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "12pm - 6pm",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-aec-3",
      "ch": "astro-aec",
      "spot": "Extension 1 minute market spotlight",
      "belt": "12pm - 6pm",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-aec-4",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "12pm - 6pm",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-aec-5",
      "ch": "astro-aec",
      "spot": "1 min AWANI Ringkas + Sponsor Tag On",
      "belt": "6pm - 12am (excl. 8pm - 8.30pm & 10.30pm - 11pm)",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-6",
      "ch": "astro-aec",
      "spot": "Branded Stage with sponsor's logo",
      "belt": "6pm - 12am (excl. 8pm - 8.30pm & 10.30pm - 11pm)",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-7",
      "ch": "astro-aec",
      "spot": "Extension 1 minute market spotlight",
      "belt": "6pm - 12am (excl. 8pm - 8.30pm & 10.30pm - 11pm)",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-8",
      "ch": "astro-aec",
      "spot": "Lower Third Banner",
      "belt": "6pm - 12am (excl. 8pm - 8.30pm & 10.30pm - 11pm)",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-9",
      "ch": "astro-aec",
      "spot": "Opening & Closing",
      "belt": "8pm - 8.30pm",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-10",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "10.30pm - 12mn",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-11",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "6pm - 8pm",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-12",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "8.30pm - 10.30pm",
      "rate": 9000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-13",
      "ch": "astro-aec",
      "spot": "1 minute market spotlight (PRIME TALK)",
      "belt": "8pm - 8.30pm",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-14",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "8pm - 8.30pm",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aec-15",
      "ch": "astro-aec",
      "spot": "TVC Spot",
      "belt": "10.30pm - 11pm",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "asian-food-network-1",
      "ch": "asian-food-network",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 5000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-daebak-1",
      "ch": "astro-daebak",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-daebak-2",
      "ch": "astro-daebak",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "celestial-movies-1",
      "ch": "celestial-movies",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "celestial-movies-2",
      "ch": "celestial-movies",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 5500,
      "daypart": "Prime"
    },
    {
      "id": "ktv-1",
      "ch": "ktv",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 2500,
      "daypart": "Daytime"
    },
    {
      "id": "ktv-2",
      "ch": "ktv",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 4000,
      "daypart": "Prime"
    },
    {
      "id": "sun-tv-1",
      "ch": "sun-tv",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "sun-tv-2",
      "ch": "sun-tv",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-football-1",
      "ch": "astro-football",
      "spot": "Any",
      "belt": "Others",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-football-2",
      "ch": "astro-football",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 10000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-vaanavil-1",
      "ch": "astro-vaanavil",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-vaanavil-2",
      "ch": "astro-vaanavil",
      "spot": "TVC Spot",
      "belt": "6pm - 9pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "astro-vaanavil-3",
      "ch": "astro-vaanavil",
      "spot": "TVC Spot",
      "belt": "9pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "colors-tamil-hd-1",
      "ch": "colors-tamil-hd",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "zee-tamil-hd-1",
      "ch": "zee-tamil-hd",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "zee-tamil-hd-2",
      "ch": "zee-tamil-hd",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "lifetime-1",
      "ch": "lifetime",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "adithya-1",
      "ch": "adithya",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "colors-hindi-hd-1",
      "ch": "colors-hindi-hd",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "sun-music-1",
      "ch": "sun-music",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tlc-1",
      "ch": "tlc",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tvn-1",
      "ch": "tvn",
      "spot": "TVC Spot",
      "belt": "12am - 8pm",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tvn-2",
      "ch": "tvn",
      "spot": "TVC Spot",
      "belt": "8pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aod-1",
      "ch": "astro-aod",
      "spot": "TVC Spot",
      "belt": "10.30pm - 12am",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aod-2",
      "ch": "astro-aod",
      "spot": "TVC Spot",
      "belt": "12am - 8.30pm",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-aod-3",
      "ch": "astro-aod",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 8000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-aod-4",
      "ch": "astro-aod",
      "spot": "TVC Spot",
      "belt": "8.30pm - 10.30pm",
      "rate": 13000,
      "daypart": "Prime"
    },
    {
      "id": "sun-life-1",
      "ch": "sun-life",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "sun-life-2",
      "ch": "sun-life",
      "spot": "TVC Spot",
      "belt": "12am - 8pm",
      "rate": 4500,
      "daypart": "Prime"
    },
    {
      "id": "tvb-jade-1",
      "ch": "tvb-jade",
      "spot": "TVC Spot",
      "belt": "12am - 1pm",
      "rate": 4000,
      "daypart": "Daytime"
    },
    {
      "id": "tvb-jade-2",
      "ch": "tvb-jade",
      "spot": "TVC Spot",
      "belt": "1pm - 12am",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "tvb-jade-3",
      "ch": "tvb-jade",
      "spot": "TVC Spot",
      "belt": "1pm - 6.30pm",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "tvb-jade-4",
      "ch": "tvb-jade",
      "spot": "TVC Spot",
      "belt": "10.30pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tvb-jade-5",
      "ch": "tvb-jade",
      "spot": "TVC Spot",
      "belt": "6.30pm - 8.30pm",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "tvb-jade-6",
      "ch": "tvb-jade",
      "spot": "TVC Spot",
      "belt": "8.30pm - 10.30pm",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "history-1",
      "ch": "history",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "iqiyi-hd-1",
      "ch": "iqiyi-hd",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "iqiyi-hd-2",
      "ch": "iqiyi-hd",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "hits-1",
      "ch": "hits",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "kbs-world-1",
      "ch": "kbs-world",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 4000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-qj-1",
      "ch": "astro-qj",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "astro-qj-2",
      "ch": "astro-qj",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "celestial-classic-movies-1",
      "ch": "celestial-classic-movies",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "discovery-asia-1",
      "ch": "discovery-asia",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tvb-classic-1",
      "ch": "tvb-classic",
      "spot": "TVC Spot",
      "belt": "12am - 12pm",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "tvb-classic-2",
      "ch": "tvb-classic",
      "spot": "TVC Spot",
      "belt": "12pm - 12am",
      "rate": 5000,
      "daypart": "Daytime"
    },
    {
      "id": "bbc-earth-1",
      "ch": "bbc-earth",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-hua-hee-dai-1",
      "ch": "astro-hua-hee-dai",
      "spot": "TVC Spot",
      "belt": "12am - 12pm",
      "rate": 4500,
      "daypart": "Daytime"
    },
    {
      "id": "astro-hua-hee-dai-2",
      "ch": "astro-hua-hee-dai",
      "spot": "Extension 1 minute market spotlight",
      "belt": "12pm - 6pm",
      "rate": 6000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-hua-hee-dai-3",
      "ch": "astro-hua-hee-dai",
      "spot": "TVC Spot",
      "belt": "12pm - 6pm",
      "rate": 6000,
      "daypart": "Daytime"
    },
    {
      "id": "astro-hua-hee-dai-4",
      "ch": "astro-hua-hee-dai",
      "spot": "Extension 1 minute market spotlight",
      "belt": "6pm - 12am",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "astro-hua-hee-dai-5",
      "ch": "astro-hua-hee-dai",
      "spot": "TVC Spot",
      "belt": "6pm - 12mn",
      "rate": 8000,
      "daypart": "Prime"
    },
    {
      "id": "discovery-channel-1",
      "ch": "discovery-channel",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "k-plus-1",
      "ch": "k-plus",
      "spot": "TVC Spot",
      "belt": "12am - 8pm",
      "rate": 4000,
      "daypart": "Prime"
    },
    {
      "id": "k-plus-2",
      "ch": "k-plus",
      "spot": "TVC Spot",
      "belt": "8pm - 12am",
      "rate": 6000,
      "daypart": "Prime"
    },
    {
      "id": "sun-news-1",
      "ch": "sun-news",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "hgtv-1",
      "ch": "hgtv",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "hits-now-1",
      "ch": "hits-now",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "moonbug-1",
      "ch": "moonbug",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "tvb-xing-he-1",
      "ch": "tvb-xing-he",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "tvb-xing-he-2",
      "ch": "tvb-xing-he",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 5000,
      "daypart": "Prime"
    },
    {
      "id": "cnn-1",
      "ch": "cnn",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3500,
      "daypart": "Run of schedule"
    },
    {
      "id": "cti-asia-1",
      "ch": "cti-asia",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-sports-plus-1",
      "ch": "astro-sports-plus",
      "spot": "Any",
      "belt": "Others",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-sports-plus-2",
      "ch": "astro-sports-plus",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "phoenix-chinese-channel-1",
      "ch": "phoenix-chinese-channel",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "cartoon-network-1",
      "ch": "cartoon-network",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "tvbs-asia-1",
      "ch": "tvbs-asia",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3000,
      "daypart": "Daytime"
    },
    {
      "id": "tvbs-asia-2",
      "ch": "tvbs-asia",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 4500,
      "daypart": "Prime"
    },
    {
      "id": "phoenix-infonews-channel-1",
      "ch": "phoenix-infonews-channel",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "bbc-news-1",
      "ch": "bbc-news",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "cna-1",
      "ch": "cna",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "crime-investigation-1",
      "ch": "crime-investigation",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "al-jazeera-english-1",
      "ch": "al-jazeera-english",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 3000,
      "daypart": "Run of schedule"
    },
    {
      "id": "al-jazeera-english-2",
      "ch": "al-jazeera-english",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 4000,
      "daypart": "Prime"
    },
    {
      "id": "bbc-lifestyle-1",
      "ch": "bbc-lifestyle",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "blippi-friends-1",
      "ch": "blippi-friends",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-golf-1",
      "ch": "astro-golf",
      "spot": "Any",
      "belt": "Others",
      "rate": 4000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-golf-2",
      "ch": "astro-golf",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "bloomberg-tv-1",
      "ch": "bloomberg-tv",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "cnbc-asia-1",
      "ch": "cnbc-asia",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-fam-time-1",
      "ch": "astro-fam-time",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "astro-showtime-1",
      "ch": "astro-showtime",
      "spot": "TVC Spot",
      "belt": "12am - 6pm",
      "rate": 3500,
      "daypart": "Daytime"
    },
    {
      "id": "astro-showtime-2",
      "ch": "astro-showtime",
      "spot": "TVC Spot",
      "belt": "6pm - 12am",
      "rate": 5500,
      "daypart": "Prime"
    },
    {
      "id": "astro-tennis-1",
      "ch": "astro-tennis",
      "spot": "Any",
      "belt": "Others",
      "rate": 5000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-tennis-2",
      "ch": "astro-tennis",
      "spot": "Any",
      "belt": "All (Live or Delayed)",
      "rate": 6000,
      "daypart": "Programme buy"
    },
    {
      "id": "astro-tutor-tv-1",
      "ch": "astro-tutor-tv",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "love-nature-1",
      "ch": "love-nature",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "rock-action-1",
      "ch": "rock-action",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "rock-x-stream-1",
      "ch": "rock-x-stream",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    },
    {
      "id": "zee-cinema-1",
      "ch": "zee-cinema",
      "spot": "TVC Spot",
      "belt": "ROS 12am - 12am",
      "rate": 2500,
      "daypart": "Run of schedule"
    }
  ]
};
