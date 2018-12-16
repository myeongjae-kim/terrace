# [vim/Linux] 3. vimrc 기본설정

## .vimrc

.vimrc는 홈폴더(~/) 바로 밑에 있는 파일입니다. Neovim은 ~/.config/nvim/init.vim 파일을 쓰지만 많은 vim이 .vimrc를 사용하므로 우리는 [이전 글](/#/blog/2016/10/01/vimlinux-2-neovim-%EC%84%A4%EC%B9%98%ED%95%98%EA%B3%A0-24bit-%EC%BB%AC%EB%9F%AC-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0/)에서 하드링크를 통해 .vimrc와 init.vim을 연결했습니다. 이 글에서는 vim을 편하게 쓰기 위한 첫번째 단계로 .vimrc 파일을 설정합니다.

![지금까지 작성한 .vimrc](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-02-at-9.46.38-PM-1024x640.png)

오늘까지 입력할 .vimrc는 다음과 같습니다.

```vim
" Basic Settings
colorscheme CodeSchool3
set termguicolors
syntax on
set number
set relativenumber
set hlsearch
set ignorecase
set tabstop=4
set softtabstop=4
set shiftwidth=4
set expandtab
autocmd FileType make setlocal noexpandtab
 
" Key Settings
nnoremap <F2> :set invpaste paste?<CR>
set pastetoggle=<F2>
let mapleader = ","
nnoremap <leader>q :bp<CR>
nnoremap <leader>w :bn<CR>
 
" Key Setting - resize windows
nnoremap <silent> <Leader>= :exe "resize +3"<CR>
nnoremap <silent> <Leader>- :exe "resize -3"<CR>
nnoremap <silent> <Leader>] :exe "vertical resize +8"<CR>
nnoremap <silent> <Leader>[ :exe "vertical resize -8"<CR>
 
nnoremap <silent> <Leader>+ :exe "resize " . (winheight(0) * 3/2)<CR>
nnoremap <silent> <Leader>_ :exe "resize " . (winheight(0) * 2/3)<CR>
nnoremap <silent> <Leader>} :exe "vertical resize " . (winheight(0) * 3/2)<CR>
nnoremap <silent> <Leader>{ :exe "vertical resize " . (winheight(0) * 2/3)<CR>
```

![](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-02-at-11.08.55-PM-1024x825.png)

## Options

`syntax on`{.vim} 문법에 따라 단어에 색을 입혀준다. 우분투에서는 이 옵션을 쓰지 않아도 기본으로 적용되지만 나중에 다른 리눅스를 쓸 때에 대비해서 적어놓읍시다.

`set number`{.vim} 좌측에 줄번호를 표시합니다.

`set relativenumber`{.vim} 줄번호를 상대적으로 표현합니다. 명령을 입력할 때 편합니다.

`set hlsearch`{.vim} ‘/’ 를 눌러서 검색을 하면 검색 결과 밑에 밑줄로 강조를 합니다. 우분투에서는 기본으로 적용되어 있지만, 다른 리눅스를 쓸 때에 대비해서 적어놓읍시다.

`set ignorecase`{.vim} 대소문자를 구별하지 않고 검색을 합니다.

`set tabstop=4`{.vim} `set softtabstop=4`{.vim} `set shiftwidth=4`{.vim} vim에서 보이는 모든 tab의 크기를 4로 맞춥니다.

`set expandtab`{.vim} tab대신에 스페이스바로 채워넣습니다. 사람마다 tab 크기를 다르게 설정할 수 있기 때문에 tab 대신 스페이스바로 채워넣으면 tab size가 다르더라도 의도한 indent를 유지할 수 있습니다.

`autocmd FileType make setlocal noexpandtab`{.vim} Makefile은 tab이 문법이기 때문에 스페이스바로 대체하면 안됩니다. Makefile을 열면 스페이스바가 아니라 tab을 입력하게 만드는 옵션입니다.

`nnoremap <F2> :set invpaste paste?<CR>`{.vim} 붙여넣기를 할 때 autoindent가 활성화되어있으면(기본값) 매 줄마다 indent를 추가해서 엉망이 되어버립니다. 이 옵션은 indent를 비활성화해서 붙여넣기가 제대로 작동하게 해줍니다. 토글 키는 F2입니다.

`set pastetoggle=<F2>`{.vim} 위와 같은 옵션인데, 이 옵션은 insert mode에서도 F2를 토글 키로 작동하게 해줍니다. 이 옵션이 없으면 insert mode에서 F2를 눌렀을 때 `<F2>`{.vim}가 입력됩니다.

`let mapleader = ","`{.vim}  leader 키를 ‘\’에서 ‘,’로 변경합니다. \보다는 ,가 치기 쉽기 때문에 나는 쉼표를 leader키로 씁니다.

`nnoremap <leader>q :bp<CR>`{.vim} 기본 상태에서 ,q를 누르면 이전 버퍼로 이동합니다. vim에서 파일을 여러개 열었을 때 :bq 명령어로 이전 파일(버퍼)로 이동할 수 있습니다.

`nnoremap <leader>w :bn<CR>`{.vim}  마찬가지로 ,w를 누르면 다음 버퍼로 이동합니다. vim에서 파일을 2개 이상 열고 ,q ,w를 입력해봅시다. 지금은 버퍼가 몇 개 열려있는지 눈에 보이지 않는데, 이 후에 쓸 글에서 버퍼 상태를 볼 수 있는 플러그인을 소개할 것입니다(vim-airline).

```vim
" resize windows
nnoremap <silent> <Leader>= :exe "resize +3"<CR>
nnoremap <silent> <Leader>- :exe "resize -3"<CR>
nnoremap <silent> <Leader>] :exe "vertical resize +8"<CR>
nnoremap <silent> <Leader>[ :exe "vertical resize -8"<CR>
 
nnoremap <silent> <Leader>+ :exe "resize " . (winheight(0) * 3/2)<CR>
nnoremap <silent> <Leader>_ :exe "resize " . (winheight(0) * 2/3)<CR>
nnoremap <silent> <Leader>} :exe "vertical resize " . (winheight(0) * 3/2)<CR>
nnoremap <silent> <Leader>{ :exe "vertical resize " . (winheight(0) * 2/3)<CR>
```

위 코드는 vim내에서 창을 여러개로 나누었을 때 크기를 조절하는 단축키입니다. vim에서 :vs 를 입력하고   :sp 를 입력해봅시다. vs는 vertical split이라는 의미고, sp는 그냥 split입니다.  :vsplit ,  :split 을 입력해도 같은 기능을 합니다.

.vimrc 파일을 연 상태라면 똑같은 .vimrc가 3개로 나뉘어져 보일 것입니다. Ctrl+W 를 2번 연속으로 누르면 각 창으로 커서를 옮길 수 있습니다. 여기서 ,[ ,] ,- ,= (쉼표는 리더키)를 입력해보면 창의 크기가 변합니다. ,{ ,} ,_ ,+로도 크기를 바꿀 수가 있는데 ,{와 ,}는 의도한 대로 작동하지는 않습니다.

버퍼를 여러개 열어놓고 창을 나눈 다음 ,q나 ,w를 누르면 화면 하나에 여러 파일을 동시에 띄워놓고 작업할 수 있습니다. 버퍼와 창 나누기도 vim이 가진 강점 중 하나입니다. vim 프로세스를 여러개 실행하지 않고 하나의 프로세스로 파일 여러 개를 동시에 보면서 작업할 수 있기 때문입니다.

![창을 3개 띄웠습니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-02-at-11.12.31-PM-1024x723.png) 

여기까지만 해도 그럭저럭 쓸만하지만 vim의 강력함은 플러그인을 설치하면서 제대로 나타납니다. 다음 글에서는 플러그인 매니저 vundle을 설치하고 vundle을 통해 유용한 플러그인들을 간편하게 설치해보겠습니다.

### 내용추가1

insert mode를 빠져나오려면 ESC키를 눌러야 합니다. 예전에는 키보드가 다음과 같은 모양으로 생겨서 ESC 누르기가 쉬웠지만, 요즘엔 이런 키보드를 찾아보기가 힘듭니다.

![CapsLock 자리에 ESC키가 있다.](https://cdn.myeongjae.kim/blog/2016/10/e17dfa2197cac6dfeb65f3bde6b25bc5256023764cae22d05ad3437532e9efdc.png)

멀리있는 ESC대신 Ctrl + [ 키를 눌러도 같은 효과를 볼 수 있습니다. 그래서 저는 CapsLock을 Ctrl로 매핑해서 사용합니다. macOS에서는 운영체제에서 CapsLock 기능 변경을 지원을 해주지만 Ubuntu는 사용자가 직접 바꿔주어야 합니다. [이 글](http://askubuntu.com/questions/462021/how-do-i-turn-caps-lock-into-an-extra-control-key)을 참고합시다.
