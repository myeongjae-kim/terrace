import Notice from "src/mother/notice/domain/model/Notice";

export const getNoticeFixture = (): Notice => ({
  "id": 1,
  "title": "title",
  "content": "content"
})

test('fixture test', () => {
  expect(getNoticeFixture()).toStrictEqual({
    "id": 1,
    "title": "title",
    "content": "content"
  })
})