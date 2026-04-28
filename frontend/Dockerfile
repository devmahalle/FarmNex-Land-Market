# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom nginx configuration to handle React Router (SPA)
# If you don't have one, the default will work but page refreshes on sub-routes might 404
# I'll provide a basic one below if needed, but for now let's use default.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
