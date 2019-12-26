import { Daily } from "src/daily/domain/model";

export interface DailyListResponseDto {
  id: string
  seq: number
  createdAt: string
  uri: string
  title: string
}

export const createDailyListResponseDtoFrom = (daily: Daily) => {
  const { id, seq, createdAt, title } = daily;

  return {
    id,
    seq,
    createdAt: createdAt.toISOString(),
    uri: daily.getUri(),
    title
  }
}