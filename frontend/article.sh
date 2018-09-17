# Generate html files from markdown.
cd ./article_html_generator
./bin/ahg
cd ..

# Generate index.json of blog.
cd ./blog_atricle_list_generator
./bin/balg
cd ..
