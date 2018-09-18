# [vim/Linux] 11. NERD Commenter, 주석 단축키 플러그인

NERD Commenter는 단축키로 주석 처리를 할 수 있게 해주는 플러그인입니다.

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-19-at-11.46.42-PM.png)

`.vimrc`에  `Plugin 'scrooloose/nerdcommenter'` 을 추가하고  `:PluginInstall` 을 합시다.

`.vimrc`에 다음과 같이 추가한다.

```
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
```

저는 `<leader>c<space>`와 `<leader>cs`를 사용합니다(현재 리더키는 쉼표입니다). `,c<space>`를 입력하면 커서가 있는 줄에 주석이 달립니다. Visual mode (v를 누르면 됨)에 진입해서 여러 줄을 선택한 뒤 `,c<space>`를 누르면 여러 줄에 주석처리를 할 수 있습니다. 주석을 해제하려면 `,c<space>`를 한 번 더 누르면 됩니다.

`,cs`는 sexy comment라고 불리는 기능인데, 여러 줄을 주석처리 할 때 주석을 예쁘게 달아줍니다.

![Visual mode로 여러 줄을 선택했습니다.](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-19-at-11.46.23-PM.png)

![,c<space> 로 주석 처리를 했습니다.](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-19-at-11.46.30-PM.png)

![](https://cdn.myeongjae.kim/blog/2017/07/Screen-Shot-2017-07-19-at-11.46.42-PM.png)

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
Plugin 'Shougo/deoplete.nvim'
Plugin 'Rip-Rip/clang_complete'
Plugin 'scrooloose/nerdcommenter'
 
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
```

## Reference

The NERD Commenter: [github.com/scrooloose/nerdcommenter](https://github.com/scrooloose/nerdcommenter)
