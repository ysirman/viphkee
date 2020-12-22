export const timeToSeconds = (time: string): number => {
  const timeArray = time.split(":");
  if (timeArray.length === 2) {
    return parseInt(timeArray[0]) * 60 + parseInt(timeArray[1]);
  }
  if (timeArray.length === 3) {
    return (
      parseInt(timeArray[0]) * 3600 +
      parseInt(timeArray[1]) * 60 +
      parseInt(timeArray[2])
    );
  }
  return parseInt(time);
};

const pad = (number: number) => {
  return ("0" + number).slice(-2);
};

export const secondsToTime = (seconds: number): string => {
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = pad(date.getUTCSeconds());
  if (hh) {
    return `${hh}:${pad(mm)}:${ss}`;
  }
  return `${mm}:${ss}`;
};
