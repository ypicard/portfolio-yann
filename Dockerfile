FROM mhart/alpine-node

WORKDIR /src

COPY package.json .
RUN npm i

COPY . .

EXPOSE 8080
EXPOSE 8443

CMD ["npm", "start"]
