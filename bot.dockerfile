FROM node:23.5 AS builder

WORKDIR /bot

# Install build-essential for GCC and other build tools, Python, and FFmpeg
RUN apt-get update && apt-get install -y build-essential python3 ffmpeg

COPY package*.json ./

# Install all dependencies including @discordjs/opus, node-opus, opusscript, and @distube/ytdl-core
RUN npm install && npm install @discordjs/opus node-opus opusscript @distube/ytdl-core

# Verify installation of @discordjs/opus, node-opus, and opusscript
RUN npm list @discordjs/opus node-opus opusscript @distube/ytdl-core

FROM node:23.5

WORKDIR /bot

# Install FFmpeg in the final stage
RUN apt-get update && apt-get install -y ffmpeg

# Copy node_modules from the builder stage
COPY --from=builder /bot/node_modules /bot/node_modules
COPY --from=builder /bot/package*.json /bot/

COPY . .

CMD [ "node", "index.js"]