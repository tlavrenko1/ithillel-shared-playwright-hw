# Use the official Node.js image as the base image
FROM mcr.microsoft.com/playwright:v1.45.0-jammy 

# Set default values for environment variables
ENV BASE_URL=""
ENV HTTP_CREDENTIALS_USERNAME=""
ENV HTTP_CREDENTIALS_PASSWORD=""

# Set the working directory
WORKDIR /e2e

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Command to run tests
CMD ["npx", "playwright", "test"]
