# [웹] Vue를 먼저 공부한 백엔드 개발자의 입장에서 본 React

본래 Vue에 익숙하지만, 일을 하면서 React가 필요할 것 같아 오늘 하루 [React를 공부](https://www.youtube.com/watch?v=Ke90Tje7VS0)했습니다. 받은 느낌을 한 마디로 요약하자면, React와 Vue는 C++과 Java같습니다. Vue가 React보다 추상 수준이 높습니다.

클래스의 Destructor가지고 예를 들 수 있겠는데, [C++은 destructor에 virtual을 붙이지 않으면 upcasting
 상황에서 메모리 누수의 가능성이 있습니다](https://stackoverflow.com/a/461224). [vim-snippets](https://github.com/honza/vim-snippets)의 [cpp class snippet](https://github.com/honza/vim-snippets/blob/master/snippets/cpp.snippets)은 빼먹지 말라고 destructor에 virtual을 자동으로 붙여주기까지 합니다.

```cpp
class sample {
  public:
    sample();
    virtual ~sample(); // desturctor에 virtual 키워드가 자동으로 붙습니다.
   
  protected:
    m_; /*!< Member description */
};
```

반면 Java는 destructor가 **없습니다**.

아래는 Wikipedia에서 [C++의 철학](https://en.wikipedia.org/wiki/C%2B%2B#Philosophy)에서 가져왔습니다.

> - Allowing a useful feature is more important than preventing every possible misuse of C++.

때문에 할 수 있지만 권장하지 않는 것(다중상속)도 있고, 안 할 수 있지만 꼭 해줘야 하는 것(destructor의 virtual)도 있습니다.

다음은 [ReactJS vs Angular5 vs Vue.js — What to choose in 2018?](https://medium.com/@TechMagic/reactjs-vs-angular5-vs-vue-js-what-to-choose-in-2018-b91e028fa91d#a73e)에서 가장 많이 highlight를 받은 문장입니다.

> - React is unopinionated — meaning that developers sometimes have too much choice.

제가 꽤나 적절한 느낌을 받은 것 같은 느낌입니다.

특히 상태관리 부분에서, React는 `this.setState()`를 수동으로 호출해야 하지만, Vue는 컴포넌트 내부의 상태를 자동으로 관리하기 때문에 `this.setState()`같은 메서드가 **없습니다**. Vue 공식 문서에서는 [React + Mobx를 좋아한다면 Vue를 쓰는 것이 논리적으로 올바른 순서](https://vuejs.org/v2/guide/comparison.html#With-MobX)라고 말 할 정도입니다. React는 Vue에 비해서 신경써야 할 것들이 많습니다. React는 library고 Vue는 framework이기 때문에 당연한 건지도 모르겠습니다.

혹시 Library와 Framework의 차이를 아시나요?

> 프레임워크는 단지 미리 만들어둔 반제품이나, 확장해서 사용할 수 있도록 준비된 추상 라이브러리의 집합이 아니다. 라이브러리를 사용하는 애플리케이션 코드는 애플리케이션 흐름을 직접 제어한다. 단지 동작하는 중에 필요한 기능이 있을 때 능동적으로 라이브러리를 사용할 뿐이다. 반면에 프레임워크는 거꾸로 애플리케이션 코드가 프레임워크에 의해 사용된다. 보통 프레임워크 위에 개발한 클래스를 등록해두고, 프레임워크가 흐름을 주도하는 중에 개발자가 만든 애플리케이션 코드를 사용하도록 만드는 방식이다. 최근에는 툴킷, 엔진, 라이브러리 등도 유행을 따라서 무작정 프레임워크라고 부르기도 하는데 이는 잘못된 것이다. 프레임워크에는 분명한 [제어의 역전 ^\[1\]^ ](#제어의-역전){#fn-1} 개념이 적용되어 있어야 한다. 애플리케이션 코드는 프레임워크가 짜놓은 틀에서 수동적으로 동작해야 한다.
>
>\- *토비의 스프링*, 이일민 지음

이 관점에서는 React도 framework이긴 한데, [reactjs.org](http://reactjs.org)에서는 library라고 되어있고, 여튼.

또한 Vue는 React보다 좀 더 중앙집권화된 관리를 받습니다. [reactjs.org](http://reactjs.org)는 오직 React library에 대한 내용만 있는 반면, [vuejs.org](http://vuejs.org)는 Vue framework뿐만 아니라 ecosystem에 대한 내용도 있습니다. Vue에서 공식적으로 밀어주는 라이브러리가 있는 것입니다.

역시나 상태관리를 예로 들자면,

- Vue: Vuex
- React: Redux, Mobx, Unstated...

중앙에서 생태계를 관리를 하는 것엔 일장일단이 있습니다. 애플의 앱스토어와 구글의 플레이스토어처럼. 사용자 입장에선 호환성 걱정을 덜 해도 되기 때문에 Vue가 맘편히 쓰기 좋을 텐데, 호환성을 보장해야 하니 라이브러리 업데이트 속도가 느릴 수도 있겠습니다.

Vue에 익숙한 상태에서 React에 대한 느낌을 적었는데, React를 먼저 배운 사람의 Vue에 대한 생각도 듣고싶어서 찾아보니 [훌륭한 글](https://ahnheejong.name/articles/why-i-prefer-react-over-vuejs/)을 발견했습니다. 이 분도 저와 비슷한 느낌을 받은 것 같았고, React의 손을 들어줬습니다.

백엔드 개발자라서 frontend framework의 경쟁은 강 건너 불구경인데... [작년(2018) 통계](https://2018.stateofjs.com/front-end-frameworks/overview/)를 보면 역시나 [React](https://2018.stateofjs.com/front-end-frameworks/react/)가 1위고, [Vue](https://2018.stateofjs.com/front-end-frameworks/vuejs/)에 대한 긍정적인 반응도 꾸준히 늘고 있습니다. 미래에는 C++과 Java처럼 각자의 영역이 꽤나 분명하게 나눠지지 않을까요? 확실한 건, [modern web frontend 입문자](https://steemit.com/javascript/@march23hare/javascript)에게는 Vue가 React보다 진입장벽이 낮습니다.

Vue와 React 자체뿐만 아니라 더 큰 단위로 생각해볼 거리도 많습니다.

Typescript와의 호환이라든지

- [https://medium.com/\@FourwingsY/react와-typescript의-미묘한-불일치-b8f0e2bfe05d](https://medium.com/\@FourwingsY/react%EC%99%80-typescript%EC%9D%98-%EB%AF%B8%EB%AC%98%ED%95%9C-%EB%B6%88%EC%9D%BC%EC%B9%98-b8f0e2bfe05d)
- [https://www.slideshare.net/HeejongAhn/typescript-flow-81799404](https://www.slideshare.net/HeejongAhn/typescript-flow-81799404)

Next.js라든지

- [https://blueshw.github.io/2018/04/15/why-nextjs/](https://blueshw.github.io/2018/04/15/why-nextjs/)
- [https://medium.com/\@deptno/next-js-with-typescript-타입스크립트-71c7eae55006](https://medium.com/\@deptno/next-js-with-typescript-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-71c7eae55006)

Nuxt.js 등등

- [https://medium.com/\@yoonhoGo/nuxt-2-0-nuxt-edge-typescript-d85c176a01a](https://medium.com/\@yoonhoGo/nuxt-2-0-nuxt-edge-typescript-d85c176a01a)

빽이든 후론트든 다 잘 하고싶네요.

---

### [\[1\] 제어의 역전](#fn-1)

> 일반적으로 프로그램의 흐름은 main() 메소드와 같이 프로그램이 시작되는 지점에서 다음에 사용할 오브젝트를 결정하고, 결정한 오브젝트를 생성하고, 만들어진 오브젝트에 있는 메소드를 호출하고, 그 오브젝트 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 작업이 반복된다. 이런 프로그램 구조에서 각 오브젝트는 프로그램 흐름을 결정하거나 사용할 오브젝트를 구성하는 작업에 능동적으로 참여한다. 초기 UserDao를 보면 테스트용 main()메소드는 UserDao 클래스의 오브젝트를 직접 생성하고, 만들어진 오브젝트의 메소드를 사용한다. UserDao 또한 자신이 사용할 ConnectionMaker의 구현 클래스(예를 들면 DConnectionMaker)를 자신이 결정하고, 그 오브젝트를 필요한 시점에서 생성해두고, 각 메소드에서 이를 사용한다. 모든 오브젝트가 능동적으로 자신이 사용할 클래스를 결정하고, 언제 어떻게 그 오브젝트를 만들지를 스스로 관장한다. 모든 종류의 작업을 사용하는 쪽에서 제어하는 구조다.
>
>제어의 역전이란 이런 제어 흐름의 개념을 거꾸로 뒤집는 것이다. 제어의 역전에서는 오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다. 당연히 생성하지도 않는다. 또 자신도 어떻게 만들어지고 어디서 사용되는지를 알 수 없다. 모든 제어 권한을 자신이 아닌 다른 대상에게 위임하기 때문이다. 프로그램의 시작을 담당하는 main()과 같은 엔트리 포인트를 제외하면 모든 오브젝트는 이렇게 위임받은 제어 권한을 갖는 특별한 오브젝트에 의해 결정되고 만들어진다.
>
>\- *토비의 스프링*, 이일민 지음