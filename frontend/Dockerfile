# Stage 1 — Build the React app
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the frontend source code
COPY . .

# Build production files
RUN npm run build

# Stage 2 — Serve with nginx
FROM nginx:stable-alpine

# Remove default nginx static assets and replace with build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional for API proxying)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
