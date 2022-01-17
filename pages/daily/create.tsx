import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { DailyRequestDto } from "src/daily/api";
import { DailyForm } from "src/daily/presentation/components/templates";
import * as formModule from "src/daily/presentation/state-modules/form";
import NextPage from "src/common/domain/model/NextPage";
import { RootState } from "src/common/presentation/state-module/root";

interface SelectorReturn {
  pending: boolean;
  rejected: boolean;
}

const selector = createSelector(
  (root: RootState) => root.daily.form,
  ({ pending, rejected }: formModule.State): SelectorReturn => ({ pending, rejected })
);

const DailyCreatePage: NextPage = () => {
  const dispatch = useDispatch<Dispatch<formModule.Action>>();
  const props = useSelector(selector);

  const onSubmit = React.useCallback((request: DailyRequestDto) => {
    dispatch(formModule.createDaily({ request }));
    return Promise.resolve();
  }, [dispatch]);

  return <div>
    <DailyForm onSubmit={onSubmit} {...props} />
  </div>;
};

DailyCreatePage.getInitialProps = async () => {
  return { namespacesRequired: ["common", "noti"] };
};

export default DailyCreatePage;
