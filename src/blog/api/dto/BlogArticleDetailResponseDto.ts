import { BlogArticle } from "src/blog/domain/model";

export interface BlogArticlePrevOrNext {
  id: string
  createdAt: string
  title: string
  uri: string
}

export interface BlogArticleDetailResponseDto {
  id: string
  seq: number
  createdAt: string
  updatedAt: string
  title: string
  slug: string
  content: string
  prev: BlogArticlePrevOrNext
  next: BlogArticlePrevOrNext
}

export const createBlogArticleDetailResponseDtoFrom = (args: {
  current: BlogArticle
  prev: BlogArticle
  next: BlogArticle
}): BlogArticleDetailResponseDto => {
  const { current, prev, next } = args;
  const { id, seq, createdAt, updatedAt, title, slug, content } = current;

  return {
    id,
    seq,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    title,
    slug,
    content,
    prev: {
      id: prev.id,
      createdAt: prev.createdAt.toISOString(),
      title: prev.title,
      uri: prev.getUri()
    },
    next: {
      id: next.id,
      createdAt: next.createdAt.toISOString(),
      title: next.title,
      uri: next.getUri()
    },
  }
}