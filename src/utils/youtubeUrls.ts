// TODO:hogeを消す時に消す
import { YoutubeSearchResult } from "../Types";

export const youtubeUrl = (videoId: string) => {
  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const youtubeId = (url: string) => {
  const youtubeId = new URL(url).searchParams.get("v");
  if (youtubeId == null) {
    return "";
  }
  return youtubeId;
};

export const youtubeImgUrl = (videoId: string) => {
  return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
};

export const youtubeApiUrlVideo = (videoId: string) => {
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  return `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&fields=items(snippet(title))&part=snippet`;
};

export const youtubeApiUrlSearch = (
  keyword: string,
  pageToken: string = ""
) => {
  // const maxResults = 50;
  // const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  // return `https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&part=snippet&pageToken=${pageToken}`;
  // return `https://www.googleapis.com/youtube/v3/search?q=${keyword}&maxResults=${maxResults}&key=${YOUTUBE_API_KEY}&part=snippet`;
  return "hoge";
};

export const hoge: YoutubeSearchResult[] = [
  {
    nextPageToken: "0",
    items: [
      {
        id: {
          videoId: "I2_kfNM8iVo",
        },
        snippet: {
          title:
            "FUYU_sound check vol.1 @ Nagoya Century Hall (10th Anniversary BENI &quot;BEST&quot; Live Tour)",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "JKG54p9jzyM",
        },
        snippet: {
          title:
            "ドラマーが講演会で演奏してみたらメチャ出来が良かったからアップしてみた♪",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "ddlFaK5qhrI",
        },
        snippet: {
          title: "FUYUが伝授するGospel Drummingの奥義〜Demonstration〜",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "l0HBTbqtEQ4",
        },
        snippet: {
          title:
            "（番外編）【見せます！！】プロのレコーディング/現場でどうやって準備、そして演奏、録りまでの過程をお見せします‼️",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/l0HBTbqtEQ4/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/l0HBTbqtEQ4/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/l0HBTbqtEQ4/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "UwLyfxMUki4",
        },
        snippet: {
          title:
            "FUYUが伝授するGospel Drummingの奥義〜演奏解説①ダイナミクス表現〜",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/UwLyfxMUki4/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/UwLyfxMUki4/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/UwLyfxMUki4/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "e50_919M2L4",
        },
        snippet: {
          title: "FUYU Drum Clinic",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/e50_919M2L4/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/e50_919M2L4/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/e50_919M2L4/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "YY_OE4bjWs0",
        },
        snippet: {
          title:
            "【番外編】FUYUドラム解説動画シリーズ PART2！！　今回は楽曲【MONOCHRONO】をV-DRUMで現代風に叩いてKAZとじっくり解説したり、ドラム演奏と言うテーマを元に深く語ってみた！",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/YY_OE4bjWs0/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/YY_OE4bjWs0/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/YY_OE4bjWs0/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "9L1F4r7a83U",
        },
        snippet: {
          title:
            "TAMA Sound Check on Stage_FUYU_vol.2 @ Nagoya Century Hall (10th Anniversary BENI &quot;BEST&quot; Live Tour)",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/9L1F4r7a83U/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/9L1F4r7a83U/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/9L1F4r7a83U/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "b9vT5P594Us",
        },
        snippet: {
          title: "TAMA STAR Drumスペシャルインタビュー vol.2 - FUYU-",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/b9vT5P594Us/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/b9vT5P594Us/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/b9vT5P594Us/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "8qAFrHBqM1o",
        },
        snippet: {
          title: "FUYU sound check on stage @ Nagoya, JAPAN.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/8qAFrHBqM1o/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/8qAFrHBqM1o/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/8qAFrHBqM1o/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "bzw9kCOcOR0",
        },
        snippet: {
          title:
            "FUYUついにドラム動画を解禁！！　ドラム解説や裏話、結構話してますw",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/bzw9kCOcOR0/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/bzw9kCOcOR0/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/bzw9kCOcOR0/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "bPHIEgwY4g8",
        },
        snippet: {
          title:
            "DJ YUZE &amp; FUYU Ps &quot;NAKED SESSIONZ&quot; Maya Hatch, ZEEBRA, RINO LATINA II  5.29,2014 @JZ&#39;Brat,Tokyo",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/bPHIEgwY4g8/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/bPHIEgwY4g8/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/bPHIEgwY4g8/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "Me-9aHLoP-0",
        },
        snippet: {
          title: "Tama Star Maple showcase at NAMM 2013 - with Fuyu Murata",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/Me-9aHLoP-0/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/Me-9aHLoP-0/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/Me-9aHLoP-0/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "NE2z2620UzY",
        },
        snippet: {
          title:
            "TAMA Starclassic Walnut/Birch Kit featuring FUYU music by Juny Mag.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/NE2z2620UzY/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/NE2z2620UzY/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/NE2z2620UzY/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "aOUNLyaEnos",
        },
        snippet: {
          title: "FUYU 〜 AI TOUR｢和と洋｣ -sound check-",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/aOUNLyaEnos/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/aOUNLyaEnos/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/aOUNLyaEnos/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "9VUXQSebhvc",
        },
        snippet: {
          title: "Starclassic Walnut/Birch Kit  -featuring FUYU",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/9VUXQSebhvc/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/9VUXQSebhvc/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/9VUXQSebhvc/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "YknkTHaIOP8",
        },
        snippet: {
          title: "Tips for Drummer by FUYU -『Live本番前のウォームアップ』",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/YknkTHaIOP8/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/YknkTHaIOP8/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/YknkTHaIOP8/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "BSeqGf5Z8IQ",
        },
        snippet: {
          title: "FUYU Drum Clinic Tour 2013.",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/BSeqGf5Z8IQ/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/BSeqGf5Z8IQ/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/BSeqGf5Z8IQ/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "yuhwrQxhSzs",
        },
        snippet: {
          title:
            "[FUYU Drum Clinics from amps] ダイジェスト映像 2017 March ver",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/yuhwrQxhSzs/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/yuhwrQxhSzs/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/yuhwrQxhSzs/hqdefault.jpg",
            },
          },
        },
      },
    ],
  },
  {
    nextPageToken: "1",
    items: [
      {
        id: {
          videoId: "I2_kfNM8iVo",
        },
        snippet: {
          title:
            "FUYU_sound check vol.1 @ Nagoya Century Hall (10th Anniversary BENI &quot;BEST&quot; Live Tour)",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "JKG54p9jzyM",
        },
        snippet: {
          title:
            "ドラマーが講演会で演奏してみたらメチャ出来が良かったからアップしてみた♪",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "ddlFaK5qhrI",
        },
        snippet: {
          title: "FUYUが伝授するGospel Drummingの奥義〜Demonstration〜",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "l0HBTbqtEQ4",
        },
        snippet: {
          title:
            "（番外編）【見せます！！】プロのレコーディング/現場でどうやって準備、そして演奏、録りまでの過程をお見せします‼️",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/l0HBTbqtEQ4/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/l0HBTbqtEQ4/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/l0HBTbqtEQ4/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "UwLyfxMUki4",
        },
        snippet: {
          title:
            "FUYUが伝授するGospel Drummingの奥義〜演奏解説①ダイナミクス表現〜",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/UwLyfxMUki4/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/UwLyfxMUki4/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/UwLyfxMUki4/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "e50_919M2L4",
        },
        snippet: {
          title: "FUYU Drum Clinic",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/e50_919M2L4/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/e50_919M2L4/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/e50_919M2L4/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "YY_OE4bjWs0",
        },
        snippet: {
          title:
            "【番外編】FUYUドラム解説動画シリーズ PART2！！　今回は楽曲【MONOCHRONO】をV-DRUMで現代風に叩いてKAZとじっくり解説したり、ドラム演奏と言うテーマを元に深く語ってみた！",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/YY_OE4bjWs0/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/YY_OE4bjWs0/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/YY_OE4bjWs0/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "9L1F4r7a83U",
        },
        snippet: {
          title:
            "TAMA Sound Check on Stage_FUYU_vol.2 @ Nagoya Century Hall (10th Anniversary BENI &quot;BEST&quot; Live Tour)",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/9L1F4r7a83U/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/9L1F4r7a83U/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/9L1F4r7a83U/hqdefault.jpg",
            },
          },
        },
      },
    ],
  },
  {
    nextPageToken: "2",
    items: [
      {
        id: {
          videoId: "I2_kfNM8iVo",
        },
        snippet: {
          title:
            "FUYU_sound check vol.1 @ Nagoya Century Hall (10th Anniversary BENI &quot;BEST&quot; Live Tour)",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/I2_kfNM8iVo/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "JKG54p9jzyM",
        },
        snippet: {
          title:
            "ドラマーが講演会で演奏してみたらメチャ出来が良かったからアップしてみた♪",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/JKG54p9jzyM/hqdefault.jpg",
            },
          },
        },
      },
      {
        id: {
          videoId: "ddlFaK5qhrI",
        },
        snippet: {
          title: "FUYUが伝授するGospel Drummingの奥義〜Demonstration〜",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/default.jpg",
            },
            medium: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/mqdefault.jpg",
            },
            high: {
              url: "https://i.ytimg.com/vi/ddlFaK5qhrI/hqdefault.jpg",
            },
          },
        },
      },
    ],
  },
];
