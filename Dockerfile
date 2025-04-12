# Use a lightweight base image
FROM nginx:alpine

# Copy the build output to the nginx HTML directory
COPY dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]