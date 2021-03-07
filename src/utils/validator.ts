export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "(www\\.)?youtube\\.com" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?v=[;&a-z\\d%_.~+=-?]*)" + // videoId and other query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  const shortenedPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "(www\\.)?youtu\\.be" +
      "(\\/[-a-z\\d%_.~+]+)$", // path(videoId)
    "i"
  ); // fragment locator
  return pattern.test(url) || shortenedPattern.test(url);
};

export const validateHHMMSS = (hhmmdd: string): boolean => {
  if (hhmmdd.match(/^([1-9]:)?([0-5]?[0-9]:)?([0-5]?[0-9])$/) === null)
    return false;
  return true;
};
