import { minutes } from "./Clock";
import { lineBgColors, lineColors } from "./colors";
import { RGBA } from "./types";

export type LineConstants = {
  color: RGBA;
  bgColor: RGBA;
  sectionData: SectionData[];
};

type SectionData = {
  duration: number;
  coordinates: { x: number; y: number }[];
};

/*
 * How the section duration is estimated:
 * Get the total travel time from the first station on the line to
 * to the last station. Then get travel times between each section.
 * Sum the section travel times together, and then for each section
 * divide the section time by it, to get the relative time given sect-
 * ion takes. Then multiply the total time by it, to get the actual
 * time.
 */

export const blueLineData: LineConstants = {
  color: lineColors.blue,
  bgColor: lineBgColors.blue,
  sectionData: [
    // Kennedy town
    {
      duration: Math.round((minutes(31) * minutes(2)) / minutes(46)),
      coordinates: [{ x: 507, y: 890 }],
    },
    // HKU
    {
      duration: Math.round((minutes(31) * minutes(2)) / minutes(46)),
      coordinates: [{ x: 600, y: 890 }],
    },
    // Sai Ying Pun
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 694, y: 890 }],
    },
    // Sheung Wan
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 792, y: 890 }],
    },
    // Central
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 886, y: 890 }],
    },
    // Admiralty
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [
        { x: 980, y: 890 },
        { x: 1036, y: 890 },
      ],
    },
    // Wan Chai
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1074, y: 890 }],
    },
    // Causeway Bay
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1172, y: 890 }],
    },
    // Tin Hau
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1266, y: 890 }],
    },
    // Fortress Hill
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1362, y: 890 }],
    },
    // North Point
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1458, y: 890 }],
    },
    // Quarry Bay
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1554, y: 890 }],
    },
    // Tai Koo
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1362 + 96 + 96 + 96, y: 890 }],
    },
    // Sai Wan Ho
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [{ x: 1362 + 96 + 96 + 96 + 96, y: 890 }],
    },
    // Shau Kei Wan
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [
        {
          x: 1362 + 96 + 96 + 96 + 96 + 86,
          y: 890 + 75,
        },
      ],
    },
    // Heung Fa Tsuen
    {
      duration: Math.round((minutes(31) * minutes(3)) / minutes(46)),
      coordinates: [
        {
          x: 1362 + 96 + 96 + 96 + 96 + 86 + 33,
          y: 890 + 75 + 90,
        },
      ],
    },
    // Chai Wan
  ],
};

export const airportExpressData: LineConstants = {
  color: lineColors.turquoise,
  bgColor: lineBgColors.turquoise,
  sectionData: [
    // AsiaWorld-Expo
    {
      duration: Math.round((minutes(28) * minutes(2)) / minutes(34)),
      coordinates: [{ x: 357, y: 596 }],
    },
    // Airport
    {
      duration: Math.round((minutes(28) * minutes(14)) / minutes(34)),
      coordinates: [{ x: 313, y: 673 }],
    },
    // Tsing Yi
    {
      duration: Math.round((minutes(28) * minutes(13)) / minutes(34)),
      coordinates: [{ x: 573, y: 500 }],
    },
    // Kowloon
    {
      duration: Math.round((minutes(28) * minutes(5)) / minutes(34)),
      coordinates: [{ x: 726, y: 733 }],
    },
    // Hong Kong
  ],
};

export const tungChungLineData: LineConstants = {
  color: lineColors.orange,
  bgColor: lineBgColors.orange,
  sectionData: [
    // Tung Chung
    {
      duration: Math.round((minutes(31) * minutes(10)) / minutes(44)),
      coordinates: [{ x: 357, y: 716 }],
    },
    // Sunny Bay
    {
      duration: Math.round((minutes(31) * minutes(10)) / minutes(44)),
      coordinates: [
        { x: 478, y: 596 },
        { x: 508, y: 555 },
      ],
    },
    // Tsing Yi
    {
      duration: Math.round((minutes(31) * minutes(5)) / minutes(44)),
      coordinates: [{ x: 564, y: 499 }],
    },
    // Lai King
    {
      duration: Math.round((minutes(31) * minutes(6)) / minutes(44)),
      coordinates: [{ x: 671, y: 446 }],
    },
    // Nam Cheung
    {
      duration: Math.round((minutes(31) * minutes(4)) / minutes(44)),
      coordinates: [{ x: 732, y: 529 }],
    },
    // Olympic
    {
      duration: Math.round((minutes(31) * minutes(4)) / minutes(44)),
      coordinates: [{ x: 732, y: 640 }],
    },
    // Kowloon
    {
      duration: Math.round((minutes(31) * minutes(5)) / minutes(44)),
      coordinates: [{ x: 732, y: 731 }],
    },
    // Hong Kong
  ],
};

export const lightBlueLineData: LineConstants = {
  // TODO: The times are not correct...
  color: lineColors.lightBlue,
  bgColor: lineBgColors.lightBlue,
  sectionData: [
    // Lo Wu
    {
      duration: Math.round((minutes(46) * minutes(6)) / minutes(63)),
      coordinates: [{ x: 719, y: 104 }],
    },
    // Sheung Shui
    {
      duration: Math.round((minutes(46) * minutes(4)) / minutes(63)),
      coordinates: [{ x: 809, y: 104 }],
    },
    // Fanling
    {
      duration: Math.round((minutes(46) * minutes(6)) / minutes(63)),
      coordinates: [{ x: 899, y: 104 }],
    },
    // Tai Wo
    {
      duration: Math.round((minutes(46) * minutes(4)) / minutes(63)),
      coordinates: [{ x: 984, y: 104 }],
    },
    // Tai Po Market
    {
      duration: Math.round((minutes(46) * minutes(7)) / minutes(63)),
      coordinates: [{ x: 1074, y: 104 }],
    },
    // University
    {
      duration: Math.round((minutes(46) * minutes(5)) / minutes(63)),
      coordinates: [{ x: 1176, y: 106 }],
    },
    // Fo Tan
    {
      duration: Math.round((minutes(46) * minutes(4)) / minutes(63)),
      coordinates: [{ x: 1207, y: 208 }],
    },
    // Sha Tin
    {
      duration: Math.round((minutes(46) * minutes(4)) / minutes(63)),
      coordinates: [{ x: 1207, y: 283 }],
    },
    // Tai Wai
    {
      duration: Math.round((minutes(46) * minutes(6)) / minutes(63)),
      coordinates: [{ x: 1207, y: 351 }],
    },
    // Kowloon Tong
    {
      duration: Math.round((minutes(46) * minutes(4)) / minutes(63)),
      coordinates: [{ x: 1207, y: 457 }],
    },
    // Mong Kok East
    {
      duration: Math.round((minutes(46) * minutes(5)) / minutes(63)),
      coordinates: [{ x: 1207, y: 567 }],
    },
    // Hung Hom
    {
      duration: Math.round((minutes(46) * minutes(5)) / minutes(63)),
      coordinates: [
        { x: 1159, y: 753 },
        { x: 1097, y: 816 },
      ],
    },
    // Convention Centre
    {
      duration: Math.round((minutes(46) * minutes(3)) / minutes(63)),
      coordinates: [{ x: 1060, y: 855 }],
    },
    // Admiralty
  ],
};

export const southIslandLineData: LineConstants = {
  color: lineColors.yellow,
  bgColor: lineBgColors.yellow,
  sectionData: [
    // South Horizons
    {
      duration: Math.round((minutes(12) * minutes(4)) / minutes(18)),
      coordinates: [{ x: 655, y: 1100 }],
    },
    // Lei Tung
    {
      duration: Math.round((minutes(12) * minutes(4)) / minutes(18)),
      coordinates: [{ x: 781, y: 1100 }],
    },
    // Wong Chuk Hang
    {
      duration: Math.round((minutes(12) * minutes(4)) / minutes(18)),
      coordinates: [{ x: 929, y: 1040 }],
    },
    // Ocean Park
    {
      duration: Math.round((minutes(12) * minutes(6)) / minutes(18)),
      coordinates: [{ x: 1032, y: 975 }],
    },
    // Admiralty
  ],
};

export const redLineData: LineConstants = {
  color: lineColors.red,
  bgColor: lineBgColors.red,
  sectionData: [
    // Tsuen Wan
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 326, y: 438 }],
    },
    // Tai Wo Hau
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 426, y: 438 }],
    },
    // Kwai Hing
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 510, y: 438 }],
    },
    // Kwai Fong
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 596, y: 438 }],
    },
    // Lai King
    {
      duration: Math.round((minutes(32) * minutes(4)) / minutes(48)),
      coordinates: [{ x: 672, y: 438 }],
    },
    // Mei Foo
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 750, y: 438 }],
    },
    // Lai Chi Kok
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 826, y: 438 }],
    },
    // Cheung Sha Wan
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 908, y: 438 }],
    },
    // Sham Shui Po
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 992, y: 438 }],
    },
    // Prince Edward
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 1033, y: 506 }],
    },
    // Mong Kok
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 1033, y: 565 }],
    },
    // Yau Ma Tei
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 1033, y: 622 }],
    },
    // Jordan
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 1033, y: 682 }],
    },
    // Tsim Sha Tsui
    {
      duration: Math.round((minutes(32) * minutes(5)) / minutes(48)),
      coordinates: [
        { x: 1033, y: 746 },
        { x: 1033, y: 776 },
      ],
    },
    // Admiralty
    {
      duration: Math.round((minutes(32) * minutes(3)) / minutes(48)),
      coordinates: [{ x: 958, y: 877 }],
    },
    // Central
  ],
};

export const tuenMaLineData = {
  color: lineColors.brown,
  bgColor: lineBgColors.brown,
  sectionData: [
    // Tuen Mun
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 219, y: 302 }],
    },
    // Siu Hong
    {
      duration: Math.round((minutes(74) * minutes(6)) / minutes(109)),
      coordinates: [{ x: 219, y: 204 }],
    },
    // Tin Shui Wai
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 264, y: 100 }],
    },
    // Long Ping
    {
      duration: Math.round((minutes(74) * minutes(3)) / minutes(109)),
      coordinates: [{ x: 284, y: 170 }],
    },
    // Yuen Long
    {
      duration: Math.round((minutes(74) * minutes(5)) / minutes(109)),
      coordinates: [{ x: 284, y: 226 }],
    },
    // Kam Sheung Road
    {
      duration: Math.round((minutes(74) * minutes(7)) / minutes(109)),
      coordinates: [{ x: 284, y: 296 }],
    },
    // Tsuen Wan West
    {
      duration: Math.round((minutes(74) * minutes(6)) / minutes(109)),
      coordinates: [{ x: 327, y: 365 }],
    },
    // Mei Foo
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 742, y: 460 }],
    },
    // Nam Cheung
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 742, y: 531 }],
    },
    // Austin
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 931, y: 728 }],
    },
    // East Tsim Sha Tsui
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1076, y: 770 }],
    },
    // Hung Hom
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [
        { x: 1168, y: 733 },
        { x: 1213, y: 688 },
      ],
    },
    // Ho Man Tin
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1261, y: 665 }],
    },
    // To Kwa Wan
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1386, y: 624 }],
    },
    // Sung Wong Toi
    {
      duration: Math.round((minutes(74) * minutes(3)) / minutes(109)),
      coordinates: [{ x: 1441, y: 570 }],
    },
    // Kai Tak
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1468, y: 490 }],
    },
    // Diamond Hill
    {
      duration: Math.round((minutes(74) * minutes(6)) / minutes(109)),
      coordinates: [{ x: 1468, y: 427 }],
    },
    // Hin Keng
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1308, y: 372 }],
    },
    // Tai Wai
    {
      duration: Math.round((minutes(74) * minutes(3)) / minutes(109)),
      coordinates: [{ x: 1215, y: 325 }],
    },
    // Che Kung Temple
    {
      duration: Math.round((minutes(74) * minutes(3)) / minutes(109)),
      coordinates: [{ x: 1350, y: 258 }],
    },
    // Sha Tin Wai
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1350, y: 188 }],
    },
    // City One
    {
      duration: Math.round((minutes(74) * minutes(3)) / minutes(109)),
      coordinates: [{ x: 1410, y: 106 }],
    },
    // Shek Mun
    {
      duration: Math.round((minutes(74) * minutes(5)) / minutes(109)),
      coordinates: [{ x: 1503, y: 106 }],
    },
    // Tai Shui Hang
    {
      duration: Math.round((minutes(74) * minutes(3)) / minutes(109)),
      coordinates: [{ x: 1596, y: 106 }],
    },
    // Heng On
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1687, y: 106 }],
    },
    // Ma On Shan
    {
      duration: Math.round((minutes(74) * minutes(4)) / minutes(109)),
      coordinates: [{ x: 1778, y: 106 }],
    },
    // Wu Kai Sha
  ],
};

export const greenLineData: LineConstants = {
  color: lineColors.green,
  bgColor: lineBgColors.green,
  sectionData: [
    // Whampoa
    {
      duration: Math.round((minutes(35) * minutes(4)) / minutes(52)),
      coordinates: [
        { x: 1320, y: 683 },
        { x: 1296, y: 660 },
      ],
    },
    // Ho Man Tin
    {
      duration: Math.round((minutes(35) * minutes(4)) / minutes(52)),
      coordinates: [
        { x: 1242, y: 658 },
        { x: 1200, y: 658 },
      ],
    },
    // Yau Ma Tei
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1040, y: 600 }],
    },
    // Mong Kok
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1040, y: 543 }],
    },
    // Prince Edward
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1040, y: 484 }],
    },
    // Shek Kip Mei
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1100, y: 438 }],
    },
    // Kowloon Tong
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1216, y: 438 }],
    },
    // Lok Fu
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1276, y: 438 }],
    },
    // Wong Tai Sin
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1346, y: 438 }],
    },
    // Diamond Hill
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1476, y: 438 }],
    },
    // Choi Hung
    {
      duration: Math.round((minutes(35) * minutes(4)) / minutes(52)),
      coordinates: [{ x: 1540, y: 438 }],
    },
    // Kowloon Bay
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1600, y: 458 }],
    },
    // Ngau Tau Kok
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1603, y: 513 }],
    },
    // Kwun Tong
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1603, y: 578 }],
    },
    // Lam Tin
    {
      duration: Math.round((minutes(35) * minutes(3)) / minutes(52)),
      coordinates: [{ x: 1603, y: 642 }],
    },
    // Yau Tong
    {
      duration: Math.round((minutes(35) * minutes(4)) / minutes(52)),
      coordinates: [{ x: 1663, y: 686 }],
    },
    // Tiu Keng Leng
  ],
};

export const purpleLineData: LineConstants = {
  color: lineColors.purple,
  bgColor: lineBgColors.purple,
  sectionData: [
    // North Point
    {
      duration: Math.round((minutes(17) * minutes(3)) / minutes(22)),
      coordinates: [{ x: 1458, y: 882 }],
    },
    // Quarry Bay
    {
      duration: Math.round((minutes(17) * minutes(5)) / minutes(22)),
      coordinates: [{ x: 1554, y: 882 }],
    },
    // Yau Tong
    {
      duration: Math.round((minutes(17) * minutes(4)) / minutes(22)),
      coordinates: [{ x: 1663, y: 692 }],
    },
    // Tiu Keng Leng
    {
      duration: Math.round((minutes(17) * minutes(3)) / minutes(22)),
      coordinates: [{ x: 1743, y: 692 }],
    },
    // Tseung Kwan O
    {
      duration: Math.round((minutes(17) * minutes(4)) / minutes(22)),
      coordinates: [{ x: 1825, y: 692 }],
    },
    // Hang Hau
    {
      duration: Math.round((minutes(17) * minutes(3)) / minutes(22)),
      coordinates: [{ x: 1862, y: 572 }],
    },
    // Po Lam
  ],
};
