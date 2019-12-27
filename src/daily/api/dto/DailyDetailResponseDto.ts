import { Daily } from "src/daily/domain/model";

export interface DailyDetailResponseDto {
  id: string
  seq: number
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  content: string
}

export const createDailyDetailResponseDtoFrom =
  ({ id, seq, createdAt, updatedAt, title, slug, content }: Daily): DailyDetailResponseDto => ({
    id,
    seq,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    title,
    slug,
    content
  })