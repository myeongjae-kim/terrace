import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { DailyDetailResponseDto, DailyPathDto, DailyRequestDto } from "src/daily/api";
import { DailyForm } from "src/daily/presentation/components/templates";
import * as formModule from "src/daily/presentation/state-modules/form";
import NextPage from "src/common/domain/model/NextPage";
import { RootState } from "src/common/presentation/state-module/root";
import { redirectFromGetInitialPropsTo } from "src/util";

const selector = createSelector<RootState, formModule.State, {
  initialValues: DailyDetailResponseDto;
  pending: boolean;
  rejected: boolean;
}>(
  root => root.daily.form,
  ({ initialValues, pending, rejected }) => ({ initialValues, pending, rejected })
);

const parsePathToPathDto = (asPath: string): DailyPathDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[3],
    month: splitted[4],
    day: splitted[5],
    slug: splitted[6],
  };
};

const DailyUpdatePage: NextPage<{ asPath: string }> = ({ asPath }) => {
  const dispatch = useDispatch<Dispatch<formModule.Action>>();
  const props = useSelector(selector);

  React.useEffect(() => {
    dispatch(formModule.fetchDaily({ dailyPathDto: parsePathToPathDto(asPath) }));
  }, [asPath, dispatch]);

  const onSubmit = React.useCallback((request: DailyRequestDto) => {
    dispatch(formModule.updateDaily({ request }));
    return Promise.resolve();
  }, [dispatch]);

  return <div>
    <DailyForm onSubmit={onSubmit} isUpdating {...props} />
  </div>;
};

DailyUpdatePage.getInitialProps = async ({ asPath, res }) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {};
  }

  return { namespacesRequired: ["common", "noti"], asPath };
};

export default DailyUpdatePage;