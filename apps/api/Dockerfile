FROM node:18

WORKDIR /app

COPY ../../ ./

RUN npm install

RUN npx turbo run build --filter=api

WORKDIR /app/apps/api

EXPOSE 8000

CMD ["npx", "nest", "start"]