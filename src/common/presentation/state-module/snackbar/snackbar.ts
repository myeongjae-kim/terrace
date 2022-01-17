import produce from "immer";
import {OptionsObject, VariantType} from "notistack";
import Optional from "optional-js";
import {ActionType, createAction, createReducer} from "typesafe-actions";
import {v4 as uuidv4} from "uuid";

export interface TOptions {
  e: string;
}

export interface SnackbarOptionsObject extends OptionsObject {
  onClose?: any;
  title?: string;
  remove?(): void;
}

export interface SnackbarEnqueuePayload {
  message: string | string[];
  messageOptions?: TOptions | string;
  variant: VariantType;
  options?: SnackbarOptionsObject;
}

export interface Snackbar {
  key: string;
  message: string | string[];
  messageOptions?: TOptions | string;
  dismissed?: boolean;
  options?: SnackbarOptionsObject;
}

export const reset = createAction("@snackbar/RESET")();

export const enqueueSnackbar = createAction("@snackbar/ENQUEUE_SNACKBAR")<{ snackbar: SnackbarEnqueuePayload }>();
export const dismissSnackbar = createAction("@snackbar/DISMISS_SNACKBAR")<{ key: string }>();
export const removeSnackbar = createAction("@snackbar/REMOVE_SNACKBAR")<{ key: string }>();

export const openNotificationCenter = createAction("@snackbar/OPEN_NOTIFICATION_CENTER")();
export const closeNotificationCenter = createAction("@snackbar/CLOSE_NOTIFICATION_CENTER")();

export type Action = ActionType<
  typeof reset |
  typeof enqueueSnackbar |
  typeof dismissSnackbar |
  typeof removeSnackbar |
  typeof openNotificationCenter |
  typeof closeNotificationCenter
>;

export interface State {
  snackbars: Snackbar[];
  isNotificationCenterOpened: boolean;
}

const createInitialState = (): State => ({
  snackbars: [],
  isNotificationCenterOpened: false
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(enqueueSnackbar, (state, action) => produce<State, State>(state, draft => {
    const { snackbar } = action.payload;
    draft.snackbars.push({
      ...snackbar,
      options: {
        ...snackbar.options,
        variant: snackbar.variant
      },
      key: uuidv4(),
    });
    return draft;
  }))
  .handleAction(dismissSnackbar, (state, action) => produce(state, draft => {
    const { key } = action.payload;

    Optional.ofNullable(draft.snackbars.find(s => s.key === key))
      .map(s => s.dismissed = true);
    return draft;
  }))
  .handleAction(removeSnackbar, (state, action) => produce(state, draft => {
    const { key } = action.payload;
    draft.snackbars = draft.snackbars.filter(s => s.key !== key);
    return draft;
  }))
  .handleAction(openNotificationCenter, (state) => produce(state, draft => {
    draft.isNotificationCenterOpened = true;
    return draft;
  }))
  .handleAction(closeNotificationCenter, (state) => produce(state, draft => {
    draft.isNotificationCenterOpened = false;
    return draft;
  }));
