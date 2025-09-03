# Multi-stage build for EnvioFácil app
# Build stage
FROM node:20-alpine AS builder

# Enable corepack and pnpm matching the project
RUN corepack enable
WORKDIR /app

# Copy package manifest and install deps
COPY package.json ./
# Copy lockfile if present (optional)
COPY pnpm-lock.yaml* ./
RUN corepack prepare pnpm@10.14.0 --activate \
  && pnpm install --frozen-lockfile=false

# Copy source and build
COPY . .
RUN pnpm build \
  && pnpm prune --prod

# Runtime stage
FROM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

# Copy only what is needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
ENV PORT=3000

CMD ["node", "dist/server/node-build.mjs"]
