import Id from 'src/common/domain/model/Id';

export default interface Notice {
  id: Id;
  title: string;
  content: string;
}