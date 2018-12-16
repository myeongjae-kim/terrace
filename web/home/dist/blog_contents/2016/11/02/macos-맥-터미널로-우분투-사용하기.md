# [macOS] 맥 터미널로 우분투 사용하기

컴퓨터공학을 공부하게 되면 리눅스 환경에서 작업할 일이 꼭 생깁니다. 윈도우 사용자든 맥 사용자든 가상 운영체제를 설치해서 쓰게되는데 (VMWare, Parallels, Virtual Box...), 맥을 사용하고 있다면 좀 더 편하게 가상 운영체제 환경에서 작업할 수 있습니다.

거창한 내용은 아니고, ssh를 사용하면 맥 터미널에서 우분투에 접속할 수 있습니다.

# 1. ssh 설치하기

우분투의 터미널에서 다음과 같이 입력합니다

`$ sudo apt-get install ssh`{.bash}

그리고  `ifconfig`{.bash} 를 입력해 아이피를 알아봅시다. 저는 Parallels를 사용하고 있고, 기본 설정 그대로 쓰고 있습니다.

![ifconfig](https://cdn.myeongjae.kim/blog/2016/11/Screen-Shot-2016-11-02-at-10.46.37-PM.png){width=800px}

커서가 칠해져 있는 부분이 IP입니다. 이제 맥 터미널에서 ssh username@ip 라고 입력하면 됩니다. 

`$ ssh mjae@10.211.55.12`{.bash}

![ssh](https://cdn.myeongjae.kim/blog/2016/11/Screen-Shot-2016-11-02-at-10.49.56-PM.png){width=800px}

우분투 로그인 비밀번호를 입력하면 접속할 수 있습니다. 터미널 첫째줄을 보면 Mjae@MJMac인데 우분투에 접속한 뒤에는 mjae@ubuntu로 바뀌었습니다. 다시 맥으로 돌아오려면 Ctrl+D를 누르면 됩니다.

# 2. 한글 사용하기

아무 설정도 하지 않았다면 한글이 ??????????로 깨져서 보일 것입니다. 한글 입력도 되지 않습니다.

![??????100??????????](https://cdn.myeongjae.kim/blog/2016/11/Screen-Shot-2016-11-02-at-10.56.17-PM.png){width=800px}

이때  export LC_ALL="en_US.UTF-8" 을 입력하면 한글이 보이고 입력도 됩니다. ~/.bashrc에 추가하면 매번 입력하지 않아도 자동으로 적용됩니다.

![갓TF-8](https://cdn.myeongjae.kim/blog/2016/11/Screen-Shot-2016-11-02-at-10.59.24-PM.png){width=800px}

# 3. 편하게 우분투 접속하기

맥 터미널에서 우분투에 접속할 때마다 매번  ssh mjae@10.211.55.12 를 입력하는 대신 alias를 이용해서 sshu에 매핑했습니다. 맥의 ~/.bash_profile에 다음 코드를 추가합시다.

`alias sshu='ssh mjae@10.211.55.12'`{.bash}

이제 `sshu`만 입력하면   `ssh mjae@10.211.55.12`{.bash} 이 입력이 됩니다

ssh-key를 이용하면 비밀번호 입력 없이도 우분투에 접속할 수 있습니다([생활코딩](https://opentutorials.org/module/432/3742)).

맥 터미널에 다음과 같이 입력합시다

`$ ssh-keygen -t rsa`{.bash}

입력하면  `Enter file in which to save the key (/Users/username/.ssh/id_rsa):` 라고 나오면서 사용자의 입력을 기다리는데, 아무것도 입력하지 말고 엔터키를 누릅시다. 그러면  `Enter passphrase (empty for no passphrase):` 라고 하면서 또 입력을 기다리는데, 다시 한번 엔터키를 누릅시다. `Enter same passphrase again:` 이라고 나오면 역시나 엔터키를 누릅니다. 이제 `~/.ssh` 디렉토리에 key가 생성되었습니다

![.ssh](https://cdn.myeongjae.kim/blog/2016/11/Screen-Shot-2016-11-02-at-11.12.15-PM.png){width=800px}

`id_rsa`는 비밀키고 `id_rsa.pub`는 공개키입니다. 비밀키는 남들에게 절대로 노출되면 안되므로 다음과 같이 권한 설정을 해줍시다.

`$ chmod 700 ~/.ssh`{.bash}

`$ chmod 600 ~/.ssh/id_rsa`{.bash}

비유컨대 비밀키는 열쇠고 공개키는 자물쇠입니다. 열쇠에 맞는 자물쇠는 여러사람이 가지고 있어도 상관없지만 열쇠는 오직 저만 가지고 있어야 합니다. 이제 우분투에 자물쇠를 달아줄 차례인데, 맥에서 생성한 `id_rsa.pub`의 내용을 우분투의 `~/.ssh/authorized_key` 파일에 추가하면 됩니다..

공개키를 우분투의 홈폴더로 전송합시다

`$ scp ~/.ssh/id_rsa.pub mjae@10.211.55.12:~/id_rsa.pub`{.bash}

아마 우분투에는 `.ssh` 디렉토리가 없을텐데, 우분투에 접속해서 디렉토리를 만들고 그 안에 `authorized_keys` 파일을 만들어 `id_rsa.pub`를 추가합시다.

```bash
$ sshu
$ mkdir ~/.ssh
$ cat ~/id_rsa.pub >> ~/.ssh/authorized_keys
$ rm ~/id_rsa.pub
```

이제 맥에서 우분투에 접속할 때 비밀번호를 묻지 않고 바로 접속이 되는 것을 볼 수 있습니다.

![바로 접속이 되었습니다.](https://cdn.myeongjae.kim/blog/2016/11/Screen-Shot-2016-11-02-at-11.27.00-PM.png){width=800px}

`ssh-key` 관련 자세한 내용은 [생활코딩](https://opentutorials.org/module/432/3742)에서 볼 수 있습니다.