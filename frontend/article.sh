# Generate html files from markdown.
cd ./article_html_generator
make
cd ..

# Generate index.json of blog.
cd ./blog_atricle_list_generator
make
cd ..

# Generate vue.config.js
cd ./prerendering_list_generator
make
cd ..