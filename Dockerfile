FROM node:alpine as build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# ENV REACT_APP_API_URL http://localhost:8000/graphql/
COPY . .
RUN npm run build


FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
# COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

