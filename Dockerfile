# Stage 1: Build the application
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the custom nginx.conf file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built application files from the build-stage to Nginx directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]