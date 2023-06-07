export interface BlogArticlePrevOrNext {
  id: string;
  createdAt: string;
  title: string;
  uri: string;
}

export interface BlogArticleDetailResponse {
  id: number;
  seq: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
  prev: BlogArticlePrevOrNext;
  next: BlogArticlePrevOrNext;
}

export const defaultBlogArticleDetailResponseDto: BlogArticleDetailResponse = {
  id: -1,
  seq: -1,
  createdAt: "",
  updatedAt: "",
  title: "",
  slug: "",
  content: "",
  prev: {
    id: "",
    createdAt: "",
    title: "",
    uri: ""
  },
  next: {
    id: "",
    createdAt: "",
    title: "",
    uri: ""
  },
};
