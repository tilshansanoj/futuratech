# FuturaTech Full Stack Application

This project is a full stack application with a React frontend (`client`), Node.js/Express backend (`server`), and MongoDB database. You can run the entire stack locally using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Project Structure

```
client/      # React frontend
server/      # Node.js/Express backend
docker-compose.yml
.env.sample  # Sample environment variables
```

## Setup

1. **Configure Environment Variables**

   - Copy `.env.sample` to `.env` in the project root.
   - Edit `.env` and set values for:
     - `MONGO_URI`
     - `MONGO_USERNAME`
     - `MONGO_PASSWORD`
     - Any other required variables

2. **Build and Run with Docker Compose**

   Run the following command in the project root:

   ```sh
   docker-compose up --build
   ```

   This will:
   - Build and start the React frontend (`web`) on [http://localhost:3000](http://localhost:3000)
   - Build and start the backend API (`api`) on [http://localhost:5000](http://localhost:5000)
   - Start a MongoDB instance (`mongo`) on port `27017`

3. **Stopping the Application**

   Press `Ctrl+C` to stop, then run:

   ```sh
   docker-compose down
   ```

## Notes

- The React app will be available at [http://localhost:3000](http://localhost:3000).
- The backend API will be available at [http://localhost:5000](http://localhost:5000).
- MongoDB data is persisted in a Docker volume (`mongo-data`).
- For development, changes in `client` and `server` directories will require rebuilding the containers.

## Troubleshooting

- Ensure your `.env` file is correctly configured.
- If you change dependencies, rebuild with `docker-compose up --build`.

---

For more details, see `docker-compose.yml` and the