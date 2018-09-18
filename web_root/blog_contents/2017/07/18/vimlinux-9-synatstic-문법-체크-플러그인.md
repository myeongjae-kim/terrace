# [vim/Linux] 9. Synatstic, 문법 체크 플러그인

이름에서 알 수 있듯이 Syntax를 체크해주는 플러그인입니다. IDE에서는 문법을 틀리게 입력하면 실시간으로 오류 메세지를 띄웁니다. 이 플러그인은 vim에서 파일을 저장할 때마다 문법 체크를 해서 오류 메세지를 내보냅니다.

![vim에서 문법 체크를 해봅시다.](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.27.29-PM.png)

`.vimrc`에  `Plugin 'Syntastic'` 을 추가하고 `:PluginInstall`을 합시다.

`.vimrc`에 다음과 같이 추가합니다

```
" Syntastic
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
 
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
 
let g:syntastic_cpp_compiler = 'g++'
let g:syntastic_cpp_compiler_options = "-std=c++11 -Wall -Wextra -Wpedantic"
let g:syntastic_c_compiler_options = "-std=c11 -Wall -Wextra -Wpedantic"
```

제가 C와 C++을 코딩할 때 사용하는 컴파일 옵션도 추가했는데, 이렇게 지정하면 Syntastic에서도 같은 설정으로 문법 체크를 합니다. 어떤 옵션인지 궁금하면 터미널에  $man gcc 라고 입력한 뒤  /-Wall 이라고 입력하고 엔터를 눌러봅시다.  n을 여섯 번 쯤 눌러보면 옵션에 대한 설명이 나옵니다. `-Wall, -Wextra, -Wpedantic` 세 가지 옵션 모두 문법을 더 엄격하게 검사하게 만듭니다. 익숙해지면 엄격하고 정갈한 코딩을 할 수 있을 것입니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.25.56-PM-1024x623.png)

세미콜론 하나를 뺀 C코드입니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.27.16-PM-1024x629.png)

파일을 정하기 전까진 다를 것이 없습니다. 그러나 `:w` 를 입력해서 파일을 저장하면 다음과 같이 경고와 오류를 띄워줍니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.27.29-PM.png)

`return` 직전에 세미콜론이 필요합니다. 그 다음의 2개의 경고는 한 번도 사용하지 않은 변수들에 대해서 경고합니다. 세미콜론을 추가하고 메인함수의 argument에 void를 넣어주면 경고가 사라집니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.27.53-PM-1024x632.png)

지금까지 작성한 `.vimrc`는 다음과 같습니다.

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
 
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'The-NERD-Tree'
Plugin 'terryma/vim-multiple-cursors'
Plugin 'terryma/vim-smooth-scroll'
Plugin 'Raimondi/delimitMate'
Plugin 'SirVer/ultisnips'
Plugin 'honza/vim-snippets'
Plugin 'Syntastic'
 
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
 
" The-NERD-Tree
autocmd BufEnter * lcd %:p:h
autocmd VimEnter * if !argc() | NERDTree | endif
nmap <leader>ne :NERDTreeToggle<cr>
let NERDTreeShowLineNumbers=1
let g:NERDTreeWinPos = "right"
 
" vim-multiple-cursor
let g:multi_cursor_use_default_mapping=0
" Default mapping
let g:multi_cursor_next_key='<C-n>'
let g:multi_cursor_prev_key='<C-p>'
let g:multi_cursor_skip_key='<C-x>'
let g:multi_cursor_quit_key='<Esc>'
 
" vim-smooth-scroll
noremap <silent> <c-b> :call smooth_scroll#up(&scroll*2, 10, 5)<CR>
noremap <silent> <c-f> :call smooth_scroll#down(&scroll*2, 10, 5)<CR>
noremap <silent> <c-u> :call smooth_scroll#up(&scroll, 10, 3)<CR>
noremap <silent> <c-d> :call smooth_scroll#down(&scroll, 10, 3)<CR>
 
" delimitMate
let delimitMate_expand_cr=1
 
" UltiSnips
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<tab>"
let g:UltiSnipsJumpBackwardTrigger="<s-tab>"
let g:UltiSnipsEditSplit="vertical"
 
" Syntastic
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*
 
let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
 
let g:syntastic_cpp_compiler = 'g++'
let g:syntastic_cpp_compiler_options = "-std=c++11 -Wall -Wextra -Wpedantic"
let g:syntastic_c_compiler_options = "-std=c11 -Wall -Wextra -Wpedantic"
```

## Reference

Syntastic: [github.com/vim-syntastic/syntastic](https://github.com/vim-syntastic/syntastic)
