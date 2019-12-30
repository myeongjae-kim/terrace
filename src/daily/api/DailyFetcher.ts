import Axios from "axios";
import { API_HOST } from "src/common/constants/Constants";
import CommonErrorServiceImpl from "src/common/infrastructure/service/CommonErrorServiceImpl";
import { DailyDetailRequestDto, DailyDetailResponseDto, DailyListResponseDto } from "./dto";

export const dailyFetcher = {
  findAll: (): Promise<DailyListResponseDto[]> => new Promise((resolve, rejected) => {
    Axios.get<DailyListResponseDto[]>(`${API_HOST}/daily/api`)
      .then(res => resolve(res.data))
      .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
  }),

  find: ({ year, month, day, slug }: DailyDetailRequestDto): Promise<DailyDetailResponseDto> =>
    new Promise((resolve, rejected) => {
      Axios.get<DailyDetailResponseDto>(`${API_HOST}/daily/api/${year}/${month}/${day}/${slug}`)
        .then(res => resolve(res.data))
        .catch(e => rejected(CommonErrorServiceImpl.createRepositoryErrorFrom(e)))
    }),
  /*
  find: ({ }: DailyDetailRequestDto): Promise<DailyDetailResponseDto> =>
    Promise.resolve({
      id: "1",
      seq: 1,
      createdAt: "2019-09-13T06:43:19.961Z",
      updatedAt: "2019-12-27T06:43:19.961Z",
      title: "인연 - 피천득",
      slug: "slug",
      content: `<p class='center'>
  <img src="https://cdn.myeongjae.kim/daily/2019/09/relationship.jpg#width-250#shadow#round" alt="민음사 피천득 - 인연 표지">
</p>

> 덕수궁 박물관에 청자 연적이 하나 있었다. 내가 본 그 연적은 연꽃 모양을 한 것으로, 똑같이 생긴 꽃잎들이 정연히 달려 있었는데, 다만 그중에 꽃잎 하나만이 약간 옆으로 꼬부라졌었다. 이 균형 속에 있는 눈에 거슬리지 않은 파격(破格)이 수필인가 한다. 한 조각 연꽃 잎을 꼬부라지게 하기에는 마음의 여유를 필요로 한다.
> 
> 이 마음의 여유가 없어 수필을 못 쓰는 것은 슬픈 일이다. 때로는 억지로 마음의 여유를 가지려 하다가도 그런 여유를 갖는 것이 죄스러운 것 같기도 하여 나의 마지막 10분의 1까지도 숫제 초조와 번잡에 다 주어 버리는 것이다.
> 
> <span>- 수필, 피천득</span>

하지만 피천득 선생님은 상당한 양의 수필을 남기었다. 대체 나는 무엇이 그렇게 분주한가? 그래서 오랜만에 글을 적었다.

피 선생님의 \<인연\>은 작년에 팀장님에게 추천받은 책인데, 밀리고 밀리다가 이제서야 읽었다. 수필집에 적힌 모습으로 판단하자면 피 선생님은 여러 한국 남자 문인들과는 다르게 음란하지도, 방탕하지도 않아서 좋다. 박완서는 '선생님의 생활이 수필처럼 담백하고 무욕하고 깨끗하고 마음 가는 대로 자유롭게 사셨기 때문'에 피 선생님이 돌아가실 때까지 현역 수필가였다고 추모글에 적었다. 수필처럼 살아간 선생님을 미리 알았더라면 모과(母科)인 국어교육과를 내가 좀 더 좋아했을지도 모른다.

그분은 작은 인연들을 소중히 했는데, 내가 참으로 부족한 부분이다. 작은 인연은 물론이고 꽤나 큰 인연까지 자연스럽게 끊어버리곤 한다. 누군가 날 기억해줬으면 하면서도 아무도 날 몰랐으면 한다. 그래서 이런 글도 페이스북에 올리는게 아니라 이런 곳에다가 올린다.

> 예전을 추억하지 못하는 사람은 그의 생애가 찬란하였다 하더라도 감추어 둔 보물의 세목(細目)과 장소를 잊어버린 사람과 같다. 그리고 기계와 같이 하루하루를 살아온 사람은 그가 팔순을 살았다 하더라도 단명한 사람이다. 우리가 제한된 생리적 수명을 가지고 오래 살고 부유하게 사는 방법은 아름다운 인연을 많이 맺으며, 나날이 작고 착한 일을 하고, 때로 살아온 자기 과거를 다시 사는 데 있는가 한다.
> 
> <span>- 장수, 피천득</span>

문득 생각해보면 언제 28년을 살았나, 막 잠에서 깬 것 같이 과거가 꿈처럼 느껴지곤 한다. 제대한 다음날 아침 21개월의 긴 꿈을 꾼 것 같고, 졸업할 때 되돌아보면 대학 생활이 그새 지나갔나, 죽기 전에 삶을 되돌아보면 분명 또 꿈처럼 느껴지리라. 선생님의 글을 읽고 내가 기계와 같이 하루하루를 살아온 사람인가 걱정이 든다. 내게 먼저 연락하는 사람들은 참 고맙다.

> 눈같이 포근하고 안개같이 아늑한 잠, 잠은 괴로운 인생에게 보내 온 아름다운 선물이다. 죽음이 긴 잠이라면 그것은 영원한 축복일 것이다.
> 
> <span>- 잠, 피천득</span>

한국 사람들은 나이가 늘어가는 것에 스트레스를 정말로 많이 받는다. 나는 나이가 들고 머리가 희끗해지는 것이 좋은데, 그 시간만큼 내게 지식과 지혜가 쌓일 것이라 믿기 때문이다(제발...). 연말연초엔 꼭 피 선생님의 말을 인용해야겠다.

> 지금 생각해보면 인생은 40부터도 아니요 40까지도 아니다. 어느 나이고 다 살 만하다.
> 
> <span>- 송년, 피천득</span>`,
    })
    */
}
