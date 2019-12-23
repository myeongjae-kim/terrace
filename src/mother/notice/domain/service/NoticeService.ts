import Id from 'src/common/domain/model/Id';
import Page from "src/common/domain/model/Page";
import PageRequest from "src/common/domain/model/PageRequest";
import NoticeRequestDto from "../../api/dto/NoticeRequestDto";
import Notice from "../model/Notice";

export default interface NoticeService {
  getNotice(id: Id): Promise<Notice>
  getNoticePage(pageRequest: PageRequest): Promise<Page<Notice>>
  postNotice(noticeRequestDto: NoticeRequestDto): Promise<Id>
  putNotice(id: Id, noticeRequestDto: NoticeRequestDto): Promise<void>
  deleteNotice(id: Id): Promise<void>
}