FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL

ARG STRAPI_URL_INTERNAL
ENV STRAPI_URL_INTERNAL=$STRAPI_URL_INTERNAL

# Build the Next.js application
USER node
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
