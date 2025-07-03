export const formatTimeDifferenceT20 = (timestamp: number) => {
  if (timestamp) {
    const secondsDifference = Math.abs(
      Math.floor((new Date().getTime() - timestamp * 1000) / 1000)
    );

    const minutes = Math.floor(secondsDifference / 60);
    const hours = Math.floor(secondsDifference / 3600);
    const days = Math.floor(secondsDifference / 86400);

    const secondsMod = Math.floor(secondsDifference % 60);
    const minutesMod = Math.floor((secondsDifference % 3600) / 60);
    const hoursMod = Math.floor((secondsDifference % 86400) / 3600);

    const formatNumber = (num: number) => (num < 10 ? "0" + num : num);

    if (secondsDifference < 60) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: formatNumber(secondsDifference),
      };
    } else if (secondsDifference < 3600) {
      return {
        days: "00",
        hours: "00",
        minutes: formatNumber(minutes),
        seconds: formatNumber(secondsMod),
      };
    } else if (secondsDifference < 86400) {
      return {
        days: "00",
        hours: formatNumber(hours),
        minutes: formatNumber(minutesMod),
        seconds: formatNumber(secondsMod),
      };
    } else if (secondsDifference < 6048000000) {
      return {
        days: formatNumber(days),
        hours: formatNumber(hoursMod),
        minutes: formatNumber(minutesMod),
        seconds: formatNumber(secondsMod),
      };
    }
  }
  return {
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  };
};
