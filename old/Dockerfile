FROM nginx:1.15.2-alpine
COPY ./site /var/www
COPY ./config/nginx.conf /etc/nginx/nginx.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/nginx.conf && nginx -g 'daemon off;'