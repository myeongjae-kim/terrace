# [Terrace] 3. http 서버 만들기

오프라인 모임에서 뭘 할수있나? 현재 어디까지 진행했는지 보는것, 그리고 어려운 것 이해 안 되는 것 대답하기.

이전 시간까지 했던 것: 개발환경 셋업, 웹서버 만들어서 테스트해보기

http-server 설치해서 dist 디렉토리에 있는 파일들 접근해보기.

dist안에 임의의 텍스트 파일 만들어서 http-server를 통해 브라우저로 접근하기

golang으로 http서버 만드는 것 보여주기.

go언어 설치하는 것 보여주기. $PATH의 정체.

go언어로 간단한 웹서버 짜기


Go언어 설치 영상

https://asciinema.org/a/vQtDdhwM4Yp2lEaaEMETVcS1K

```
sudo yum -y install wget
wget https://dl.google.com/go/go1.11.1.linux-amd64.tar.gz
tar -xzvf go1.11.1.linux-amd64.tar.gz
sudo mv go /usr/local/
```

```bash
export PATH=/usr/local/go/bin:$PATH
```

Vim 설정

https://asciinema.org/a/qBMF7yvND6IbGyY7CxfmT8D4M

python3 설치: http://snowdeer.github.io/python/2018/02/20/install-python3-on-centos/

```
sudo yum install -y https://centos7.iuscommunity.org/ius-release.rpm
sudo yum install -y python36u python36u-libs python36u-devel python36u-pip
which python3.6
cd /usr/bin
sudo rm python3
sudo rm pip 
sudo cp python3.6 python3
sudo cp pip3.6 pip
```

neovim 설치
```bash
wget https://github.com/neovim/neovim/releases/download/v0.3.1/nvim.appimage
chmod 755 ./nvim.appimage
./nvim.appimage --appimage-extract
cd squashfs-root
sudo mv usr/bin/nvim /usr/bin/nvim
sudo mv usr/share/nvim /usr/share/nvim
```

vundle 설치
```
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
```

vim config 설치
```
cd ~/.config
git clone https://github.com/hrzon/mjVimPack
mv mjVimPack nvim
nvim
:PluginInstall
:UpdateRemotePlugins
:q
nvim
```

```bash
sudo pip install neovim # for remove UltiSnip error
```

아래 줄을 .zshrc에 추가한다.
```
export EDITOR='/usr/local/bin/nvim'
alias v="nvim"
```

웹서버 만드는 영상

npm build해서 나온 결과물 web_root로 옮기고, 방금 만든 웹서버 실행해서 접속 로그 보여주는 영상

```
cd terrace
mkdir src
cd src
v main.go
```

```go
package main

import (
	"fmt"
	"io/ioutil"
  "log"
  "net/http"
)

const (
  WebRoot = "./web_root/"
)

func rootHandler(w http.ResponseWriter, r *http.Request) {
	// when request is root, send index.html
	// otherwise, send the file

	log.Println(r.URL.Path)

	path := r.URL.Path[len("/"):]

	source, err := ioutil.ReadFile(WebRoot + path)
	if err != nil {
		source, err = ioutil.ReadFile(WebRoot + path + "/index.html")
		if err != nil {
			// Redirect to 404 page
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprint(w, err)
			log.Println("(rootHandler) ", err)
			return
		}
	}

	// Set content type as css if required file's extension is css
	if len(path) >= 4 && path[len(path)-4:] == ".css" {
		w.Header().Set("Content-Type", "text/css")
	}

	fmt.Fprint(w, string(source))
	log.Println("(rootHandler) The requested file has been sent: ", WebRoot+path)
}

func main() {
    http.HandleFunc("/", rootHandler)
    log.Fatal(http.ListenAndServe(":80", nil))
}
```

핸들러의 `r`을 잘 탐색해보면 많은 정보들을 얻을 수 있음. 클라이언트에서 서버에 보내온 정보들.

fprintf, C언어

root 핸들러의 동작방식?

해당 URI의 리소스가 존재하면, 그 리소스 리턴.
없으면 리소스+"/index.html" 리턴. 이것도 없으면 에러 리턴

index.html이라는 이름의 이유. (https://www.tecmint.com/disable-apache-directory-listing-htaccess/ 첫 번째 사진)


```
cd terrace/frontend/home
npm run build
cp -r dist ../../web_root
cd ../../
sudo ./bin/terrace
sudo setcap CAP_NET_BIND_SERVICE=+eip ./bin/terrace
./bin/terrace
```

80번 포트 low port라서 실행 안되는거 보여주고, sudo로 실행시키기.

보안 결함 설명, htop으로 root계정으로 돌고있는 서버 보여주기

low port 실행 권한 주기

실행하고 htop으로 확인

그러나 어쨌든 sudoer이기 때문에 위험하다.

내 ec2 접속해서 web계정으로 돌고있는 terrace 보여주기


`update.sh` 만들어서 `npm build`하고 프로젝트 루트의 `web_root` 지우고 `dist`를 `web_root`로 옮김

(쉘스크립트에 대해서 : https://mug896.github.io/bash-shell/)

```bash
# update.sh in frontend directory
cd home
npm run build
rm -rf ../../web_root
cp -r dist ../../web_root
```

```makefile
# makefile in terrace directory
run:
	./bin/terrace

build:
	go build -x -o ./bin/terrace ./src
	sudo setcap CAP_NET_BIND_SERVICE=+eip ./bin/terrace
```

https://wiki.kldp.org/KoreanDoc/html/GNU-Make/GNU-Make.html#toc3

GNU Make 강좌, 1997년 8월 28일

```
- (Project Root)
  - bin
  - src
  - frontend
    - home
      - dist
  - web_root
```

숙제: 디자인 생각해오기