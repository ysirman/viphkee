export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "(www\\.)?youtube\\.com" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?v=[;&a-z\\d%_.~+=-]*)" + // videoId and other query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(url);
};

export const validateHHMMSS = (hhmmdd: string): boolean => {
  if (hhmmdd.match(/^([1-9]:)?([0-5]?[0-9]:)?([0-5]?[0-9])$/) === null) {
    console.log("Invalid time format:", hhmmdd);
    return true;
  }
  return false;
};
