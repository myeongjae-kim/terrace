import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Page from 'src/common/domain/model/Page';
import { RootState } from 'src/common/presentation/state-module/root';
import Notice from '../../domain/model/Notice';
import NoticeList from '../components/organisms/NoticeList';
import * as listModule from "../state-modules/list"

interface Props {
  page: Page<Notice>
  pending: boolean
  rejected: boolean

  dispatchers: typeof listModule
}

const NoticePageContainer: React.FC<Props> = ({ page, pending, rejected, dispatchers }) => {
  React.useEffect(() => {
    dispatchers.fetchNoticePage()
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  return <NoticeList
    page={page}
    pending={pending}
    rejected={rejected} />;
}

const mapStateToProps = ({ mother }: RootState) => ({
  page: mother.notice.list.page,
  pending: mother.notice.list.pending,
  rejected: mother.notice.list.rejected
})

const mapDispatchToProps = (dispatch: Dispatch<listModule.Action>) => ({
  dispatchers: bindActionCreators(listModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticePageContainer);