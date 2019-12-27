import { NextPageContext } from 'next';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import NextPage from 'src/common/domain/model/NextPage';
import { HeadTitle } from 'src/common/presentation/components/molecules';
import { RootState } from 'src/common/presentation/state-module/root';
import { MusingResponseDto } from 'src/musings/api/dto';
import Musings from 'src/musings/presentation/components/templates/Musings';
import * as listModule from "src/musings/presentation/state-modules/list"

interface Props {
  musings: MusingResponseDto[]
  pending: boolean
  rejected: boolean
}

const MusingsPage: NextPage<Props> = ({ musings, pending, rejected }) => <>
  <HeadTitle title="Musings" />
  <Musings musings={musings} pending={pending} rejected={rejected} />
</>


MusingsPage.getInitialProps = async ({ store }: { store: Store<RootState> } & NextPageContext) => {
  if (store.getState().musings.list.musings.length === 0) {
    store.dispatch(listModule.fetchMusings())
  }

  return {
    namespacesRequired: ['common', 'noti'],
  }
}

const mapStateToProps = ({ musings }: RootState) => ({
  musings: musings.list.musings,
  pending: musings.list.pending,
  rejected: musings.list.rejected
})

export default connect(mapStateToProps)(MusingsPage);

// tslint:disable-next-line: no-commented-code
/*
'1','2019-12-25 15:23:32.625109','2019-12-25 15:23:57.552950','지혜로운 사람은 모든 땅에 갈 수 있으니, 훌륭한 영혼에게는 온 우주(universo)가 조국이기 때문이다.\n- 데모크리토스','카를로 로벨리, <보이는 세상은 실재가 아니다>, 쌤앤파커스, 2018, p43','KO'
'2','2019-12-25 15:24:48.441600','2019-12-25 15:24:48.441600','과학자라는 인간이 \'빨간색으로 이름을 쓰면 죽는다\'라는 미신에 휘둘려 이렇게 평정심을 잃은 모습을 보면서 제 자신이 얼마나 비과학적인 삶을 살고 있는가에 대해 생각해보게 됐습니다. 그래서 그 자리에서 일어나 책상에 불을 켜고 앉아서 하얀색 종이에다가 빨간색으로 제 이름을 썼어요. 그날 저는 비로소 \'과학자 정재승\'으로 다시 태어났습니다.','정재승, <열두 발자국>, 2018, 여섯 번째 발자국, p160','KO'
'3','2019-12-25 15:25:14.421212','2019-12-25 15:25:14.421212','It seems that perfection is attained not when there is nothing more to add, but when there is nothing more to remove.','Antoine de Saint Exupéry, <Wind, Sand and Stars>, 1939, Chapter 3','EN'
'4','2019-12-25 15:25:39.421281','2019-12-25 15:25:39.421281','대화는 철학, 예술, 시, 정치, 사랑, 소문, 날씨라고\n하는 7개의 현을 가진 7현금에 비유할 수 있다.','안나 브라우넬 제임슨, <프랭클린 플래너, 2015년 11월 27일>','KO'
'5','2019-12-25 15:26:03.332116','2019-12-25 15:26:03.332116','The one thing you can’t take away from me is the way I choose to respond to what you do to me. The last of one’s freedoms is to choose one’s attitude in any given circumstance.','Viktor E. Frankl, <Man\'s Search for Meaning>','EN'
'6','2019-12-25 15:26:31.230319','2019-12-25 15:26:31.230319','많이 말하지도 말고,\n갑자기 성내지도 말 것이다.','정약용, <목민심서>, 창비, 2005','KO'
*/