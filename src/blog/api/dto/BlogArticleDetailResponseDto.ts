export interface BlogArticlePrevOrNext {
  id: string;
  createdAt: string;
  title: string;
  uri: string;
}

export interface BlogArticleDetailResponseDto {
  id: string;
  seq: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  slug: string;
  content: string;
  prev: BlogArticlePrevOrNext;
  next: BlogArticlePrevOrNext;
}
