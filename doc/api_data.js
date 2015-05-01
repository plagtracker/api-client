define({ "api": [
  {
    "type": "post",
    "url": "/text/",
    "title": "Send text for plagiarism checking",
    "name": "addText",
    "group": "Text",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic HTTP authentication</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "text",
            "description": "<p>Text wich should be checked for plagiarism.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Unique hash of added text.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message which api can send to client. Usually if error happens.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"OK\",\n     \"data\": \"f00cdac492b59749e8ea7436cd7c8a96\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "library/Plagtracker/Api/Client.php",
    "groupTitle": "Text"
  },
  {
    "type": "get",
    "url": "/text/:hash/plagiarism-percent",
    "title": "Get plagiarism percent of text",
    "name": "getPlagiarismPercent",
    "group": "Text",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic HTTP authentication</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of text</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data",
            "description": "<p>Plagiarism percent of text</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message which api can send to client. Usually if error happens.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"OK\",\n     \"data\": 23\n}",
          "type": "json"
        }
      ]
    },
    "filename": "library/Plagtracker/Api/Client.php",
    "groupTitle": "Text"
  },
  {
    "type": "get",
    "url": "/text/:hash/result",
    "title": "Get result",
    "name": "getResult",
    "group": "Text",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic HTTP authentication</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of text</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Plagiarism check result</p> "
          },
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data.plag_rate",
            "description": "<p>Plagiarism percent</p> "
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "data.sources",
            "description": "<p>Array of sources</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.sources.url",
            "description": "<p>Source url</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.sources.plagrate",
            "description": "<p>Plagrate of text for source</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data.html_report",
            "description": "<p>Html report. With highlighted plagiarism. Some parts of text are in &quot;span&quot; tag with class source_[n]. Where n is key in array sources. It means that part of text was found in source with key [n].</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message which api can send to client. Usually if error happens.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"message\": \"OK\",\n    \"data\": {\n        \"plag_rate\": 64,\n        \"sources\": [\n            {\n                \"url\": \"http://www.questpedia.org/en/Fernando_de_Noronha\",\n                \"plag_rate\": 54\n            },\n            {\n                \"url\": \"http://en.wikipedia.org/wiki/Fernando_de_Noronha\",\n                \"plag_rate\": 54\n            },\n            {\n                \"url\": \"http://netlibrary.net/articles/Fernando_de_Noronha\",\n                \"plag_rate\": 52\n            },\n            {\n                \"url\": \"http://library.kiwix.org/wikipedia_en_all_nopic/A/html/F/e/r/n/Fernando_de_Noronha.html\",\n                \"plag_rate\": 49\n            },\n            {\n                \"url\": \"https://sidrabaksh.wordpress.com/page/7/\",\n                \"plag_rate\": 32\n            },\n            {\n                \"url\": \"http://www.charlesayoub.com/life-style/index.php/more/1/6507\",\n                \"plag_rate\": 27\n            },\n            {\n                \"url\": \"http://www.py0fo.com.br/theisland.html\",\n                \"plag_rate\": 26\n            },\n            {\n                \"url\": \"http://correardconsultoriaimobiliaria.blogspot.com/2015/01/30-most-beautiful-places-in-brazil-and.html\",\n                \"plag_rate\": 22\n            },\n            {\n                \"url\": \"http://www.reference.com/browse/fernando+de+noronha\",\n                \"plag_rate\": 13\n            },\n            {\n                \"url\": \"http://www.myislands.pl/?p=2393&lang=en\",\n                \"plag_rate\": 10\n            },\n            {\n                \"url\": \"http://blog.geogarage.com/2013/01/vendee-globe-fernando-de-noronha.html\",\n                \"plag_rate\": 9\n            },\n            {\n                \"url\": \"http://www.emporis.com/city/fernandodenoronha-brazil\",\n                \"plag_rate\": 9\n            },\n            {\n                \"url\": \"http://www.wannadive.net/spot/South_America/Brazil/Pernambuco/Fernando_de_Noronha/\",\n                \"plag_rate\": 9\n            },\n            {\n                \"url\": \"http://chen2.simmons.edu/whm4/collection/site.php?site=1000\",\n                \"plag_rate\": 8\n            },\n            {\n                \"url\": \"http://www.cleancruising.com.au/port.asp?port=BRARC\",\n                \"plag_rate\": 7\n            },\n            {\n                \"url\": \"http://nyanglish.com/rainy-season-lasts\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"http://nyanglish.com/sees-little\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"https://www.flickr.com/photos/ricardoviana/15175934743/\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"http://bahamascatcharters.com/brazil.htm\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"http://www.artline.ro/Brazil-s-Fernando-de-Noronha-33676-2-n.html\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"http://www.wikisearch.net/search?q=S%C3%A3o+Miguel+Island&page=2\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"http://www.wikisearch.net/search?q=Banco+de+Portugal&page=5\",\n                \"plag_rate\": 4\n            },\n            {\n                \"url\": \"http://www.cyclopaedia.es/wiki/Fernando_de_Noronha_Island\",\n                \"plag_rate\": 3\n            },\n            {\n                \"url\": \"http://www.cyclopaedia.asia/wiki/Fernanda_de_Noronha-Atol_das_Rocas_moist_forests\",\n                \"plag_rate\": 3\n            },\n            {\n                \"url\": \"http://www.cyclopaedia.asia/wiki/Fernando_de_Noronha-Atol_das_Rocas_moist_forests\",\n                \"plag_rate\": 3\n            },\n            {\n                \"url\": \"http://www.dailyweekee.com/daily/Special:Search/1503_in_Portugal\",\n                \"plag_rate\": 2\n            },\n            {\n                \"url\": \"http://www.pagelamp.com/i-have-a-drone.com\",\n                \"plag_rate\": 1\n            }\n        ],\n        \"html_report\": \" Geography[edit] Geology[edit] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_13 link_14 link_18\\\">The </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13 link_14 link_18\\\">islands of this archipelago are the visible parts of a range of submerged mountains. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7\\\">It consists </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13 link_14 link_18\\\">of 21 islands, islets and rocks of volcanic origin. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13 link_22 link_23 link_24\\\">The </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_22 link_23 link_24\\\">main island has an area </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_22 link_23 link_24\\\">of </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_22 link_23 link_24\\\">18 </span> <span class=\\\"plag_text link_10\\\">km2 </span> (6.<span class=\\\"plag_text link_0 link_1 link_2 link_7\\\">9 sq mi), </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_7\\\">being 10 km (6.2 mi) long and 3.5 </span> <span class=\\\"plag_text link_0 link_1 link_2 link_7\\\">km (2.2 </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_6 link_7 link_9\\\">mi) wide </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_9\\\">at its maximum. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13\\\">The base of this enormous volcanic formation </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13\\\">is </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_6 link_7 link_8 link_9 link_10 link_11\\\">756 </span> <span class=\\\"plag_text link_0 link_1 link_2 link_7\\\">metres (2,480 ft) </span> <span class=\\\"plag_text link_0 link_1 link_2 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13\\\">below </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_9 link_10 link_11 link_12 link_13\\\">the surface. The main island, from which the group gets its name, makes up 91% of the total </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_10 link_11 link_12 link_13\\\">area; the islands of Rata, Sela Gineta, Cabeluda and São </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7\\\">José, </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_10 link_11 link_12 link_13\\\">together with the islets of Leão and Viúva make up the rest. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_12\\\">The </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7\\\">central upland of the main island is called the Quixaba.</span> [4] Flora[edit] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_14\\\">The United Nations Environment Programme </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8 link_14\\\">lists 15 </span> <span class=\\\"plag_text link_5 link_6 link_8 link_14\\\">possible endemic plant species, </span> <span class=\\\"plag_text link_5 link_6 link_8\\\">including species of the genera </span> <span class=\\\"plag_text link_5 link_6\\\">Capparis </span> noronhae (2 species), Ceratosanthes noronhae (3 species), Cayaponia noronhae (2 species), Moriordica noronhae, Cereus noronhae, Palicourea noronhae, Guettarda noronhae, Bumelia noronhae, Physalis noronhae, and Ficus noronhae.[5] Fauna[edit] <span class=\\\"plag_text link_5 link_6\\\">The islands have two </span> <span class=\\\"plag_text link_5 link_6 link_26\\\">endemic birds — the Noronha Elaenia (Elaenia ridleyana) and the </span> <span class=\\\"plag_text link_5 link_6\\\">Noronha Vireo (Vireo </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_8\\\">gracilirostris). Both are present on the main island; Noronha Vireo is also present on Ilha Rata. In addition there is an endemic race </span> <span class=\\\"plag_text link_5 link_6\\\">of eared dove Zenaida auriculata noronha. </span> Subfossil remains of an extinct endemic rail have also been found.[6] <span class=\\\"plag_text link_0 link_1 link_7 link_14\\\">The archipelago is also an important site for breeding seabirds. </span> <span class=\\\"plag_text link_0 link_1 link_5 link_6 link_7\\\">An </span> <span class=\\\"plag_text link_5 link_6\\\">endemic sigmodontine rodent, Noronhomys vespuccii, </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7\\\">mentioned by Amerigo Vespucci, is now extinct.</span> <span class=\\\"plag_text link_5\\\">[7] </span> <span class=\\\"plag_text link_5 link_6\\\">The islands have two endemic reptiles, Amphisbaena ridleyi and Trachylepis atlantica.</span> <span class=\\\"plag_text link_5\\\">[8] Marine </span> life[edit] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_14 link_18\\\">The life above and below sea is the main attraction of the island. Sea </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_14\\\">turtles, </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_14\\\">dolphins, albatrosses and many other species are frequently observed. </span> Climate[edit] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_9 link_17\\\">The </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_9 link_15 link_16 link_17\\\">climate is tropical, with two well-defined seasons </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7 link_15 link_16 link_17\\\">for rainfall, if not temperature. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_9 link_15 link_16 link_17 link_23 link_24\\\">The rainy season lasts from March to </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7 link_15 link_16 link_23 link_24\\\">August, </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_5 link_6 link_7 link_9 link_15 link_16 link_17 link_23 link_24\\\">the rest of the year sees little rain. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7 link_9 link_15 link_16 link_17 link_23 link_24\\\">The </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7 link_15 link_16 link_17 link_23 link_24\\\">temperature ranges, </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_7 link_15 link_16 link_17\\\">both diurnal and monthly, are unusually slight.</span> [9] [hide]Climate data for Fernando de Noronha (1961-1990) Month Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec Year Average high °C (°F) 29.8 (85.6) 30 (86) 29.7 (85.5) 29.6 (85.3) 29.2 (84.6) 28.7 (83.7) 28.1 (82.6) 28.1 (82.6) 28.7 (83.7) 29.1 (84.4) 29.5 (85.1) 29.8 (85.6) 29.2 (84.6) Daily mean °C (°F) 27 (81) 27.1 (80.8) 26.9 (80.4) 26.7 (80.1) 26.6 (79.9) 26.2 (79.2) 25.7 (78.3) 25.7 (78.3) 26 (79) 26.3 (79.3) 26.6 (79.9) 27 (81) 26.5 (79.7) Average low °C (°F) 24.9 (76.8) 24.8 (76.6) 24.6 (76.3) 24.5 (76.1) 24.5 (76.1) 24.2 (75.6) 23.8 (74.8) 23.8 (74.8) 24.1 (75.4) 24.4 (75.9) 24.6 (76.3) 24.9 (76.8) 24.4 (75.9) Precipitation mm (inches) 63.1 (2.484) 110.6 (4.354) 263.6 (10.378) 290.3 (11.429) 280.3 (11.035) 190.2 (7.488) 122 (4.8) 37 (1.46) 18.5 (0.728) 12 (0.47) 13 (0.51) 17.8 (0.701) 1,418.4 (55.837) Mean monthly sunshine hours 250.6 209.3 189.5 238.8 208.4 222.5 224.7 260.2 265 285.3 281.5 271.2 2,907 Source: Climate Charts/NOAA.[10][11] History[edit] Discovery[edit] <span class=\\\"plag_text link_0 link_1\\\">The main island. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_5 link_6\\\">Many controversies mark the discovery of the archipelago by Europeans. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">At least three names </span> - São Lourenço, São João, and Quaresma - <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">have been associated with the island around the time of its discovery.</span> [citation needed] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19 link_22\\\">Based on the written </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19 link_22 link_25\\\">record, Fernando de Noronha </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19 link_25\\\">island was </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19 link_22 link_25\\\">discovered on August 10, 1503, by </span> <span class=\\\"plag_text link_4 link_19 link_22\\\">a Portuguese expedition, </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19 link_22 link_25\\\">organized and financed by a private </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19 link_25\\\">commercial consortium </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_19\\\">headed by the Lisbon merchant </span> <span class=\\\"plag_text link_4 link_19\\\">Fernão de Loronha. </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">The expedition was under the overall command of </span> <span class=\\\"plag_text link_4\\\">captain Gonçalo Coelho and carried the Italian adventurer Amerigo Vespucci aboard, who wrote an account of it.</span> [12] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">The flagship of the expedition hit a reef and foundered near the island, and the crew and contents had to be salvaged. On </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3\\\">Coelho's </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">orders, Vespucci anchored at the island, and spent a week there, while the rest of the Coelho fleet went on south. In his letter to Soderini, Vespucci describes the uninhabited island and reports its name as the \\\"</span> <span class=\\\"plag_text link_0 link_1 link_2 link_3\\\">island of St. Lawrence\\\" </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">(August 10 is the feast day </span> <span class=\\\"plag_text link_4\\\">of St. Lawrence; </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">it was a custom of Portuguese explorations to name locations by </span> <span class=\\\"plag_text link_4\\\">the liturgical calendar).</span> [citation needed] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_20 link_21\\\">Its existence was reported back to Lisbon sometime between then and January 16, 1504, when </span> <span class=\\\"plag_text link_4 link_20 link_21\\\">King Manuel I </span> <span class=\\\"plag_text link_4 link_20\\\">of Portugal issued </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_20 link_21\\\">a charter granting the \\\"</span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_21\\\">island of St. John\\\" </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_21\\\">(São João) </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4 link_20 link_21\\\">as a hereditary captaincy to </span> <span class=\\\"plag_text link_4 link_20\\\">Fernão de Loronha.</span> [13] <span class=\\\"plag_text link_0 link_1 link_2 link_3\\\">The </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">date and new name in the charter has presented historians with a puzzle. As Vespucci did not return to Lisbon until September, 1504, the discovery must have been earlier. Historians have hypothesized that a stray ship of the Coelho fleet, under an unknown captain, may have returned to the island (prob. on August 29, 1503, feast day of </span> <span class=\\\"plag_text link_4\\\">the beheading of St. John the Baptist) </span> <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">to collect Vespucci, did not find him or anyone else there, and went back to Lisbon by himself with the news.</span> [14] <span class=\\\"plag_text link_0 link_1 link_2 link_3 link_4\\\">(Vespucci in his letter, claims he left the island </span>Aug\"\n    }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "library/Plagtracker/Api/Client.php",
    "groupTitle": "Text"
  },
  {
    "type": "get",
    "url": "/text/:hash",
    "title": "Get text",
    "name": "getText",
    "group": "Text",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic HTTP authentication</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of text</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>Text</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message which api can send to client. Usually if error happens.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"OK\",\n     \"data\": \"some text\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "library/Plagtracker/Api/Client.php",
    "groupTitle": "Text"
  },
  {
    "type": "get",
    "url": "/text/:hash/status",
    "title": "Get status of text checking",
    "name": "getTextStatus",
    "group": "Text",
    "version": "0.1.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Basic HTTP authentication</p> "
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of text</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Integer",
            "optional": false,
            "field": "data",
            "description": "<p>Estimation, how many percent of text was checked</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message which api can send to client. Usually if error happens.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"message\": \"OK\",\n     \"data\": 100\n}",
          "type": "json"
        }
      ]
    },
    "filename": "library/Plagtracker/Api/Client.php",
    "groupTitle": "Text"
  }
] });