export interface PublishArticleUseCase {
  publish: (args: { slug: string }) => Promise<void>;
}
