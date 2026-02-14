export default {
  dbURL: process.env.DB_URL,
  dbName: process.env.DB_NAME || "Devcord",
  corsOrigins: (process.env.CORS_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
};
