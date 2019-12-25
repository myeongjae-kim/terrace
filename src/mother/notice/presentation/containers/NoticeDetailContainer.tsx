import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Id from 'src/common/domain/model/Id';
import I18NService from 'src/common/domain/service/I18NService';
import * as commonModule from "src/common/presentation/state-module/common";
import { RootState } from 'src/common/presentation/state-module/root';
import Notice from '../../domain/model/Notice';
import NoticeDetail from '../components/organisms/NoticeDetail';
import * as detailModule from "../state-modules/detail";

interface Props {
  id: Id

  notice: Notice
  pending: boolean
  rejected: boolean

  dispatchers: typeof detailModule
  commonDispatchers: typeof commonModule
}

const { useTranslation } = I18NService;

const NoticeDetailContainer: React.FC<Props> = ({ id, notice, pending, rejected, dispatchers, commonDispatchers }) => {
  React.useEffect(() => {
    if (notice.id < 1) {
      dispatchers.fetchNotice({ id });
    }
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  const { t } = useTranslation('noti');

  const deleteNotice = () => {
    commonDispatchers.openConfirmDialog({
      "content": t("mother.notice.delete.confirm"),
      "onClick": () => dispatchers.deleteNotice({ id })
    })
  }

  return <NoticeDetail
    notice={notice}
    pending={pending}
    rejected={rejected}

    deleteNotice={deleteNotice}
  />;
}

const mapStateToProps = ({ mother }: RootState) => ({
  notice: mother.notice.detail.notice,
  pending: mother.notice.detail.pending,
  rejected: mother.notice.detail.rejected
})

const mapDispatchToProps = (dispatch: Dispatch<detailModule.Action>) => ({
  dispatchers: bindActionCreators(detailModule, dispatch),
  commonDispatchers: bindActionCreators(commonModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeDetailContainer);