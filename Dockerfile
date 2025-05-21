# This source file is part of the Stanford Spezi open-source project
#
# SPDX-FileCopyrightText: 2024 Stanford University and the project authors (see CONTRIBUTORS.md)
#
# SPDX-License-Identifier: MIT

# Use an official Node.js runtime as the base image

# ----------------------------------------
# 1. Base for installing dependencies
# ----------------------------------------
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ----------------------------------------
# 2. Development with hot reloading
# ----------------------------------------
FROM builder AS dev

RUN npm install -g @nestjs/cli

EXPOSE 80

CMD ["npm", "run", "start:dev"]

# ----------------------------------------
# 3. Slim Production Runner
# ----------------------------------------
FROM builder AS runner

WORKDIR /app

# Copy built application from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 80

CMD ["node", "dist/main.js"]
