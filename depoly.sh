
#git pull origin develop

yarn build

rm build/static/**/*.map

aws s3 rm s3://opensrcdesign.com --recursive

aws s3 cp build s3://opensrcdesign.com --recursive
aws s3 cp --cache-control max-age=0 ./build/index.html s3://opensrcdesign.com/
aws s3 cp --cache-control max-age=0 ./build/service-worker.js s3://opensrcdesign.com/

aws cloudfront create-invalidation --distribution-id EHAA2Y3G67XNE --paths "/*"

