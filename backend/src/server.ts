import "dotenv/config";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { prisma } from "./lib/prisma";

const app = express();

const PORT = Number(process.env["PORT"] || 8080);

const FRONTEND_URL =
  process.env["FRONTEND_URL"] || "http://localhost:3000";


// ============================================================
// SECURITY / MIDDLEWARE
// ============================================================

app.disable("x-powered-by");

app.use(helmet());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());


// ============================================================
// API HEALTH CHECK
// ทดสอบว่า Express Server ทำงานหรือไม่
// ============================================================

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "GIS2026 API is running",
    timestamp: new Date().toISOString(),
  });
});


// ============================================================
// DATABASE HEALTH CHECK
// ทดสอบ Express -> Prisma -> MySQL
// ============================================================

app.get("/api/health/db", async (_req, res) => {
  try {
    // ทดสอบ connection
    await prisma.$queryRaw`SELECT 1`;

    // ทดสอบอ่าน table จริง
    const userCount = await prisma.user.count();

    return res.status(200).json({
      success: true,
      database: "connected",
      databaseName:
        process.env["DATABASE_NAME"] || "gisgroup_cms_v2",
      userCount,
      message: "MySQL connection successful",
    });
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      database: "disconnected",
      message: "Cannot connect to MySQL",
    });
  }
});


// ============================================================
// 404
// ============================================================

app.use((_req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});


// ============================================================
// START SERVER
// ============================================================

const server = app.listen(PORT, () => {
  console.log("");
  console.log("========================================");
  console.log(" GIS2026 Backend API");
  console.log("========================================");
  console.log(` Server   : http://localhost:${PORT}`);
  console.log(` Health   : http://localhost:${PORT}/api/health`);
  console.log(` Database : http://localhost:${PORT}/api/health/db`);
  console.log("========================================");
  console.log("");
});


// ============================================================
// GRACEFUL SHUTDOWN
// ============================================================

async function shutdown(signal: string) {
  console.log(`\n${signal} received. Shutting down...`);

  server.close(async () => {
    await prisma.$disconnect();

    console.log("Database disconnected.");
    console.log("Server stopped.");

    process.exit(0);
  });
}

process.on("SIGINT", () => {
  void shutdown("SIGINT");
});

process.on("SIGTERM", () => {
  void shutdown("SIGTERM");
});