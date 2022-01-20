import * as React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import NextPage from "src/common/domain/model/NextPage";
import {HeadTitle, PageTitle} from "src/common/presentation/components/molecules";
import { RootState } from "src/common/presentation/state-module/root";
import Musings from "src/musings/presentation/components/templates/Musings";
import { MusingsProps } from "src/musings/presentation/components/templates/Musings/Musings";
import * as listModule from "src/musings/presentation/state-modules/list";
import {pageContainerStyle} from "../../src/common/styles/pageContainerStyle";
import {useTheme} from "@material-ui/core";

const selector = createSelector(
  (root: RootState) => root.musings.list,
  (list: listModule.State): MusingsProps => list
);

const MusingsPage: NextPage = () => {
  const theme = useTheme();
  const props = useSelector<RootState, MusingsProps>(selector);

  return <div style={pageContainerStyle}>
    <HeadTitle title="Musings" />
    <PageTitle title="quotes" />
    <Musings {...props} />
    <div style={{padding: `${theme.spacing(1.5)}px 0`}}/> {/* Loading 컴포넌트를 가운데로 맞추기 위한 empty div */}
  </div>;
};


MusingsPage.getInitialProps = async ({ store }) => {
  if (store.getState().musings.list.musings.length === 0) {
    store.dispatch(listModule.fetchMusings());
  }

  return {
    namespacesRequired: ["common", "noti"],
  };
};

export default MusingsPage;
