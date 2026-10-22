FROM node:24.22.1-bookworm-slim AS node-runtime
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Keep the matching browsers while replacing the image's unpatched Node runtime.
COPY --from=node-runtime /usr/local/bin/node /usr/bin/node
RUN test "$(node --version)" = "v24.22.1"
