import Id from 'src/common/domain/model/Id';
import Page from "../model/Page";
import PageRequest from "../model/PageRequest";

export default interface CrudRepository<T> {
  findById(id: Id): Promise<T>
  findAll(pageRequest: PageRequest): Promise<Page<T>>
  save(notice: T): Promise<Id>
  deleteById(id: Id): Promise<void>
}