import Id from 'src/common/domain/model/Id';
import Page from "src/common/domain/model/Page";
import PageRequest from "src/common/domain/model/PageRequest";
import NoticeRequestDto from "../../api/dto/NoticeRequestDto";
import Notice from "../../domain/model/Notice";
import NoticeService from "../../domain/service/NoticeService";
import { noticeRepository } from '../repository/NoticeRepositoryImpl';

export const noticeService: NoticeService = {
  getNotice: (id: Id): Promise<Notice> => noticeRepository.findById(id),

  getNoticePage: (pageRequest: PageRequest): Promise<Page<Notice>> =>
    noticeRepository.findAll(pageRequest),

  postNotice: ({ title, content }: NoticeRequestDto): Promise<Id> =>
    noticeRepository.save({ id: -1, title, content }),

  putNotice: (id: Id, { title, content }: NoticeRequestDto): Promise<void> =>
    noticeRepository.save({ id, title, content }).then(() => { return }),

  deleteNotice: (id: Id): Promise<void> => noticeRepository.deleteById(id)
}