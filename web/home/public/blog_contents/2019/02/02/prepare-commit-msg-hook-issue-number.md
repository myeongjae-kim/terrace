# [Git] Commit 메세지에 자동으로 issue number 추가하기

본래 [husky로 손쉽게 git hook 관리하기 | Huskyhoochu](https://www.huskyhoochu.com/npm-husky-the-git-hook-manager)라는 글에 있던 내용이었습니다. 저 블로그가 갑자기 접속이 안돼서.. 같은 기능을 하는 다른 스크립트를 찾아 제 블로그에 백업용으로 올립니다.

```sh
#!/bin/sh
# .git/hooks/prepare-commit-msg
#
# Automatically add branch name and branch description to every commit message except merge commit.
# https://stackoverflow.com/a/18739064
#

COMMIT_EDITMSG=$1

addBranchNumber() {
  NAME=$(git branch | grep '*' | sed 's/* //') 
	ISSUE_NUMBER=`echo $NAME | cut -d '-' -f1`
  DESCRIPTION=$(git config branch."$NAME".description)
  echo "[#$ISSUE_NUMBER] $(cat $COMMIT_EDITMSG)" > $COMMIT_EDITMSG
  if [ -n "$DESCRIPTION" ] 
  then
     echo "" >> $COMMIT_EDITMSG
     echo $DESCRIPTION >> $COMMIT_EDITMSG
  fi 
}

MERGE=$(cat $COMMIT_EDITMSG|grep -i 'merge'|wc -l)

if [ $MERGE -eq 0 ] ; then
  addBranchNumber
fi
```

브랜치 이름을 '숫자-브랜치이름'형식으로 생성하고 아래 스크립트를 `.git/hooks/prepare-commit-msg`에 저장한 뒤 실행 가능한 권한(0755 등등)을 부여하고 해당 브랜치에서 `git commit`을 하면 커밋 메세지에 자동으로 `[#숫자]`를 추가합니다.

에를들어 브랜치 이름이 `1-sample-branch`라면, `git commit`을 할 때

```
[#1] 
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch 1-sample-branch
# Your branch is up to date with 'origin/1-sample-branch'.
#
# Changes to be committed:
```

이런식으로 자동으로 `[#1]`이 붙습니다.

---

구글의 저장된 페이지로도 접속이 안 됐는데, 브라우저에서 javascript를 disable하고 접속하니 보입니다.

- husky로 손쉽게 git hook 관리하기 | Huskyhoochu (<https://webcache.googleusercontent.com/search?q=cache:PQzS_HhcjBkJ:https://www.huskyhoochu.com/npm-husky-the-git-hook-manager+&cd=1&hl=ko&ct=clnk&gl=kr>)
- github 하나로 1인 개발 워크플로우 완성하기: 이론 편 | Huskyhoochu (<https://webcache.googleusercontent.com/search?q=cache:Hjnh8Hm7z6wJ:https://www.huskyhoochu.com/issue-based-version-control-101+&cd=1&hl=ko&ct=clnk&gl=kr>)
- github 하나로 1인 개발 워크플로우 완성하기: 실전 편 | Huskyhoochu (<https://webcache.googleusercontent.com/search?q=cache:pO0lLE31p7kJ:https://www.huskyhoochu.com/issue-based-version-control-201+&cd=2&hl=ko&ct=clnk&gl=kr>)

이것도 언제 막힐지 몰라 pdf로 박제했습니다. 얼른 Huskychoocho님의 블로그가 쾌차하길 빌겠습니다.

- [pdf: husky로 손쉽게 git hook 관리하기 | Huskyhoochu](https://cdn.myeongjae.kim/blog/2019/01/npm-husky-the-git-hook-manager.pdf)
- [pdf: github 하나로 1인 개발 워크플로우 완성하기: 이론 편 | Huskyhoochu](https://cdn.myeongjae.kim/blog/2019/01/issue-based-version-control-101.pdf)
- [pdf: github 하나로 1인 개발 워크플로우 완성하기: 실전 편 | Huskyhoochu](https://cdn.myeongjae.kim/blog/2019/01/issue-based-version-control-201.pdf)