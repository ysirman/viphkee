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
