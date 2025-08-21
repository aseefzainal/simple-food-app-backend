# Use Node.js LTS
FROM node:22

# Set app directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start:prod"]
