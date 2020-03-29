import { NextComponentType, NextPageContext } from "next";
import { Store } from "redux";
import { RootState } from "src/common/presentation/state-module/root";

interface DefaultCustomProps {
  namespacesRequired?: string[];
}

interface NextPageContextWithStore extends NextPageContext {
  store: Store<RootState>;
}

type NextPage<P = {}, IP = P> = NextComponentType<NextPageContextWithStore, IP | DefaultCustomProps, P>

export default NextPage;
