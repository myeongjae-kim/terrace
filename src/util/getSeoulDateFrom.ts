import moment from "moment-timezone";

export const getSeoulDateFrom = (input: moment.MomentInput) => moment(input).tz('Asia/Seoul')