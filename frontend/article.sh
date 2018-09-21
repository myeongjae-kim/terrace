# Generate html files from markdown.
cd ./article_html_generator
./bin/ahg
cd ..

# Generate index.json of blog.
cd ./blog_atricle_list_generator
./bin/balg
cd ..

# Generate vue.config.js
cd ./prerendering_list_generator
./bin/plg
cd ..