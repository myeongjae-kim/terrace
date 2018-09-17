# [vim/Linux] 4. 플러그인 매니저를 설치하고 vim-airline 설치하기

![이번 글의 목표](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-06-at-1.19.39-AM.png)

여기서는 플러그인 매니저를 설치하고 매니저를 통해 vim-airline 플러그인을 설치해보도록 하겠습니다. vim-airline은 위의 사진에서 보듯이 buffer에 쌓여있는 파일들을 시각화해서 보여주고 하단에 현재 입력모드를 표시해줍니다.

## [Vundle](https://github.com/VundleVim/Vundle.vim)

vim은 여러가지 플러그인들을 설치해서 사용할 수 있습니다. github이 탄생하고 plugin들을 모듈 형식으로 설치할 수 있게 되면서 vim플러그인을 쉽게 공유하고 설치할 수 있게 되었습니다. vim은 유구한 역사와 전통을 자랑하기 때문에 플러그인 매니저도 여러개가 있습니다. 지금까지 나온 매니저들중 끝판왕이 [Vundle](https://github.com/VundleVim/Vundle.vim)입니다. 이전 플러그인 매니저들의 기능을 대부분 포함하고 있으며, 플러그인 설치와 삭제가 매우 간단합니다.

대부분의 vim 플러그인은 github을 통해 관리하기 때문에 우리는 git을 설치 해야 합니다.

`$ sudo apt-get install git`

git을 통해서 vundle을 설치합니다.

`$ git clone https://github.com/VundleVim/Vundle.vim.git~/.vim/bundle/Vundle.vim`

vim의 플러그인은 `~/.vim/bundle/` 디렉토리에서 관리합니다. 설치가 잘 되었는지 확인해봅시다.

`$ cd ~/.vim/bundle`

`$ ls -l`

![vundle이 제대로 설치되었습니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-06-at-12.43.20-AM-1024x635.png)

bundle 폴더 밑에 플러그인이 있는 것만으로는 vim이 플러그인을 인식하지 못합니다. `.vimrc`에 아래 코드를 붙여넣읍시다. 우분투 터미널에서 복사와 붙여넣기는 Ctrl-Shift-C, Ctrl-Shift-V로 할 수 있습니다.

```
" Vundle
set nocompatible              " be iMproved, required
filetype off                  " required
 
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')
 
" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
 
" Keep Plugin commands between vundle#begin/end.
 
" vim-airline
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
 
" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo at http://vim-scripts.org/vim/scripts.html; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
```

17-18번째 줄은 `vim-airline`과 `vim-airline-themes`라는 플러그인을 설치하겠다는 의미입니다. 이 플러그인들은

<https://github.com/vim-airline/vim-airline>

<https://github.com/vim-airline/vim-airline-themes>

에서 관리하고 있습니다. github를 통해 관리하는 플러그인들은 모두 17-18번째 줄처럼 입력해서 사용할 수 있습니다. 작은따옴표 사이에 `github.com/` 뒤의 주소(URI)만 적어주면 vundle이 알아서 설치합니다.

27-30번째 줄은 vundle의 사용법이다. vim을 실행하고 `:PluginList`를 입력하면 `.vimrc`에 우리가 입력한 플러그인의 리스트가 나옵니다. 설치된 플러그인과 설치할 플러그인이 모두 표시됩니다.

![Vundle은 설치되어있고, 나머지는 설치해야 할 플러그인입니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-06-at-12.56.47-AM-1024x625.png)

`:PluginInstall`을 입력하면 플러그인을 설치합니다. 이미 설치되어 있는 플러그인은 건너뛰고 설치해야 할 플러그인만 `~/.vim/bundle`에 다운받습니다.

`:PluginSearch foo`는 `foo`라는 플러그인을 검색합니다. <http://vim-scripts.org/vim/scripts.html> 에 올라와있는 플러그인은 vundle에서 찾고 설치할 수 있습니다. 이 사이트에 있는 플러그인들은 `.vimrc`에서 작은 따옴표 안에 이름만 적어줘도 설치가 가능합니다. `Plugin ‘name’`  같은 포맷입니다.

`:PluginClean`은 `~/.vim/bundle`에 있으면서도 `.vimrc`에는 없는 플러그인을 삭제합니다. 플러그인을 삭제하고 싶으면 직접 삭제하는게 아니라 `.vimrc`에서 플러그인 이름을 지우고 vim을 재시작하고 `:PluginClean`을 하면 됩니다.

`:PluginInstall`을 입력해서 `vim-airline`과 `vim-airline-themes`를 설치합시다.

![vim-airline을 설치하는 중](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-06-at-1.01.22-AM.png)


## vim-airline

이제 `.vimrc`에 다음 코드를 추가합시다. `vim-airline`을 위한 셋팅입니다.

```
" for vim-airline
let g:airline#extensions#tabline#enabled = 1 " turn on buffer list
let g:airline_theme='hybrid'
set laststatus=2 " turn on bottom bar
```

`set laststatus=2` 는 ubuntu에서 기본으로 적용되어 있지만 다른 리눅스를 쓸 때를 위해 적어놓읍시다. `:set laststatus=1`을 입력하면 차이를 알 수 있다. hybrid theme는 특정한 색이 있는 것이 아니라 colorscheme을 따라갑니다. 우리가 설정한 CodeSchool3에 있는 색을 따라가기 때문에 자연스럽게 어울립니다. 여기까지 잘 따라왔다면 다음과 같은 화면이 됐을 것입니다.

![상단에는 buffer가, 하단에는 현재 상태가 보입니다.](https://cdn.myeongjae.kim/blog/2016/10/Screen-Shot-2016-10-06-at-1.11.49-AM.png)

파일을 여러개 연 상태에서 `<leader>q`, `<leader>w` (리더키는 쉼표로 설정했었습니다)를 입력하면 buffer를 순회하는 것을 볼 수 있습니다.

이번 글까지 작성한 .vimrc는 다음과 같습니다.

```
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
 
" Vundle
set nocompatible              " be iMproved, required
filetype off                  " required
 
" set the runtime path to include Vundle and initialize
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()
" alternatively, pass a path where Vundle should install plugins
"call vundle#begin('~/some/path/here')
 
" let Vundle manage Vundle, required
Plugin 'VundleVim/Vundle.vim'
 
" Keep Plugin commands between vundle#begin/end.
 
" vim-airline
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
 
" All of your Plugins must be added before the following line
call vundle#end()            " required
filetype plugin indent on    " required
" To ignore plugin indent changes, instead use:
"filetype plugin on
"
" Brief help
" :PluginList       - lists configured plugins
" :PluginInstall    - installs plugins; append `!` to update or just :PluginUpdate
" :PluginSearch foo - searches for foo; append `!` to refresh local cache
" :PluginClean      - confirms removal of unused plugins; append `!` to auto-approve removal
"
" see :h vundle for more details or wiki for FAQ
" Put your non-Plugin stuff after this line
 
" for vim-airline
let g:airline#extensions#tabline#enabled = 1 " turn on buffer list
let g:airline_theme='hybrid'
set laststatus=2 " turn on bottom bar
```

### Reference

Vundle.vim: [github.com/VundleVim/Vundle.vim](https://github.com/VundleVim/Vundle.vim)

vim-airline: [github.com/vim-airline/vim-airline](https://github.com/vim-airline/vim-airline)
