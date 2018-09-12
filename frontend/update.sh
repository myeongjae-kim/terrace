# Generate index.json of blog.
cd ./blog_atricle_list_generator
./bin/balg
cd ..

# Generate the whole website.
cd ./home/
npm run build
cd ..
rm -rf ../web_root_old/
mv ../web_root/ ../web_root_old/
mkdir ../web_root/
cp -r ./home/dist/* ../web_root/
