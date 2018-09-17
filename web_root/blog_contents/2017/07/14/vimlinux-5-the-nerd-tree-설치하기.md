# [vim/Linux] 5. The NERD Tree 설치하기

이번에도 마찬가지로 Vundle을 통해 플러그인을 설치합니다.

The NERD Tree는 파일 탐색기입니다. vim안에서 파일시스템을 접근할 수 있는 UI를 생성합니다.

.vimrc를 열어서 vim-airline 플러그인 밑에 다음과 같이 추가합니다.

```
" Keep Plugin commands between vundle#begin/end.
 
Plugin 'vim-airline/vim-airline'
Plugin 'vim-airline/vim-airline-themes'
Plugin 'The-NERD-Tree'
```

vim을 실행하고 `:PlugInstall`을 입력하면 플러그인이 설치됩니다.

[![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-14-at-3.20.53-PM.png)](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-14-at-3.20.53-PM.png)

이후 vim을 재시작 한 뒤 `:NERDTree`를 입력하면 파일시스템을 볼 수 있는 창이 생깁니다.

[![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-14-at-3.23.43-PM.png)](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-14-at-3.23.43-PM.png)

분할된 창 사이를 이동하려면 Ctrl+W을 입력하고 H,J,K,L을 입력하면 됩니다..

매번 `:NERDTree`를 입력할 수 없으니 단축키를 설정합시다.

```
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
```

이제 vim을 실행할 때 매개변수가 없으면 NERTree가 나타나고, 매개변수가 있으면 NERDTree가 나타나지 않습니다.  가령 `$ v` (혹은 `nvim`)으로 vim을 실행하면 NERDTree가 나타나고,   `$ v a.c` 를 입력해서 `a.c`파일을 열면서 vim을 실행하면 NERDTree가 나타나지 않습니다.

단축키는 `<leader>ne`입니다. 이 전 글에서 `<leader>`키를 쉼표로 설정했으므로 `,ne`라고 입력하면 NERDTree가 나타납니다. 다시 한 번 입력하면 사라집니다.

아래는 지금까지 설정한 .vimrc 파일입니다.

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
Plugin 'The-NERD-Tree'
 
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
```

## Reference

The NERDTree: [github.com/scrooloose/nerdtree](https://github.com/scrooloose/nerdtree)
