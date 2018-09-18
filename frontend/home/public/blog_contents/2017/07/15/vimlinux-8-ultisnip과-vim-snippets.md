# [vim/Linux] 8. UltiSnip과 vim-snippets

Ultisnip과 vim-snippets은 if, for, while 혹은 switch case같이 패턴이 정해져있는 코드들을 자동으로 입력하도록 도와주는 플러그인입니다. Ultisnip은 저장되어 있는 키워드를 입력한 뒤 Tab을 누르면 키워드에 맞는 코드를 자동으로 완성합니다. 키워드는 vim-snippets이 보관하고 있습니다.

예를 들면, C에서 inc를 입력하고 Tab을 누르면 #include <stdio.h>을 자동으로 입력합니다. 이 상태에서 다른 헤더파일 이름을 입력하면 stdio.h가 지워지면서 새롭게 입력이 됩니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.25.18-PM-1024x625.png)

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.25.24-PM-1024x624.png)

main을 입력하고 Tab을 누르면 main함수를 자동으로 완성합니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.25.31-PM-1024x633.png)

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.25.38-PM-1024x621.png)

switch도 문제없습니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.26.06-PM-1024x621.png)

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.26.12-PM-1024x621.png)

`.vimrc`에  `Plugin 'SirVer/ultisnips'` 과  `Plugin 'honza/vim-snippets'`을 추가하고 `:PluginInstall`을 합시다.

.vimrc에 다음과 같이 추가합니다.

```
" UltiSnips
let g:UltiSnipsExpandTrigger="<tab>"
let g:UltiSnipsJumpForwardTrigger="<tab>"
let g:UltiSnipsJumpBackwardTrigger="<s-tab>"
let g:UltiSnipsEditSplit="vertical"
```

쉽게 입력할 수 있도록 미리 저장되어 있는 코드들을 snippet이라고 부릅니다. snippet은 ~/.vim/bundle/vim-snippets/snippets/ 디렉토리에 저장되어 있습니다. 여기 있는 파일들을 수정하면 본인만의 snippet을 만들어 사용할 수 있습니다.

![img](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-15-at-4.28.44-PM-1024x624.png)

`~/.vim/bundle/vim-snippets/snippets/c.snippets`

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
```

## Reference

UltiSnip: [github.com/SirVer/ultisnips](https://github.com/SirVer/ultisnips)

vim-snippets: [github.com/honza/vim-snippets](https://github.com/honza/vim-snippets)