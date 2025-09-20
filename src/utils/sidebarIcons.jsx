import {
  FaDragon,
  FaHatWizard,
  FaChessKnight,
  FaCrosshairs,
  FaPuzzlePiece,
  FaCar,
  FaFutbol,
  FaFistRaised,
  FaUsers,
  FaDice,
  FaGamepad,
  FaChalkboardTeacher,
} from "react-icons/fa";

import {
  GiRunningNinja,
  GiTreasureMap,
  GiDiceTwentyFacesTwenty,
  GiSpaceShuttle,
  GiRaceCar,
  GiBoxingGlove,
  GiSoccerKick,
  GiCardAceHearts,
  GiTeacher,
} from "react-icons/gi";

import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
  FaGlobe,
} from "react-icons/fa";

import {
  SiNintendoswitch,
  SiAtari,
  SiCommodore,
  SiSega,
  SiNeovim, // using as fallback for Neo Geo
  SiSafari, // fallback for 3DO
} from "react-icons/si";

// export const platformIcons = [
//   { id: 1, name: "PC", icon: FaWindows },
//   { id: 2, name: "PlayStation", icon: FaPlaystation },
//   { id: 3, name: "Xbox", icon: FaXbox },
//   { id: 4, name: "iOS", icon: FaApple },
//   { id: 5, name: "Apple Macintosh", icon: FaApple },
//   { id: 6, name: "Linux", icon: FaLinux },
//   { id: 7, name: "Nintendo", icon: SiNintendoswitch },
//   { id: 8, name: "Android", icon: FaAndroid },
//   { id: 9, name: "Atari", icon: SiAtari },
//   { id: 10, name: "Commodore / Amiga", icon: SiCommodore },
//   { id: 11, name: "SEGA", icon: SiSega },
//   { id: 12, name: "3DO", icon: SiSafari }, // placeholder globe/browser icon
//   { id: 13, name: "Neo Geo", icon: SiNeovim }, // fallback, no official Neo Geo icon
//   { id: 14, name: "Web", icon: FaGlobe },
// ];

export const platformIcons = {
  "PC": FaWindows ,
  "PlayStation": FaPlaystation,
  "Xbox": FaXbox,
  "iOS": FaApple,
  "Apple Macintosh": FaApple,
  "Linux": FaLinux,
  "Nintendo": SiNintendoswitch,
  "Android": FaAndroid,
  "Atari": SiAtari,
  "Commodore / Amiga": SiCommodore,
  "SEGA": SiSega,
  "3DO": SiSafari, // placeholder globe/browser icon
  "Neo Geo": SiNeovim, // fallback, no official Neo Geo icon
  "Web": FaGlobe,
};

export const genreIcons = [
  { slug: "action", icon: GiRunningNinja},
  { slug: "indie", icon: FaChessKnight},
  { slug: "adventure", icon: GiTreasureMap},
  { slug: "role-playing-games-rpg", icon: FaHatWizard},
  { slug: "strategy", icon: FaChessKnight},
  { slug: "shooter", icon: FaCrosshairs},
  { slug: "casual", icon: FaGamepad},
  { slug: "simulation", icon: GiSpaceShuttle},
  { slug: "puzzle", icon: FaPuzzlePiece},
  { slug: "arcade", icon: FaGamepad},
  { slug: "platformer", icon: FaDragon},
  { slug: "massively-multiplayer", icon: FaUsers},
  { slug: "racing", icon: GiRaceCar},
  { slug: "sports", icon: FaFutbol},
  { slug: "fighting", icon: GiBoxingGlove},
  { slug: "family", icon: FaUsers},
  { slug: "board-games", icon: FaDice},
  { slug: "card", icon: GiCardAceHearts},
  { slug: "educational", icon: GiTeacher},
];
