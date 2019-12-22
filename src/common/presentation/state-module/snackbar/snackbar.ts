import { TOptions } from "i18next";
import produce from "immer";
import { OptionsObject, VariantType } from "notistack";
import Optional from "optional-js";
import { ActionType, createReducer, createStandardAction, getType } from "typesafe-actions";
import uuid from 'uuid';

export interface SnackbarOptionsObject extends OptionsObject {
  onClose?: any
  remove?(): void
}

export interface SnackbarEnqueuePayload {
  message: string | string[]
  messageOptions?: TOptions | string
  variant: VariantType
  options?: SnackbarOptionsObject
}

export interface Snackbar {
  key: string
  message: string | string[]
  messageOptions?: TOptions | string
  dismissed?: boolean
  options?: SnackbarOptionsObject
}

export const reset = createStandardAction("@snackbar/RESET")();

export const enqueueSnackbar = createStandardAction("@snackbar/ENQUEUE_SNACKBAR")<{ snackbar: SnackbarEnqueuePayload }>();
export const dismissSnackbar = createStandardAction("@snackbar/DISMISS_SNACKBAR")<{ key: string }>();
export const removeSnackbar = createStandardAction("@snackbar/REMOVE_SNACKBAR")<{ key: string }>();

export const openNotificationCenter = createStandardAction("@snackbar/OPEN_NOTIFICATION_CENTER")();
export const closeNotificationCenter = createStandardAction("@snackbar/CLOSE_NOTIFICATION_CENTER")();

export type Action = ActionType<
  typeof reset |
  typeof enqueueSnackbar |
  typeof dismissSnackbar |
  typeof removeSnackbar |
  typeof openNotificationCenter |
  typeof closeNotificationCenter
>

export interface State {
  snackbars: Snackbar[]
  isNotificationCenterOpened: boolean
}

const createInitialState = (): State => ({
  snackbars: [],
  isNotificationCenterOpened: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(enqueueSnackbar), (state, action) => produce(state, draft => {
    const { snackbar } = action.payload;
    draft.snackbars.push({
      ...snackbar,
      options: {
        ...snackbar.options,
        variant: snackbar.variant
      },
      key: uuid.v4(),
    });
    return draft
  }))
  .handleAction(getType(dismissSnackbar), (state, action) => produce(state, draft => {
    const { key } = action.payload;

    Optional.ofNullable(draft.snackbars.find(s => s.key === key))
      .map(s => s.dismissed = true);
    return draft
  }))
  .handleAction(getType(removeSnackbar), (state, action) => produce(state, draft => {
    const { key } = action.payload;
    draft.snackbars = draft.snackbars.filter(s => s.key !== key);
    return draft
  }))
  .handleAction(getType(openNotificationCenter), (state) => produce(state, draft => {
    draft.isNotificationCenterOpened = true;
    return draft;
  }))
  .handleAction(getType(closeNotificationCenter), (state) => produce(state, draft => {
    draft.isNotificationCenterOpened = false;
    return draft;
  }))