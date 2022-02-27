import { Daily } from "src/view/daily/domain/model";

export interface DailyListResponseDto {
  id: string;
  seq: number;
  createdAt: string;
  uri: string;
  title: string;
}

export const createDailyListResponseDtoFrom = (daily: Daily) => {
  const { id, seq, createdAt, title } = daily;

  return {
    id,
    seq,
    createdAt: createdAt,
    uri: daily.getUri(),
    title
  };
};
