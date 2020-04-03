import * as React from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import NextPage from "src/common/domain/model/NextPage";
import { HeadTitle, PageTitle } from "src/common/presentation/components/molecules";
import { RootState } from "src/common/presentation/state-module/root";
import DailyList from "src/daily/presentation/components/templates/DailyList";
import * as listModule from "src/daily/presentation/state-modules/list";
import * as meModule from "src/auth/presentation/state-modules/me";
import { DailyListResponseDto } from "src/daily/api";

interface DailyListPageProps {
  dailys: DailyListResponseDto[];
  pending: boolean;
  rejected: boolean;
  isSignedIn: boolean;
}

const selector = createSelector<RootState, listModule.State, meModule.State, DailyListPageProps>(
  root => root.daily.list,
  root => root.auth.me,
  (list, me) => ({
    ...list,
    isSignedIn: me.isSignedIn
  })
);

const DailyPage: NextPage = () => {
  const props = useSelector<RootState, DailyListPageProps>(selector);

  return <div>
    <HeadTitle title="Daily" />
    <PageTitle title="daily" />
    <DailyList {...props} />
  </div>;
};

DailyPage.getInitialProps = async ({ store }) => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys());
  }

  return { namespacesRequired: ["common", "noti"] };
};

export default DailyPage;