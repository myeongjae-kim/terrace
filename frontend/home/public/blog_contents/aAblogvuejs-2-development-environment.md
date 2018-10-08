# [Terrace] 2. 개발환경 셋팅

CentOS에 Desktop Environment 설치해서 사용하려고 합니다. 오프라인으로 만나서 진행하는 분들도 있는데, 이 때 개발환경을 통일해야 원활한 진행이 가능할 것 같아서 리눅스를 선택했습니다. CentOS를 고른 이유는 AWS EC2에서 쓸 Amazon OS가 CentOS를 기반으로 만들어졌기 때문입니다.

편집기는 Visual Studio Code를 사용합니다. 추천하는 확장 프로그램은 다음과 같습니다.

- [Go]()
- [Markdown Preview Enhanced]()
- [Vetur]()
- [Vim]()(익숙하신 분들만)

Virtul Machine에 [CentOS]()를 설치합니다. 저는 Parallels를 사용했습니다. 무료 툴인 VirtualBox나 VMWare도 좋습니다.

(Desktop Environment 설치 영상)

Desktop Environment를 설치합니다. KDE도 좋고 GNOME도 좋은데, 저는 화면을 조금 더 넓게 쓸 수 있는 GNOME을 골랐습니다.

(npm과 vue-cli 설치 영상)

npm과 vue-cli를 설치합니다.

(npm과 vue-cli 설치 영상)

저는 프로젝트 디렉토리를 다음과 같이 설정했습니다.

```
- (Project Root)
  - frontend
    - home
```

`frontend` 디렉토리 안에서 vue-cli로 home 프로젝트를 생성했습니다.

`(Proejct Root)` 디렉토리 밑에는 서버와 배포시스템이 추가됩니다. `frontend` 디렉토리 밑에는 문서 변환과 [프리렌더링](/blog/2018/09/23/single-page-app의-search-engine-optimizaion과-vuejs/) 프로그램이 추가될 것입니다.

기본 뷰 홈페이지에 자기 이름 적어서 띄워보기.

빌드하기.