import { withSnackbar, WithSnackbarProps } from "notistack";
import * as React from "react";
import { WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { withTranslation } from "next-i18next";
import { RootState } from "../../state-module/root";
import * as snackbarModule from "../../state-module/snackbar";
import { Snackbar } from "../../state-module/snackbar";
import {IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";

interface Props extends WithSnackbarProps, WithTranslation {
  snackbars: Snackbar[];
  dispatchers: typeof snackbarModule;
}

class SnackbarContainer extends React.Component<Props> {
  private displayed: string[] = [];

  public render() {
    return <></>;
  }

  public shouldComponentUpdate({ snackbars: newSnackbars = [] }: { snackbars: Snackbar[] }) {
    if (!newSnackbars.length) {
      this.displayed = [];
      return false;
    }

    const { snackbars: currentSnackbars } = this.props;
    let notExists = false;
    for (const newSnackbar of newSnackbars) {
      if (newSnackbar.dismissed) {
        this.props.dispatchers.dismissSnackbar({ key: newSnackbar.key });
      }

      if (notExists) { continue; }
      notExists = !currentSnackbars.filter(({ key }) => newSnackbar.key === key).length;
    }
    return notExists;
  }

  public componentDidUpdate() {
    const { snackbars = [], t } = this.props;

    snackbars.forEach(({ key, message, messageOptions, options = {} }) => {
      // Do nothing if snackbar is already displayed
      if (this.displayed.includes(key)) { return; }
      // Display snackbar using notistack
      this.props.enqueueSnackbar(t(message, messageOptions), {
        ...options,
        persist: options.variant === "error" ? true : false,
        action: keyToDismiss => (
          // tslint:disable-next-line: jsx-no-lambda
          <IconButton key="close" color="inherit" onClick={() => this.props.closeSnackbar(keyToDismiss)}>
            <Close style={{ fontSize: 20 }} />
          </IconButton>
        ),
        onClose: ((event: any, reason: any, keyOfOption: any) => {
          if (options.onClose) {
            options.onClose(event, reason, keyOfOption);
          }
        }) as any,
      });
      // Keep track of snackbars that we've displayed
      this.storeDisplayed(key);
    });
  }

  private storeDisplayed = (id: string) => {
    this.displayed = [...this.displayed, id];
  };
}

const mapStateToProps = ((state: RootState) => ({
  snackbars: state.snackbar.snackbars,
}));

const mapDispatchToProps = (dispatch: Dispatch<snackbarModule.Action>) => ({
  dispatchers: bindActionCreators(snackbarModule, dispatch)
});

export default withTranslation("noti")(withSnackbar(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SnackbarContainer)));
