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

export const youtubeApiUrl = (videoId: string) => {
  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
  return `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&fields=items(snippet(title))&part=snippet`;
};
