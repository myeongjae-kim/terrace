import moment from "moment-timezone";

export const formatDateTime = (input: moment.MomentInput, format: string) => {
  const time = moment(input);
  time.tz("Asia/Seoul")
  return time.format(format);
};