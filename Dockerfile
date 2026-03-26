# ---- Stage 1: Build Stage ----
FROM node:20-alpine AS build-stage
RUN apk update && apk upgrade --no-cache

WORKDIR /app
COPY package*.json ./
# Install ALL dependencies for building
RUN npm install
COPY . .
RUN npm run build

# ---- Stage 2: Production Runtime ----
FROM node:20-alpine
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Set to production environment
ENV NODE_ENV=production

# Copy ONLY files needed for production install
COPY package*.json ./
# Install ONLY production dependencies - no devDependencies leak!
RUN npm ci --only=production && npm cache clean --force

# Copy built assets from build-stage
COPY --from=build-stage /app/dist ./dist
# Copy server files
COPY server ./server

# Use non-root user (good practice)
USER node

EXPOSE 7860
ENV PORT=7860

CMD ["node", "server/server-prod.mjs"]
