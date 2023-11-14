set -e
set -x
npm run build
docker build -t business-form-backend .
docker tag business-form-backend:latest sugardark/business-form-backend:latest
docker push sugardark/business-form-backend:latest
scp docker-compose.yml form:~/
ssh form "
  docker pull sugardark/business-form-backend:latest \
  && docker-compose up -d \
  && docker logs --follow ubuntu_backend-server_1
"