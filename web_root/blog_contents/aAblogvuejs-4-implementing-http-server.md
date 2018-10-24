# [Terrace] 3. http 서버 만들기

http-server 설치해서 dist 디렉토리에 있는 파일들 접근해보기.

dist안에 임의의 텍스트 파일 만들어서 http-server를 통해 브라우저로 접근하기

golang으로 http서버 만드는 것 보여주기.

go언어 설치하는 것 보여주기. $PATH의 정체.

go언어로 간단한 웹서버 짜기

```go
package main

import (
    "fmt"
    "log"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hi there, I love %s!", r.URL.Path[1:])
}

func main() {
    http.HandleFunc("/", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

@go build -x -o ./bin/terrace ./src


`r`을 잘 탐색해보면 많은 정보들을 얻을 수 있음. 클라이언트에서 서버에 보내온 정보들.

fprintf, C언어

root 핸들러의 동작방식?

해당 URI의 리소스가 존재하면, 그 리소스 리턴.
없으면 리소스+"/index.html" 리턴. 이것도 없으면 에러 리턴

```go
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
```


index.html이라는 이름의 이유. (https://www.tecmint.com/disable-apache-directory-listing-htaccess/ 첫 번째 사진)

쉘스크립트로 dist폴더를 프로젝트 루트로 복사해서 이름을 web_root으로 바꾸기
```
- (Project Root)
  - bin
  - src
  - frontend
    - home
      - dist
  - web_root
```


80번 포트 low port라서 실행 안되는거 보여주고, sudo로 실행시키기.

보안 결함 설명, htop으로 root계정으로 돌고있는 서버 보여주기

low port 실행 권한 주기

실행하고 htop으로 확인

그러나 어쨌든 sudoer이기 때문에 위험하다.

내 ec2 접속해서 web계정으로 돌고있는 terrace 보여주기


숙제: 디자인 생각해오기
