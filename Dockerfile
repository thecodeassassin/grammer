FROM node:8.11.2-alpine
ADD chkService.sh /usr/local/bin/chkService.sh
RUN chmod +x /usr/local/bin/chkService.sh
CMD ["/usr/local/bin/chkService.sh"]
EXPOSE 8080
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
COPY service.js /opt/app/service.js
WORKDIR /opt/app
ADD . /opt/app
CMD node service.js
