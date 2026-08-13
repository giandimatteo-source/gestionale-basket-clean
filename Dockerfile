FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY backend/package*.json ./backend/

# Install dependencies
RUN npm install
RUN cd backend && npm install

# Copy backend source code
COPY backend ./backend

# Copy and build frontend
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build

# Copy frontend build to backend
RUN cp -r frontend/dist backend/public

# Expose port
EXPOSE 5000

# Start backend
WORKDIR /app/backend
CMD ["npm", "start"]
