export interface PublishArticleUseCase {
  execute: (args: { slug: string }) => Promise<void>;
}
