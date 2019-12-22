import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Confirm from '../../components/molecules/Confirm';
import { ConfirmPayload } from '../../state-module/common';
import * as commonModule from '../../state-module/common'
import { RootState } from '../../state-module/root';

interface Props {
  isConfirmOpened: boolean
  confirmData: ConfirmPayload
  dispatchers: typeof commonModule
}

const ConfirmContainer: React.FC<Props> = ({ isConfirmOpened, confirmData, dispatchers }) => {
  const closeConfirmDialog = () => {
    dispatchers.closeConfirmDialog();
  }

  return <Confirm
    isConfirmOpened={isConfirmOpened}
    confirmData={confirmData}
    closeConfirmDialog={closeConfirmDialog} />;
}

const mapStateToProps = (state: RootState) => ({
  isConfirmOpened: state.common.isConfirmOpened,
  confirmData: state.common.confirmData,
})

const mapDispatchToProps = (dispatch: Dispatch<commonModule.Action>) => ({
  dispatchers: bindActionCreators(commonModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmContainer);