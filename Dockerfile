# Development Dockerfile with hot reload
FROM oven/bun:1

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Expose port 3000 for Next.js dev server
EXPOSE 3000

# Enable polling for hot reload in Docker
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Start development server
CMD ["bun", "run", "dev"]
