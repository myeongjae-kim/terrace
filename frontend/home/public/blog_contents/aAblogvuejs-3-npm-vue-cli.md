배민 문제

스트링에 2진수 숫자가 들어있다(스트링은 '0'과 '1'로만 구성됨). 주어진 숫자가 홀수면 1을 빼고, 짝수면 2로 나눈다. 주어진 숫자가 0이 될 때까지 필요한 연산(빼기 or 나누기)의 횟수를 구하시오.

e.g.) 1101 -> 6회, 0 -> 0회, 000110 -> 4회


모든 공학의 공통 원칙
-> 복잡도를 줄여라, Complexity control.

Abstraction과 Implementation.

추상의 뜻.


pdf 19

pdf 25,26

Abstraction의 다른 이름은 Interface

pdf 22, 복잡도를 통제하는 방법.

pdf 31.



MVC 패턴, vue의 특징. 개발자가 데이터의 흐름에 집중하게 해준다.

디자인 패턴 책 94년에 나옴. 50쪽.

Vue, frontend framework.

Framework vs library?

제어의 역전.

토비의 스프링에서

프레임워크도 제어의 역전 개념이 적용된 대표적인 기술이다. 프레임워크는 라이브러리의 다른 이름이 아니다. 프레임워크는 단지 미리 만들어둔 반제품이나, 확장해서 사용할 수 있도록 준비된 추상 라이브러리의 집합이 아니다. 프레임워크가 어떤 것인지 이해하려면 라이브러리와 프레임워크가 어떻게 다른지 알아야 한다. 라이브러리를 사용하는 애플리케이션 코드는 애플리케이션 흐름을 직접 제어한다. 단지 동작하는 중에 필요한 기능이 있을 때 능동적으로 라이브러리를 사용할 뿐이다. 반면에 프레임워크는 거꾸로 애플리케이션 코드가 프레임워크에 의해 사용된다. 보통 프레임워크 위에 개발한 클래스를 등록해두고, 프레임워크가 흐름을 주도하는 중에 개발자가 만든 애플리케이션 코드를 사용하도록 만드는 방식이다. 최근에는 툴킷, 엔진, 라이브러리 등도 유행을 따라서 무작정 프레임워크라고 부르기도 하는데 이는 잘못된 것이다. 프레임워크에는 분명한 제어의 역전 개념이 적용되어 있어야 한다. 애플리케이션 코드는 프레임워크가 짜놓은 틀에서 수동적으로 동작해야 한다.


제어의 역전?

일반적으로 프로그램의 흐름은 main() 메소드와 같이 프로그램이 시작되는 지점에서 다음에 사용할 오브젝트를 결정하고, 결정한 오브젝트를 생성하고, 만들어진 오브젝트에 있는 메소드를 호출하고, 그 오브젝트 메소드 안에서 다음에 사용할 것을 결정하고 호출하는 식의 작업이 반복된다. 이런 프로그램 구조에서 각 오브젝트는 프로그램 흐름을 결정하거나 사용할 오브젝트를 구성하는 작업에 능동적으로 참여한다. 초기 UserDao를 보면 테스트용 main()메소드는 UserDao 클래스의 오브젝트를 직접 생성하고, 만들어진 오브젝트의 메소드를 사용한다. UserDao 또한 자신이 사용할 ConnectionMaker의 구현 클래스(예를 들면 DConnectionMaker)를 자신이 결정하고, 그 오브젝트를 필요한 시점에서 생성해두고, 각 메소드에서 이를 사용한다. 모든 오브젝트가 능동적으로 자신이 사용할 클래스를 결정하고, 언제 어떻게 그 오브젝트를 만들지를 스스로 관장한다. 모든 종류의 작업을 사용하는 쪽에서 제어하는 구조다.

제어의 역전이란 이런 제어 흐름의 개념을 거꾸로 뒤집는 것이다. 제어의 역전에서는 오브젝트가 자신이 사용할 오브젝트를 스스로 선택하지 않는다. 당연히 생성하지도 않는다. 또 자신도 어떻게 만들어지고 어디서 사용되는지를 알 수 없다. 모든 제어 권한을 자신이 아닌 다른 대상에게 위임하기 때문이다. 프로그램의 시작을 담당하는 main()과 같은 엔트리 포인트를 제외하면 모든 오브젝트는 이렇게 위임받은 제어 권한을 갖는 특별한 오브젝트에 의해 결정되고 만들어진다.

=> 결국 복잡도를 줄이기 위해서. Complexity control.
Vue는 프레임워크의 정의에 잘 부합한다.

65분 영상 보면, Single file component를 사용함. 우리도 그것을 바탕으로 프로젝트를 시작할 것. component의 코드들은 Vue framework에 의해서 사용된다. 우리가 컴포넌트 오브젝트를 생성하지않음. 제어의 역전.


오늘의 목표는 http-server를 이용해서 빌드된 홈페이지 띄워보기.


숙제: 도메인 구매. DNS에 대해서 공부하기. 65분 영상 끝까지 따라해보기.


프로젝트 큰 그림 보여주기. 글 쓰는데서부터 어떻게 프론트엔드로 보여지는지.

markdown 작성

pandoc 변환

변환한 html 찾아서 넣어주기 (Blog.vue)

json array에서 list로 보여준다.

여기까지 하면 npm run serve에서 등장한다.

빌드할 때 프리렌더링, 결과물에서 프리렌더링된 파일들 보여주고, javascript disable해서 보여주기

zsh 설치

```
sudo yum -y install zsh
```

https://github.com/zsh-users/zsh-completions

https://software.opensuse.org/download.html?project=shells%3Azsh-users%3Azsh-completions&package=zsh-completions

```
sudo yum -y install wget
```

```
cd /etc/yum.repos.d/
sudo wget https://download.opensuse.org/repositories/shells:zsh-users:zsh-completions/CentOS_7/shells:zsh-users:zsh-completions.repo
sudo yum -y install zsh-completions
```


git

```
sudo yum -y install git
```

oh my zsh

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```


```
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# zsh-autosuggestions
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

.zshrc

```
plugins=(
  git
  zsh-syntax-highlighting
  zsh-autosuggestions
)
```

<https://zetawiki.com/wiki/CentOS_npm_설치>


```
sudo yum -y install epel-release
```


```
git clone https://github.com/sindresorhus/pure
```

```
cd /usr/share/zsh/site-functions
sudo cp ~/pure/pure.zsh prompt_pure_setup
sudo cp ~/pure/async.zsh async
```

```
# .zshrc
autoload -U promptinit; promptinit
prompt pure
```

```
sudo yum -y install npm
```

https://cli.vuejs.org/guide/installation.html

```
sudo npm install -g @vue/cli
```

-g는 global, 다른 계정들도 사용할 수 있음.

```
vue
```

npm upgrade

https://velopert.com/1351

```
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
```

```
cd
mkdir terrace
mkdir frontend
vue create home
```


```
npm install http-server
```

port forwarding 추가
접속시도. 안됨. ???
방화벽에 포트 추가.

포트에 대해서. port의 뜻은?
low number port, high number port
22는 ssh, 80은 http

```
sudo firewall-cmd --zone=public --add-port=8080/tcp --permanent
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent
sudo firewall-cmd --reload
```


https://asciinema.org/a/VxmATX3owRxhSOcafHpPr4X6S

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