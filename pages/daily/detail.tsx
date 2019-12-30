import { useTheme } from '@material-ui/core';
import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, Store } from 'redux';
import { DOMAIN } from 'src/common/constants/Constants';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { Disqus } from 'src/common/presentation/components/organisms';
import { RootState } from 'src/common/presentation/state-module/root';
import { DailyListResponseDto } from 'src/daily/api';
import { DailyDetailRequestDto, DailyDetailResponseDto } from 'src/daily/api/dto';
import DailyDetail from 'src/daily/presentation/components/templates/DailyDetail';
import DailyList from 'src/daily/presentation/components/templates/DailyList';
import * as detailModule from "src/daily/presentation/state-modules/detail";
import * as listModule from "src/daily/presentation/state-modules/list";
import { formatDateTime, redirectFromGetInitialPropsTo } from 'src/util';

interface Props {
  daily: DailyDetailResponseDto
  dailys: DailyListResponseDto[]
  pending: boolean
  rejected: boolean
  statusCode: number

  dispatchers: typeof detailModule
}

const DailyDetailPage: NextPage<Props> = ({ daily, dailys, pending, rejected, statusCode, dispatchers }) => {
  React.useEffect(() => () => {
    dispatchers.reset()
  }, [])

  const theme = useTheme();
  const { title, createdAt, slug } = daily;
  const uri = `/daily/${formatDateTime(createdAt, "YYYY/MM/DD")}/${slug}/`;

  return <>
    <HeadTitle title="Daily" />
    <DailyDetail daily={daily} pending={pending} rejected={rejected} statusCode={statusCode} />
    <DailyList dailys={dailys} pending={pending} rejected={rejected} currentDaily={daily} />
    <Disqus
      title={title}
      identifier={uri}
      url={`${DOMAIN}${uri}`} />
    <style jsx global>{`
#disqus_thread {
  max-width: ${theme.spacing(62.5)}px;
}
    `}</style>
  </>
}

DailyDetailPage.getInitialProps = async ({ store, asPath, res }: { store: Store<RootState> } & NextPageContext) => {
  if (!asPath) {
    redirectFromGetInitialPropsTo("/404", res);
    return {}
  }

  fetchDailyList(store);
  fetchDailyDetail(store, parsePathToDailyDetailRequest(asPath));

  return { namespacesRequired: ['common', 'noti'] }
}

const fetchDailyList = (store: Store<RootState>): void => {
  if (store.getState().daily.list.dailys.length === 0) {
    store.dispatch(listModule.fetchDailys())
  }
}

const fetchDailyDetail = (store: Store<RootState>, req: DailyDetailRequestDto): void => {
  store.dispatch(detailModule.fetchDaily({ daily: req }))
}

const parsePathToDailyDetailRequest = (asPath: string): DailyDetailRequestDto => {
  const splitted = asPath.split("/");
  return {
    year: splitted[2],
    month: splitted[3],
    day: splitted[4],
    slug: splitted[5],
  }
}

const mapStateToProps = ({ daily }: RootState) => ({
  daily: daily.detail.daily,
  pending: daily.detail.pending,
  rejected: daily.detail.rejected,
  statusCode: daily.detail.statusCode,

  dailys: daily.list.dailys,
})

const mapDispatchToProps = (dispatch: Dispatch<detailModule.Action>) => ({
  dispatchers: bindActionCreators(detailModule, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(DailyDetailPage);