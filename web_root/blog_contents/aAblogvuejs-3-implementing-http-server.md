# [Terrace] 3. http 서버 만들기

http-server 설치해서 dist 디렉토리에 있는 파일들 접근해보기.

dist안에 임의의 텍스트 파일 만들어서 http-server를 통해 브라우저로 접근하기

golang으로 http서버 만드는 것 보여주기.

index.html이라는 이름의 이유. (https://www.tecmint.com/disable-apache-directory-listing-htaccess/ 첫 번째 사진)

쉘스크립트로 dist폴더를 프로젝트 루트로 복사해서 이름을 web_root으로 바꾸기

80번 포트 low port라서 실행 안되는거 보여주고, sudo로 실행시키기.

보안 결함 설명, htop으로 root계정으로 돌고있는 서버 보여주기

low port 실행 권한 주기

실행하고 htop으로 확인

그러나 어쨌든 sudoer이기 때문에 위험하다.

내 ec2 접속해서 web계정으로 돌고있는 terrace 보여주기