FROM node:10.24.1 as builder
RUN mkdir /frontend
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY package.json /frontend/package.json
RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent
COPY . /frontend
RUN npm run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /frontend/build /usr/share/nginx/html
COPY --from=builder /frontend/default.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]