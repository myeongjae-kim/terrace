import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import NotificationCenter from '../../components/organisms/NotificationCenter';
import { RootState } from '../../state-module/root';
import * as snackbarModule from '../../state-module/snackbar';
import { Snackbar } from '../../state-module/snackbar';

interface Props {
  isNotificationCenterOpened: boolean
  snackbars: Snackbar[]
  dispatchers: typeof snackbarModule
}

const NotificationCenterContainer: React.FC<Props> = ({
  isNotificationCenterOpened: opened,
  snackbars,
  dispatchers,
}) => {
  const handleClose = dispatchers.closeNotificationCenter;
  const handleRemove = (key: string) => dispatchers.removeSnackbar({ key });

  return <NotificationCenter
    snackbars={snackbars}
    opened={opened}
    handleClose={handleClose}
    handleRemove={handleRemove}
  />
}


const mapStateToProps = ({ snackbar }: RootState) => ({
  isNotificationCenterOpened: snackbar.isNotificationCenterOpened,
  snackbars: snackbar.snackbars
})

const mapDispatchToProps = (dispatch: Dispatch<snackbarModule.Action>) => ({
  dispatchers: bindActionCreators(snackbarModule, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationCenterContainer);