# [웹] 책 ⟨리액트를 다루는 기술⟩의 Counter + TypeScript

[\[웹\] 책 ⟨리액트를 다루는 기술⟩의 todo-list + TypeScripts](/blog/2019/03/02/react-ts-sass-cssmodules-classnames/) 참고.

JavaScript에 Type만 추가했을 뿐인데 상당히 복잡해졌습니다. 물론 다 알고 나면 크게 어렵지 않겠지만, 공부하는 입장에선 눈이 돌아가네요. <https://github.com/piotrwitek/react-redux-typescript-guide>을 참고해서 구현했습니다. Redux를 깊게 이해하지 못한 상태에서 TypeScript를 적용하려고 하니 어려웠던 것 같습니다.

컴퓨터과학이 추상화의 학문이라는 말에 100% 동감하면서도, 제네릭 프로그래밍을 제대로 공부해볼 생각을 지금까지 안했던 게 신기합니다. TypeScript 코드를 까보면 죄다 제네릭 프로그래밍 코드인데, 얼추 보면 무슨말 하는 지 알겠지만 제게 저런 코드를 작성하라고 하면... 물론 그럴 사람은 없겠지만요.

Counter 실습을 TypeScript로 진행하면서 가장 많은 도움을 받은 라이브러리가 [typesafe-actions](https://github.com/piotrwitek/typesafe-actions)입니다. Redux 개발자 도구 사용을 위해서 [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension)의 도움도 받았습니다.

실습 진행 과정마다 브랜치를 만들어놨습니다.

1. [단일 리듀서를 사용하는 카운터 구현]()
1. [복수의 리듀서를 사용하는 카운터 구현]()
1. [redux 개발자 도구를 사용하도록 라이브러리 추가]()
1. [멀티 카운터 구현]()

제네릭 프로그래밍과 함수형 프로그래밍의 힘을 웹 프론트엔드를 공부하면서 제대로 느끼고 있습니다. [알고리즘 산책: 수학에서 제네릭 프로그래밍까지](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791160504880&orderClick=LAG&Kc=)를 공부해보고, 좋은 책인 것 같으면 포스팅 하겠습니다.