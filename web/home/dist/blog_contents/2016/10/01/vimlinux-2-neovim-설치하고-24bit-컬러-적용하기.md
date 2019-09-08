# [vim/Linux] 2. Neovim 설치하고 24bit 컬러 적용하기
## Ubuntu

우분투 16.04.1 verison을 사용합니다.

![우리는 UXTerm이나 Xterm이 아니라 Terminal을 사용합니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-7.44.01-PM.png)

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-7.44.17-PM.png)

## Terminal Color

우리가 쓰는 터미널 이름은 GNOME Terminal이라고 부릅니다. 우분투에 기본 터미널입니다. 처음 켜보면 약간 붉은 빛이 도는 바탕에 초록색으로 이름이 나오는데, 저는 마음에 들지 않아서 색을 바꿔 씁니다.

![이렇게 생겼습니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-7.52.06-PM.png)

[MJprofile.xml](https://myeongjae.kim/blog_contents/2016/10/MJProfile.xml)

위의 MJProfile.xml을 오른쪽 클릭해서 다른 이름으로 Downloads 폴더에 저장합니다. 그리고 터미널에 다음과 같이 입력합니다.

`$ dconf load /org/gnome/terminal/legacy/profiles:/ <~/Downloads/MJProfile.xml`{.bash}

이렇게 입력하면 다음과 같이 색깔이 변합니다.

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-8.36.01-PM.png)

 ~/.bashrc 파일을 열어서 PS1을 검색한 뒤 다음과 같이 바꿔주면 완성입니다.

`$ vi ~/.bashrc`{.bash}

`PS1='${debian_chroot:+($debian_chroot)}\[\033[36m\]\u\[\033[m\]@\[\033[32m\]\h:\[\033[33;1m\]\W\[\033[m\]\$ '`{.bash}

잘 못하겠으면 ~/.bashrc 파일을 덮어씌워도 됩니다.

[mjbashrc.zip](https://myeongjae.kim/blog_contents/2016/10/mjbashrc.zip)

다운받아서 Downloads 폴더에 압축을 푼 뒤 터미널에 다음 명령을 입력합니다.

`$ mv ~/.bashrc ~/.bashrc.bak`{.bash}

`$ mv ~/Downloads/mjbashrc ~/.bashrc`{.bash}

터미널을 껏다 켜면 색이 적용됩니다.

![계정 이름부분 색이 바뀌었다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-8.54.24-PM.png)

계정 이름부분 색이 바뀌었습니다..

## Neovim

Neovim을 사용하는 가장 큰 이유는 24bit True Color를 지원하기 때문입니다. 이 글의 연재 목적이 vim을 **예쁘고** 편리하게 쓰기 위함이기 입니다. 24bit True Color는 8bit나 16bit보다 훨씬 다양한 색을 표현할 수 있습니다.

![Neovim Logo](https://cdn.myeongjae.kim/blog/2016/10/logo@2x.png)

Neovim이란? vim은 유구한 역사와 전통을 자랑하는 코드 에디터이기 때문에 vim의 소스를 보면 20년 전의 C스타일을 볼 수 있습니다. 역사가 오래된 만큼 여러 사람의 손을 거쳤고 코드의 복잡도가 상당해서, **그냥 첨부터 새로 짜보자!** 한게 [Neovim 프로젝트](https://neovim.io/)입니다(기존의 vim보다 소스코드를 30%가량 줄였다고 합니다).

Neovim을 설치해봅시다. python을 함께 설치해야 나중에 python을 요구하는 플러그인을 쓸 때 편합니다.

```bash
sudo apt-get install software-properties-common
sudo apt-get install python-dev python-pip python3-dev python3-pip
sudo add-apt-repository ppa:neovim-ppa/unstable
sudo apt-get update
pip2 install --user neovim
pip3 install --user neovim
sudo apt-get install neovim
```

모든 설치를 완료하고 터미널에 nvim이라고 치면 Neovim이 실행됩니다.

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-9.15.56-PM.png)

![:echo has("python")과 :echo has("python3")을 입력해서 1이 나오면 설치가 제대로 된 것입니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-9.16.03-PM.png)

~/.bashrc에 다음 코드를 추가해주면 v만으로 Neovim을 실행할 수 있습니다.

`alias v='nvim'`{.bash}

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-9.25.47-PM.png)

## Vim Color

현재 vim의 색은 아까 설정한 터미널의 색을 그대로 가져다 씁니다. ANSI 표준 8가지 색인데, 우리는 더 예쁜 색을 쓸겁니다.

vim의 설정 파일은 `~/.vimrc`에 있습니다. 없으면 만들어줍시다.

`$ touch ~/.vimrc`{.bash}

그리고 `~/.vim/colors/`{.bash} 디렉토리에 `CodeSchool3.vim`파일을 넣어줍시다.

``` bash
$ cd ~
$ mkdir .vim
$ cd .vim
$ mkdir colors
```

[codeschool3-vim.zip](https://cdn.myeongjae.kim/blog/2016/10/CodeSchool3.vim_.zip)

(제작자 홈페이지: [http://astonj.com](http://astonj.com/))

Downloads 폴더에 압축을 풀고 다음과 같이 입력합니다.

`$ mv ~/Downloads/CodeSchool3.vim ~/.vim/colors/CodeSchool3.vim`{.bash}

그리고 아까 만들어두었던 `.vimrc`를 열어서 코드를 추가합니다.

`$ v ~/.vimrc`{.bash}

아래 두 줄을 추가합니다

```vim
colorscheme CodeSchool3
set termguicolors
```

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-9.37.48-PM.png)

저장하고 .bashrc를 열어보면 색이 영 좋지 않습니다.

![!!?](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-09-at-11.23.50-AM.png)

색이 이렇게 나오는 이유는, 사실 Neovim이 설정파일을 ~/.vimrc 에서 가져오지 않기 때문입니다. Neovim은 ~/.config/nvim/  디렉토리에서 설정을 읽어옵니다. 우리는 심볼릭 링크([하드링크와 심볼릭 링크에 대해서](http://eunguru.tistory.com/90))를 만들어 Neovim이 ~/.vimrc 와 ~./vim/colors/ 를 읽어오도록 할 것입니다.
```bash
$ cd ~/.config
$ mkdir nvim
$ ln -s ~/.vimrc ~/.config/nvim/init.vim
$ ln -s ~/.vim/colors/ ~/.config/nvim/colors/
```
이제 다시 Neovim으로 ~/.bashrc 를 열어보면 색이 제대로 나올 것입니다.

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-01-at-9.36.07-PM.png)

24bit의 colorscheme을 사용하는 것만으로도 예뻐보입니다. 수고하셨습니다.

### Reference

Ubuntu: [www.ubuntu.com](https://www.ubuntu.com/)

Neovim: [neovim.io](https://neovim.io/)
