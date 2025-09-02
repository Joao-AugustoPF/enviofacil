# Multi-stage build for production
# Build stage
FROM node:22-alpine AS builder

ENV NODE_ENV=production
WORKDIR /app

# Enable corepack and PNPM
RUN corepack enable

# Install dependencies (dev included for build)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Prune to production deps
RUN pnpm prune --prod


# Runtime stage
FROM node:22-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

RUN corepack enable

# Copy only production deps and build artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/dist ./dist

# Environment and port
ENV PORT=3000
EXPOSE 3000

# Start server (serves SPA and API on same port)
CMD ["node", "dist/server/production.mjs"]


