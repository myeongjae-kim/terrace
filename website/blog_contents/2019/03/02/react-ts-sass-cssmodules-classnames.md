# [웹] 책 ⟨리액트를 다루는 기술⟩의 todo-list + TypeScripts

책 [리액트를 다루는 기술](http://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=KOR&mallGb=KOR&barcode=9791160505238&orderClick=LEA&Kc=)을 TypeScript와 함께 공부하고 있습니다. 책은 JavaScript를 사용하지만, [`create-react-app`에 TypeScript를 얹어서](https://facebook.github.io/create-react-app/docs/adding-typescript) 예제 코드를 따라쳐보고 있습니다.

9장에서 Css Modules, Sass, classnames를 배우고, 10장에서 이 내용을 바탕으로 todo-list를 만듭니다. TypeScript를 적용한 상태로 10장의 프로젝트를 진행하기 위해 삽질한 것 보일러플레이트로 만들어 공유합니다.

<https://github.com/myeongjae-kim/react-ts-sass-cssmodules-classnames>

책에서는 react 설정 파일들을 eject해서 Css Modules과 Sass를 활성화하지만, [`create-react-app`이 v2.0이 되면서 그럴 필요가 없어졌습니다](https://velog.io/\@velopert/create-react-app-v2). Css Modules는 기본으로 지원하고, Sass는 [`node-sass`](https://www.npmjs.com/package/node-sass) 라이브러리를 추가함으로써 적용할 수 있습니다. 아래 커맨드만으로 10장 실습을 진행할 준비를 마칠 수 있습니다.

```bash
yarn create react-app styling-react --typescript
yarn add node-sass
yarn add classnames
yarn add @types/classnames
```

TypeScript를 사용해 구현한 todo-list입니다: <https://github.com/myeongjae-kim/learn-react-todo-list/tree/ch10>

P.S. Javascript가 아니라 Java**S**cript입니다. Typescript가 아니라 Type**S**cript입니다. P.S.는 Post Script의 약자입니다.