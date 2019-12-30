import Optional from 'optional-js';
import 'reflect-metadata';
import { createBlogArticleListResponseDtoFrom } from "src/blog/api";
import { BlogArticle } from 'src/blog/domain/model';
import { BlogArticleRepository } from "src/blog/domain/model/BlogArticleRepository";
import { BlogArticleService, BlogArticleServiceImpl } from "src/blog/domain/service";
import { formatDateTime } from 'src/util';
import { doesObjectHasNoUndefinedProperties } from 'src/util/test';
import { createBlogArticleDetatilRequestDtoFixture } from '../../api/dto/BlogArticleDetailRequestDto.unit.test';
import { createBlogArticleFixture } from "../model/BlogArticle.unit.test";

describe('BlogArticleServiceImpl', () => {
  let blogArticleRepository: Pick<BlogArticleRepository,
    "findAllByOrderBySeqDesc" |
    "findBySlug" |
    "findFirstBySeqAfterOrderBySeqAsc" |
    "findFirstBySeqBeforeOrderBySeqDesc"
  >;
  let blogArticleService: BlogArticleService;

  beforeEach(() => {
    blogArticleRepository = {
      findAllByOrderBySeqDesc: jest.fn(),
      findBySlug: jest.fn(),
      findFirstBySeqAfterOrderBySeqAsc: jest.fn(),
      findFirstBySeqBeforeOrderBySeqDesc: jest.fn(),
    }

    blogArticleService = new BlogArticleServiceImpl(blogArticleRepository as BlogArticleRepository);
  })

  it('should return found blog article list.', async () => {
    // given
    const blogArticle = createBlogArticleFixture();
    (blogArticleRepository.findAllByOrderBySeqDesc as jest.Mock<Promise<BlogArticle[]>>).mockResolvedValue([blogArticle]);

    // when
    const result = await blogArticleService.findAll();

    // then
    expect(result).toHaveLength(1);
    expect(result[0]).toStrictEqual(createBlogArticleListResponseDtoFrom(blogArticle));
  })

  it('should return found single blog article.', async () => {
    // given
    const req = createBlogArticleDetatilRequestDtoFixture();
    const current = createBlogArticleFixture("2");
    const prev = createBlogArticleFixture("1");
    const next = createBlogArticleFixture("3");

    req.year = formatDateTime(current.createdAt, "YYYY");
    req.month = formatDateTime(current.createdAt, "MM");
    req.day = formatDateTime(current.createdAt, "DD");

    (blogArticleRepository.findBySlug as jest.Mock<Promise<Optional<BlogArticle>>>)
      .mockResolvedValue(Optional.ofNullable(current));
    (blogArticleRepository.findFirstBySeqBeforeOrderBySeqDesc as jest.Mock<Promise<Optional<BlogArticle>>>)
      .mockResolvedValue(Optional.ofNullable(prev));
    (blogArticleRepository.findFirstBySeqAfterOrderBySeqAsc as jest.Mock<Promise<Optional<BlogArticle>>>)
      .mockResolvedValue(Optional.ofNullable(next));

    // when
    const result = await blogArticleService.find(req);

    // then
    expect(doesObjectHasNoUndefinedProperties(result)).toBeTruthy();
    expect(result.id).toBe("2");
    expect(result.prev.id).toBe("1");
    expect(result.next.id).toBe("3");
  })

  it('should throw an exception when a blog article has not been found.', async () => {
    // given
    const req = createBlogArticleDetatilRequestDtoFixture();

    (blogArticleRepository.findBySlug as jest.Mock<Promise<Optional<BlogArticle>>>).mockResolvedValue(Optional.empty());

    // expect
    await expect(blogArticleService.find(req)).rejects
      .toThrow(`A blog article has not been found by request: ${JSON.stringify(req)}`);
  })

  it('should throw an exception when a blog article has invalid date.', async () => {
    // given
    const req = createBlogArticleDetatilRequestDtoFixture();
    const blogArticle = createBlogArticleFixture();

    req.year = "9876";


    (blogArticleRepository.findBySlug as jest.Mock<Promise<Optional<BlogArticle>>>).mockResolvedValue(Optional.ofNullable(blogArticle));

    // expect
    await expect(blogArticleService.find(req)).rejects
      .toThrow(`A blog article has not been found by request: ${JSON.stringify(req)}`);
  })
})