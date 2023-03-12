import { v4 as uuidv4 } from "uuid";
const SONG_DATA = [
  {
    name: "Beaver Creek",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
    artist: "Aso, Middle School, Aviino",
    audio: "Beaver Creek.mp3",
    color: ["#205950", "#2ab3bf"],
    id: uuidv4(),
    active: true,
  },
  {
    name: "Daylight",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
    artist: "Aiguille",
    audio: "Daylight.mp3",
    color: ["#EF8EA9", "#ab417f"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Keep Going",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
    artist: "Swørn",
    audio: "Keep Going.mp3",
    color: ["#CD607D", "#c94043"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Nightfall",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/07/ef95e219a44869318b7806e9f0f794a1f9c451e4-1024x1024.jpg",
    artist: "Aiguille",
    audio: "Nightfall.mp3",
    color: ["#EF8EA9", "#ab417f"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Reflection",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/07/ff35dede32321a8aa0953809812941bcf8a6bd35-1024x1024.jpg",
    artist: "Swørn",
    audio: "Reflection.mp3",
    color: ["#CD607D", "#c94043"],
    id: uuidv4(),
    active: false,
  },
  {
    name: "Under the City Stars",
    cover:
      "https://chillhop.com/wp-content/uploads/2020/09/0255e8b8c74c90d4a27c594b3452b2daafae608d-1024x1024.jpg",
    artist: "Aso, Middle School, Aviino",
    audio: "Under the City Stars.mp3",
    color: ["#205950", "#2ab3bf"],
    id: uuidv4(),
    active: false,
  },
  //ADD MORE HERE
];

export default SONG_DATA;