# [vim/Linux] 13. vim-go와 deoplete-go, Go언어를 위한 플러그인

Go는 2009년 구글에서 만든 언어인데 최근 점유율이 급성장했습니다.

![https://www.tiobe.com/tiobe-index, 작년에 비해 45단계나 올랐습니다.](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-20-at-10.47.00-PM.png)

이 언어는 켄 톰슨(데니스 리치와 유닉스를 만들고 C를 만든 그 켄 톰슨), 롭 파이크, 로버트 그리즈머 세 명이 주축이 되어서 만들습니다(존잘님들…). 아래는 제가 만든 [Go언어 소개 PDF](https://drive.google.com/file/d/0B_fCUMzieh5fUVB1TldZQUVVakE/view?usp=sharing)입니다.

<iframe src="https://drive.google.com/file/d/0B_fCUMzieh5fUVB1TldZQUVVakE/preview" width="100%" height="460px" border=0></iframe>

이전 글에서 deoplete와 clang_complete를 설치해서 C언어에서 코드 자동완성 기능을 추가했습니다. 마찬가지로 deoplete_go와 vim-go를 설치하면 Go언어에서 코드 자동완성 기능을 누릴 수 있습니다.

![fmt 패키지의 함수들입니다.](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-20-at-10.46.12-PM.png)

Go를 설치하고 `.vimrc`에  `Plugin 'fatih/vim-go'` 와  `Plugin 'zchee/deoplete-go'` 를 추가하고  `:PluginInstall` 을 합시다. 이후에  `:GoInstallBinaries` 을 입력해서 Go관련 실행 파일들을 받습니다.

![Go와 관련된 Binary file들을 받는 중](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-20-at-10.32.36-PM.png)

`.vimrc`에 다음과 같이 추가합니다.

```
" Basic Settings
colorscheme CodeSchool3
set termguicolors
syntax on
set number
set relativenumber
set hlsearch
set ignorecase
set tabstop=2
set softtabstop=2
set shiftwidth=2
set expandtab
autocmd FileType make setlocal noexpandtab
set scrolloff=999
autocmd FileType go setlocal noexpandtab
```

Google은 indent를 두 칸으로 사용하므로, tabsize를 2로 바꿔줍니다. 그리고 Go는 indent를 space가 아니라 tab을 쓰는 것이 표준입니다(`noexpandtab`).

아래 설정도 `.vimrc`에 추가하는데, vim-go를 편하게 사용하기 위한 단축키들입니다.

```
" Go commands
au FileType go nmap <Leader>gi <Plug>(go-info)
au FileType go nmap <Leader>gd <Plug>(go-doc)
au FileType go nmap <Leader>gr <Plug>(go-run)
au FileType go nmap <Leader>gb <Plug>(go-build)
au FileType go nmap <Leader>gt :w<CR><Plug>(go-test)
au FileType go nmap gd <Plug>(go-def-tab)
au FileType go nmap <leader>gm :GoImports<CR>
```

![fmt 패키지의 함수들입니다.](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-20-at-10.46.12-PM.png)

지금까지 설정한 `.vimrc`는 다음과 같습니다.

```
" Basic Settings
colorscheme CodeSchool3
set termguicolors
syntax on
set number
set relativenumber
set hlsearch
set ignorecase
set tabstop=2
set softtabstop=2
set shiftwidth=2
set expandtab
autocmd FileType make setlocal noexpandtab
set scrolloff=999
autocmd FileType go setlocal noexpandtab
 
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
Plugin 'Shougo/deoplete.nvim'
Plugin 'Rip-Rip/clang_complete'
Plugin 'scrooloose/nerdcommenter'
Plugin 'junegunn/goyo.vim'
Plugin 'fatih/vim-go'
Plugin 'zchee/deoplete-go'
 
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
 
" Deoplete.
let g:deoplete#enable_at_startup = 1
 
" clang_complete
set completeopt-=preview
 
" NERD Commenter
" Add spaces after comment delimiters by default
let g:NERDSpaceDelims = 1
" Use compact syntax for prettified multi-line comments
let g:NERDCompactSexyComs = 1
" Align line-wise comment delimiters flush left instead of following code indentation
let g:NERDDefaultAlign = 'left'
" Set a language to use its alternate delimiters by default
let g:NERDAltDelims_java = 1
" Add your own custom formats or override the defaults
let g:NERDCustomDelimiters = { 'c': { 'left': '/**','right': '*/' } }
" Allow commenting and inverting empty lines (useful when commenting a region)
let g:NERDCommentEmptyLines = 1
" Enable trimming of trailing whitespace when uncommenting
let g:NERDTrimTrailingWhitespace = 1
" customize keymapping
map <Leader>cc <plug>NERDComToggleComment
map <Leader>c<space> <plug>NERDComComment
 
" Goyo
nnoremap <F4> :Goyo <CR>
function! s:goyo_enter()
  set noshowmode
  set noshowcmd
  set scrolloff=999
  set number
  set rnu
  " ...
endfunction
 
function! s:goyo_leave()
  set showmode
  set showcmd
  set scrolloff=999
  " ...
endfunction
 
autocmd! User GoyoEnter nested call <SID>goyo_enter()
autocmd! User GoyoLeave nested call <SID>goyo_leave()
 
" Go commands
au FileType go nmap <Leader>gi <Plug>(go-info)
au FileType go nmap <Leader>gd <Plug>(go-doc)
au FileType go nmap <Leader>gr <Plug>(go-run)
au FileType go nmap <Leader>gb <Plug>(go-build)
au FileType go nmap <Leader>gt :w<CR><Plug>(go-test)
au FileType go nmap gd <Plug>(go-def-tab)
au FileType go nmap <leader>gm :GoImports<CR>
```

## Reference

vim-go: [github.com/fatih/vim-go](https://github.com/fatih/vim-go)

deoplete-go: [github.com/zchee/deoplete-go](https://github.com/zchee/deoplete-go)
