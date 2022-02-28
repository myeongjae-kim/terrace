import { Daily } from "src/daily/domain";

export interface DailyDetailResponse {
  id: string;
  seq: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
}

export const createDailyDetailResponseDtoFrom =
  ({ id, seq, createdAt, updatedAt, title, slug, content }: Daily): DailyDetailResponse => ({
    id,
    seq,
    createdAt,
    updatedAt,
    title,
    slug,
    content
  });

export const defaultDailyDetailResponseDto: DailyDetailResponse = {
  id: "",
  seq: -1,
  createdAt: "",
  updatedAt: "",
  title: "",
  slug: "",
  content: ""
};
