import * as React from "react";
import {useSelector} from "react-redux";
import {createSelector} from "reselect";
import NextPage from "src/common/domain/model/NextPage";
import {HeadTitle, PageTitle} from "src/common/presentation/components/molecules";
import {RootState} from "src/common/presentation/state-module/root";
import DailyList from "src/daily/presentation/components/templates/DailyList";
import * as listModule from "src/daily/presentation/state-modules/list";
import {DailyListResponseDto} from "src/daily/api";
import {pageContainerStyle} from "../../src/common/styles/pageContainerStyle";
import MyPagination from "../../src/common/presentation/components/organisms/MyPagination";
import {StrapiPagination} from "../../src/common/domain/model/StrapiPagination";

interface DailyListPageProps {
  dailys: DailyListResponseDto[];
  pagination: StrapiPagination;
  pending: boolean;
  rejected: boolean;
}

const selector = createSelector(
  (root: RootState) => root.daily.list,
  (list : listModule.State): DailyListPageProps => ({ ...list })
);

const DailyPage: NextPage = () => {
  const props = useSelector<RootState, DailyListPageProps>(selector);

  return <div style={pageContainerStyle}>
    <div>
      <HeadTitle title="Daily" />
      <PageTitle title="daily" />
      <DailyList {...props} />
    </div>
    <div style={{display: "flex", justifyContent: "center"}}>
      <div>
        <MyPagination pagination={props.pagination} />
      </div>
    </div>
  </div>;
};

DailyPage.getInitialProps = async (initialProps) => {
  const {store, query} = initialProps;
  const page = parseInt("" + query["page"]) || 1;

  if (store.getState().daily.list.dailys.length === 0 || store.getState().daily.list.pagination.page !== page) {
    store.dispatch(listModule.fetchDailys({page}));
  }

  return { namespacesRequired: ["common", "noti"] };
};

export default DailyPage;
