import * as React from 'react';
import { MusingResponseDto } from 'src/musings/api/dto';
import Musings from '../components/templates/Musings';

const items: MusingResponseDto[] = [{
  id: "6",
  quote: `많이 말하지도 말고,
갑자기 성내지도 말 것이다.`,
  from: `정약용, <목민심서>, 창비, 2005`,
  language: 'KO',
}, {
  id: "5",
  quote: `The one thing you can’t take away from me is the way I choose to respond to what you do to me. The last of one’s freedoms is to choose one’s attitude in any given circumstance.`,
  from: `Viktor E. Frankl, <Man's Search for Meaning>`,
  language: 'EN',
}, {
  id: "4",
  quote: `대화는 철학, 예술, 시, 정치, 사랑, 소문, 날씨라고
하는 7개의 현을 가진 7현금에 비유할 수 있다.`,
  from: `안나 브라우넬 제임슨, <프랭클린 플래너, 2015년 11월 27일>`,
  language: 'KO',
}, {
  id: "3",
  quote: `It seems that perfection is attained not when there is nothing more to add, but when there is nothing more to remove.`,
  from: `Antoine de Saint Exupéry, <Wind, Sand and Stars>, 1939, Chapter 3`,
  language: 'EN',
}, {
  id: "2",
  quote: `과학자라는 인간이 '빨간색으로 이름을 쓰면 죽는다'라는 미신에 휘둘려 이렇게 평정심을 잃은 모습을 보면서 제 자신이 얼마나 비과학적인 삶을 살고 있는가에 대해 생각해보게 됐습니다. 그래서 그 자리에서 일어나 책상에 불을 켜고 앉아서 하얀색 종이에다가 빨간색으로 제 이름을 썼어요. 그날 저는 비로소 '과학자 정재승'으로 다시 태어났습니다.`,
  from: `정재승, <열두 발자국>, 2018, 여섯 번째 발자국, p160`,
  language: 'KO',
}, {
  id: "1",
  quote: `지혜로운 사람은 모든 땅에 갈 수 있으니, 훌륭한 영혼에게는 온 우주(universo)가 조국이기 때문이다.
- 데모크리토스`,
  from: `카를로 로벨리, <보이는 세상은 실재가 아니다>, 쌤앤파커스, 2018, p43`,
  language: 'KO'
}]

const MusingsContainer: React.FC = () => <Musings items={items} />

export default MusingsContainer;