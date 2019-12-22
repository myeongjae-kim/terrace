import _Axios from 'axios';
jest.mock('axios')

import { Page } from 'csstype';
import RepositoryError from 'src/common/domain/model/RepositoryError';
import { getRepositoryErrorFixture } from 'src/common/tests/domain/model/RepositoryError.unit.test';
import Notice from 'src/mother/notice/domain/model/Notice';
import { noticeRepository } from 'src/mother/notice/infrastructure/repository/NoticeRepositoryImpl';
import createAxiosErrorWithData from 'src/util/test/createAxiosErrorWithData';

describe("NoticeRepositoryImpl test", () => {
  const Axios = _Axios as jest.Mocked<typeof _Axios>

  test("findById_ValidInput_ValidOutput", async () => {
    // given
    const response = {
      data: {
        "id": 1,
        "title": "title",
        "content": "content"
      } as Notice
    }
    Axios.get.mockReturnValue(Promise.resolve(response));

    // when
    const res = await noticeRepository.findById(1);

    // then
    expect(res.id).toBe(1);
    expect(res.title).toBe("title");
    expect(res.content).toBe("content");
  });

  test("findById_RepositoryError_ThrowException", async () => {
    // given
    const { timestamp, status, error, message } = getRepositoryErrorFixture();
    Axios.get.mockReturnValue(Promise.reject(createAxiosErrorWithData({ timestamp, status, error, message })));

    // when
    let repositoryError;
    try {
      await noticeRepository.findById(1);
    } catch (e) {
      repositoryError = e;
    }

    // then
    expect(repositoryError).toBeInstanceOf(RepositoryError);
    expect(repositoryError.timestamp).toBe(timestamp);
    expect(repositoryError.status).toBe(status);
    expect(repositoryError.error).toBe(error);
    expect(repositoryError.message).toBe(message);
  });

  test("findAll_ValidInput_ValidOutput", async () => {
    // given
    const response = {
      data: {
        content: [{
          "id": 1,
          "title": "title",
          "content": "content"
        }]
      } as Page<Notice>
    }
    Axios.get.mockReturnValue(Promise.resolve(response));

    // when
    const res = await noticeRepository.findAll({ page: 1, size: 10 });

    // then
    expect(res.content.length).toBe(1);
    expect(res.content[0]).toStrictEqual({
      "id": 1,
      "title": "title",
      "content": "content"
    });
  });

  test("findAll_RepositoryError_ThrowException", async () => {
    // given
    const { timestamp, status, error, message } = getRepositoryErrorFixture();
    Axios.get.mockReturnValue(Promise.reject(createAxiosErrorWithData({ timestamp, status, error, message })));

    // when
    let repositoryError;
    try {
      await noticeRepository.findAll({ page: 1, size: 50 });
    } catch (e) {
      repositoryError = e;
    }

    // then
    expect(repositoryError).toBeInstanceOf(RepositoryError);
    expect(repositoryError.timestamp).toBe(timestamp);
    expect(repositoryError.status).toBe(status);
    expect(repositoryError.error).toBe(error);
    expect(repositoryError.message).toBe(message);
  });

  test("save_WithId_ValidOutput", async () => {
    // given
    const response = {
      data: "1"
    }
    Axios.put.mockReturnValue(Promise.resolve(response));

    // when
    const res = await noticeRepository.save({ id: 1, title: "title", content: "content" });

    // then
    expect(res).toBe(1);
  });

  test("save_Without_ValidOutput", async () => {
    // given
    const response = {
      data: 1
    }
    Axios.post.mockReturnValue(Promise.resolve(response));

    // when
    const res = await noticeRepository.save({ id: -1, title: "title", content: "content" });

    // then
    expect(res).toBe(1);
  });

  [1, -1].forEach((id) =>
    test("save_RepositoryError_ThrowException", async () => {
      // given
      const { timestamp, status, error, message } = getRepositoryErrorFixture();
      Axios.put.mockReturnValue(Promise.reject(createAxiosErrorWithData({ timestamp, status, error, message })));
      Axios.post.mockReturnValue(Promise.reject(createAxiosErrorWithData({ timestamp, status, error, message })));

      // when
      let repositoryError;
      try {
        await noticeRepository.save({ id, title: "title", content: "content" });
      } catch (e) {
        repositoryError = e;
      }

      // then
      expect(repositoryError).toBeInstanceOf(RepositoryError);
      expect(repositoryError.timestamp).toBe(timestamp);
      expect(repositoryError.status).toBe(status);
      expect(repositoryError.error).toBe(error);
      expect(repositoryError.message).toBe(message);
    }));
})