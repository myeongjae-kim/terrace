import Axios from 'axios';
import Id from 'src/common/domain/model/Id';
import Page from 'src/common/domain/model/Page';
import PageRequest from 'src/common/domain/model/PageRequest';
import CommonErrorServiceImpl from 'src/common/infrastructure/service/CommonErrorServiceImpl';
import Notice from '../../domain/model/Notice';
import NoticeRepository from '../../domain/repository/NoticeRepository'

const NOTICE_REPO_URL = `${process.env.MOTHER_API}/notices`

export const noticeRepository: NoticeRepository = {
  findById: (id: Id): Promise<Notice> => new Promise((resolve, rejected) => {
    Axios.get<Notice>(`${NOTICE_REPO_URL}/${id}`)
      .then(({ data }) => resolve({
        ...data,
        id
      }))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  }),

  findAll: ({ page, size, sort = "id,desc" }: PageRequest): Promise<Page<Notice>> =>
    new Promise((resolve, rejected) => {
      Axios.get<Page<Notice>>(NOTICE_REPO_URL, {
        params: {
          page, size, sort
        }
      })
        .then(({ data }) => resolve(data))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    }),

  save: (notice: Notice): Promise<Id> => {
    if (notice.id > 0) {
      return new Promise((resolve, rejected) => {
        Axios.put<void>(`${NOTICE_REPO_URL}/${notice.id}`, notice)
          .then(() => resolve(notice.id))
          .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
      })
    }

    return new Promise((resolve, rejected) => {
      Axios.post<Id>(NOTICE_REPO_URL, notice)
        .then(({ data: id }) => resolve(id))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
    })
  },

  deleteById: (id: Id): Promise<void> => new Promise((resolve, rejected) => {
    Axios.delete<void>(`${NOTICE_REPO_URL}/${id}`)
      .then(() => resolve())
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)));
  })
}