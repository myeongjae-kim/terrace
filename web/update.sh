./article.sh

# Generate the whole website.
cd ./home/

npm run build
rm -rf ../../website
mv dist ../../website

cd ../../