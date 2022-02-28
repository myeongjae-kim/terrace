import { Daily } from "src/view/daily/domain/model";

export interface DailyDetailResponseDto {
  id: string;
  seq: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
}

export const createDailyDetailResponseDtoFrom =
  ({ id, seq, createdAt, updatedAt, title, slug, content }: Daily): DailyDetailResponseDto => ({
    id,
    seq,
    createdAt,
    updatedAt,
    title,
    slug,
    content
  });

export const defaultDailyDetailResponseDto: DailyDetailResponseDto = {
  id: "",
  seq: -1,
  createdAt: "",
  updatedAt: "",
  title: "",
  slug: "",
  content: ""
};