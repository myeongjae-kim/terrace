# [Blog/VueJS] 1. 블로깅 시스템 프로젝트 소개

이미 여러 블로깅 툴들이 있지만.. 제가 원하는 스펙을 가진 툴이 없어서 <a href="/blog/2018/09/18/블로깅-시스템을-만들었습니다/">블로깅 시스템을 직접 만들어버렸습니다</a>. 만들어놓고 보니 프로젝트 난이도가 적당하게 어려워서(혹은 쉬워서) 이제 막 공부를 시작하시는 분들이 해볼만한 프로젝트인 것 같기도 했습니다. 그래서, 블로깅 시스템 만들기를 연재합니다.

[소프트웨어 누가 이렇게 개떡같이 만든거야?](/blog/2016/02/26/소프트웨어-누가-이렇-개떡-같이-만든거야/) p252: 괴짜들의 전반적인 특성

> 괴짜들은 항상 자신들이 상황을 통제하고 있다는 느낌을 갖고 싶어합니다. 이런 욕구는 아마 초등학교 때부터 생겼을 겁니다. 운동도 잘 못하고 여자들도 그들에게는 말을 걸지 않았지만, 그들은 원할 때면 언제고 구석에 앉아서 큐빅 퍼즐을 마음대로 맞춰낼 수 있었습니다. 그리고 그들이 정말 하려는 것이 무엇이었는지를 깊숙이 파고들어가 보면 그것은 퍼즐을 사용설명서대로 마음껏 주무르는 것이었을 겁니다. 제가 1장에서 설명했듯이, 괴짜들은 수동 기어 자동차를 좋아합니다. 뭔가를 마음대로 제어할 때의 느낌을 좋아하기 때문입니다. 그 방법을 배워야 하는 것, 그리고 운전을 하면서 지속적으로 기어를 바꿔야 하는 것과 같은 부가적은 일에는 신경을 쓰지 않습니다. 그들은 이런 것이 상당히 괜찮은 트레이드오프라고(그리고 자동차라면 당연히 그래야 한다고)생각하며, 그걸 인식하고 그렇게 할 수  있을 정도로 똑똑하다는 것에 대해 스스로 자부심을 느낍니다. 그들도(추상적으로는) 어떤 사람들은 그들과 생각이 다르다는 것을 알지만 그런 사람의 비율은 그리 높지 않을 거라 생각합니다. 그리고 그런 사람들이 왜 그렇게 느끼는지에 대해서도 이해하지 못할 뿐 아니라, 그런 사람은 얼마 안 될 것이라 생각했다가 사실은 대부분의 사람들이 그렇다는 것을 알게 되면 깜짝 놀라고 맙니다.

특히 이런 분(저도포함..)들은 즐겁게 프로젝트를 진행하실 수 있을거에요.

### 글 쓰기

수동 기어 자동차를 직접 만들고 운행하는 프로젝트라고 비유하면 딱 맞을 것 같습니다.

1. 사용자가 markdown으로 문서를 작성한다.
2. markdown 문서를 html로 변환한다.
3. 변환한 html문서를 Blog component에 추가한다.
4. 웹사이트를 빌드한다.

### 매우 가벼운 웹사이트

이 블로깅 시스템은 Jekyll처럼 데이터베이스가 필요없습니다. 간단한 웹서버와 static page들만으로 동작합니다.

웹서버에서 프론트엔드까지 구현할텐데, 웹서버는 GET request에 따라서 파일만 보내주고 대부분의 연산은 프론트엔드에서 발생합니다. 그럼에도 불구하고 프론트엔드는 매우 가볍습니다.

![가볍습니다](https://cdn.myeongjae.kim/blog/2018/10/blog_size.png)

Javascript와 css파일 크기의 합이 250KB도 되지 않습니다. 3G network속도로 테스트해도 2.5초 안에 페이지를 로딩합니다.

### 프로젝트를 진행하면서 무엇을 배울 수 있습니까?

- html
- css
- javascript
- markdown
- http서버 작동원리
- VueJS
- NPM(Node Package Manager)
- VueJS
- SPA(Single Page App)
- SEO(Search Engine Optimization)
- DFS(Depth First Search)
- Automated Deployment
- DNS
- AWS
  - EC2
  - S3
  - CloudFront
  - Route 53
  - WAF
  - IAM
  - ...

### 굳이 블로그를 만들어야 하나요?

- [개발자가 블로그를 운영해야 할 이유](https://taegon.kim/archives/7107)
- [개발자라면, 블로그](https://hyunseob.github.io/2017/02/26/blog-for-developers/)
- [Every developer should have a blog](https://medium.freecodecamp.org/every-developer-should-have-a-blog-heres-why-and-how-to-stick-with-it-5fd55a247fbf)
- [5 Reasons Why You Should Blog as a Software Developer](https://devdactic.com/blog-as-a-software-developer/)

### 프로젝트를 시작하기 전에 공부해야 할 것

- 생활코딩
  - [HTML](https://opentutorials.org/course/3084)
  - [CSS](https://opentutorials.org/course/3086)
  - [JavaScript](https://opentutorials.org/course/3085)
  - [HTTP](https://opentutorials.org/course/3385/21673)
  - [Posix CLI](https://opentutorials.org/module/3747)
- [구닥다리 공룡을 위한 오늘날의 JavaScript](https://steemit.com/javascript/@march23hare/javascript)
- VueJS
  - [The Vue Tutorial for 2018 - Learn Vue 2 in 65 Minutes](https://www.youtube.com/watch?v=78tNYZUS-ps)
  - [VueJS 가이드](https://kr.vuejs.org/v2/guide/)
- 운영체제의 파일시스템을 조작할 수 있는 언어 하나(e.g. c, c++, python, golang, java, c#, ...)

아래는 2018년도의 VueJS의 위상을 확인할 수 있는 영상입니다.

<iframe class="center shadow" width="560" height="315" src="https://www.youtube.com/embed/TRJMT9yjONQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>