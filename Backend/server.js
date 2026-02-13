import 'dotenv/config'
import { config } from './config/index.js'
import express from 'express'
import http from 'node:http'
import cors from 'cors'
import cookieParser from 'cookie-parser'

//import {loggerMiddleware} from './middlewares'
import {loggerService} from './services/logger.service.js'
import {dbService} from './services/db.service.js'

const app = express()
const httpServer = http.createServer(app)
app.use(cookieParser())
app.use(express.json({ limit: "5mb" }));

const fallbackDevOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const origins =
  Array.isArray(config.corsOrigins) && config.corsOrigins.length
    ? config.corsOrigins
    : fallbackDevOrigins;

app.use(
  cors({
    origin: origins,
    credentials: true,
  })
);

app.use((req, res) => {
  res.status(404).send({ error: "Not found" });
});

app.use((err, req, res, _next) => {
  loggerService.error("Server error:", err);
  res.status(err.status || 500).send({ error: err.message || "Server error" });
});

const port = process.env.PORT || 3030;

(async () => {
  try {
    // Fail fast if DB creds are wrong
    
    
    await dbService.getCollection("devcord");

    httpServer.listen(port, () => {
      loggerService.info(`Server running on port ${port}`);
    });
  } catch (err) {
    loggerService.error("Failed to start server (DB connection issue)", err);
    process.exit(1);
  }
})();