import { produce } from 'immer'
import { ActionType, createReducer, createStandardAction, getType } from "typesafe-actions";

export interface ConfirmPayload {
  title?: string
  content: string
  onClick?(e?: React.MouseEvent): void
}

export const setPaths = createStandardAction("@common/SET_PATHS")<{ pathname: string }>();

export const openConfirmDialog = createStandardAction("@common/OPEN_CONFIRM_DIALOG")<ConfirmPayload>();
export const closeConfirmDialog = createStandardAction("@common/CLOSE_CONFIRM_DIALOG")();

export type Action = ActionType<
  typeof setPaths |
  typeof openConfirmDialog |
  typeof closeConfirmDialog
>

export interface State {
  paths: string[]

  isConfirmOpened: boolean
  confirmData: ConfirmPayload
}

const createInitialState = (): State => ({
  paths: [],

  isConfirmOpened: false,
  confirmData: {
    title: "",
    content: "",
    onClick: () => { return }
  }
});

export const reducer = createReducer<State, Action>(createInitialState())
  .handleAction(getType(setPaths), (state, action) => produce(state, draft => {
    draft.paths = action.payload.pathname.split("/").slice(1);
    draft.paths[0] = "/" + draft.paths[0];
    return draft
  }))
  .handleAction(getType(openConfirmDialog), (state, action) => produce(state, draft => {
    draft.isConfirmOpened = true;
    draft.confirmData = {
      ...action.payload
    }
    return draft;
  }))
  .handleAction(getType(closeConfirmDialog), (state) => produce(state, draft => {
    draft.isConfirmOpened = false;
    return draft;
  }))