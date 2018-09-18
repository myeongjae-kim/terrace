# [vim/Linux] 10. deoplete과 clang_complete, 자동 완성 플러그인

## Deoplete

Deoplete은 사용자의 입력을 prefix로 처리해서 예상되는 입력값들을 추천해주는 플러그인입니다.

![img](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-9.04.58-PM.png)

`.vimrc`에  `Plugin 'Shougo/deoplete.nvim'`{.vim} 을 추가하고  `:PluginInstall` 을 합시다. deplete가 설치되면 vim을 재시작하고  `:UpdateRemotePlugins` 를 입력합니다.

.vimrc에 다음과 같이 추가합니다.

```vim
" Deoplete.
let g:deoplete#enable_at_startup = 1
```

`.vimrc`를 열고 제일 마지막 줄에 deo라고 입력해보면, 입력한 deo와 관련된 단어들이 나타납니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.48.48-PM-1024x627.png)

`Ctrl + N`과 `Ctrl + P`로 관련된 단어들을 선택할 수 있습니다. 선택한 뒤에는 `Ctrl + [` 혹은 `ESC`를 누르면 됩니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-8.48.58-PM.png)

지금 상태는 vim에서 열어놓은 파일 안에서만 관련 단어를 찾습니다. 아래의 플러그인을 설치하면 C의 스탠다드 라이브러리를 활용해서 코드를 자동으로 완성할 수 있습니다.

## clang_complete

플러그인을 설치하기 전에 clang compiler를 설치해야 vim에서 C언어 자동완성을 사용할 수 있습니다.

```bash
sudo apt-get install clang
```

그리고 library의 이름을 살짝 바꿔주어야 clang_complete에서 library를 찾습니다. 다음과 같이 symbolic link를 생성합시다.

```bash
cd /usr/lib/x86_64-linux-gnu
sudo ln -s libclang-3.8.so.1 libclang.so
```

(글을 작성할 때는 3.8버전이었는데, 버전이 업데이트되면 파일 이름이 달라질 수 있습니다.)

`.vimrc`에  `Plugin 'Rip-Rip/clang_complete'`{.vim} 을 추가하고  `:PluginInstall` 을 합시다.

`.vimrc`에 다음과 같이 추가합니다.

```vim
" clang_complete
set completeopt-=preview
```

이제 C와 C++에서 자동완성 기능을 사용할 수 있습니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-18-at-9.04.58-PM.png)

지금까지 작성한 `.vimrc`는 다음과 같습니다.

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
```

## Reference

deplete.vim: [github.com/Shougo/deoplete.nvim](https://github.com/Shougo/deoplete.nvim)
