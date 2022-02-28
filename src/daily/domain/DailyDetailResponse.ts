export interface DailyDetailResponse {
  id: string;
  seq: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
}

export const defaultDailyDetailResponseDto: DailyDetailResponse = {
  id: "",
  seq: -1,
  createdAt: "",
  updatedAt: "",
  title: "",
  slug: "",
  content: ""
};
