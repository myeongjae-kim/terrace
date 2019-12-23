import CrudRepository from 'src/common/domain/repository/CrudRepository';
import Notice from '../model/Notice'

export default interface NoticeRepository extends CrudRepository<Notice> { }