export interface UnpublishArticleUseCase {
  unpublish: (args: { slug: string }) => Promise<void>;
}
