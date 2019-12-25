import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Id from 'src/common/domain/model/Id';
import I18NService from 'src/common/domain/service/I18NService';
import * as commonModule from "src/common/presentation/state-module/common";
import { RootState } from 'src/common/presentation/state-module/root';
import NoticeFormDto from '../../api/dto/NoticeFormDto';
import NoticeForm from '../components/templates/NoticeForm';
import * as formModule from "../state-modules/form";

interface Props {
  id?: Id
  isEditing: boolean

  initialNoticeFormDto: NoticeFormDto
  pending: boolean
  rejected: boolean

  dispatchers: typeof formModule
  commonDispatchers: typeof commonModule
}

const { useTranslation } = I18NService;
const NoticeFormContainer: React.FC<Props> = ({
  id,
  isEditing,
  initialNoticeFormDto,
  pending,
  rejected,
  dispatchers,
  commonDispatchers
}) => {
  const { t } = useTranslation('noti');
  React.useEffect(() => {
    if (id && isEditing && initialNoticeFormDto.title === "") {
      dispatchers.fetchInitialNotice({ id });
    }
  }, [])

  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  const [post] = React.useState(() => (noticeFormDto: NoticeFormDto) => {
    commonDispatchers.openConfirmDialog({
      content: t("mother.notice.add.confirm"),
      onClick: () => dispatchers.postNotice({ noticeFormDto })
    })
  })

  const [put] = React.useState(() => (noticeFormDto: NoticeFormDto) => {
    if (!id) {
      return;
    }

    commonDispatchers.openConfirmDialog({
      content: t("mother.notice.edit.confirm"),
      onClick: () => dispatchers.putNotice({ id, noticeFormDto })
    })
  })

  return <NoticeForm
    onSubmit={isEditing ? put : post}
    initialValues={initialNoticeFormDto}

    isEditing={isEditing}
    pending={pending}
    rejected={rejected} />;
}

const mapStateToProps = ({ mother }: RootState) => ({
  ...mother.notice.form
})

const mapDispatchToProps = (dispatch: Dispatch<formModule.Action | commonModule.Action>) => ({
  dispatchers: bindActionCreators(formModule, dispatch),
  commonDispatchers: bindActionCreators(commonModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NoticeFormContainer);