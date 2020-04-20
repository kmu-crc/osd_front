npm run-script build && aws s3 rm s3://ggmsng.com --recursive --profile ggmsng && aws s3 cp build s3://ggmsng.com --recursive --profile ggmsng
