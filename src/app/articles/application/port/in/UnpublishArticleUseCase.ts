export interface UnpublishArticleUseCase {
  execute: (args: { slug: string }) => Promise<void>;
}
