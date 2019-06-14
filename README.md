# How to run

## In development :

```
$ npm install
$ npm run dev
```

## With docker :

```
$ docker build -t portfolio-yann .
$ docker run -p 8080:8080 -t portfolio-yann
```

## In production :

- SSH on the EC2 instance :

```
$ ssh -i ~/.ssh/keyfile.pem ec2-user@ec2-54-194-210-177.eu-west-1.compute.amazonaws.com
```

- Clone the repo in the home folder if not already present.
- Go in the project folder.
- Run the `run.sh` bash script. This will :
  - stop and delete all running docker containers.
  - build a new `portfolio-yann` image.
  - launch a new docker container :
    - in detached mode : `-d`.
    - mounted with the SSL certificate and private key : `-v /host/file:/container/destination`.
    - with the environment variable `NODE_ENV=production`.
    - expose required ports for HTTP and HTTPS : `-p 80:8080 -p 443:8443`.

# Notes

- On AWS, HTTP and HTTPS need to be authorized in the _Network & Security - Security Groups_ tab.
- To prevent the EC2 public IP from changing on every restart, an elastic IP address is used.
- The domain name `ypicard.dev` is managed on [Google Domains](https://domains.google.com/m/registrar). It has one CNAME (_www.ypicard.dev_) and one alias A pointing to the EC2 elastic IP address.
- SSL certificate was issued with [certbot](https://certbot.eff.org) directly on the EC2 instance. It is located in the `/etc/letsencrypt` directory.
- SSL is forced only in `production` mode.
