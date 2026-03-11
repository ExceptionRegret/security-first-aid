FROM node:22.15.0-alpine
WORKDIR /app
COPY . .
RUN addgroup -S app && adduser -S app -G app
USER app
CMD ["node", "server.js"]
