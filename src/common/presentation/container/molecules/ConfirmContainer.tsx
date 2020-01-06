import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Confirm, { ConfirmProps } from '../../components/molecules/Confirm';
import * as commonModule from '../../state-module/common'
import { RootState } from '../../state-module/root';

const ConfirmContainer: React.FC = () => {
  const props = useSelector<RootState, Omit<ConfirmProps, "closeConfirmDialog">>(({ common }) => ({
    confirmData: common.confirmData,
    isConfirmOpened: common.isConfirmOpened
  }));

  const dispatch = useDispatch<Dispatch<commonModule.Action>>();
  const closeConfirmDialog = () => {
    dispatch(commonModule.closeConfirmDialog());
  }

  return <Confirm {...props} closeConfirmDialog={closeConfirmDialog} />;
}

export default ConfirmContainer;