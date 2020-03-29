import { NextComponentType, NextPageContext } from "next";
import { Store } from "redux";
import { RootState } from "src/common/presentation/state-module/root";

interface IDefaultCustomProps {
  namespacesRequired?: string[];
}

interface INextPageContextWithStore extends NextPageContext {
  store: Store<RootState>;
}

type NextPage<P = {}, IP = P> = NextComponentType<INextPageContextWithStore, IP | IDefaultCustomProps, P>

export default NextPage;
