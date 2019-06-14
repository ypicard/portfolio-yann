# stop and remove all docker containers
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
# build image
docker build -t portfolio-yann .
# run
docker run -d -v /etc/letsencrypt/live/ypicard.dev/fullchain.pem:/etc/letsencrypt/live/ypicard.dev/fullchain.pem -v /etc/letsencrypt/live/ypicard.dev/privkey.pem:/etc/letsencrypt/live/ypicard.dev/privkey.pem -e NODE_ENV=production -p 80:8080 -p 443:8443 -t portfolio-yann
