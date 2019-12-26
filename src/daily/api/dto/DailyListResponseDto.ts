import { Daily } from "src/daily/domain/model";

export interface DailyListResponseDto {
  id: string
  seq: number
  createdAt: string
  title: string
}

export const createDailyListResponseDtoFrom = ({ id, seq, createdAt, title }: Daily) => ({
  id, seq, createdAt: createdAt.toISOString(), title
})