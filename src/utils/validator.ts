export const validateUrl = (url: string): boolean => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
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
