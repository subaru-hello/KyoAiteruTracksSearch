export const addHoursToDate = (date: Date, hours: number): Date => {
  // 現在の時刻に指定された時間を加算
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
};

export const formatToYYYYMMDD = (date: Date): string => {
  // 年月日をゼロ埋めしてフォーマット
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};
