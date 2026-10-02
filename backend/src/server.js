const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), "..", ".env") });
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { mockAuthenticate } = require("./middleware/authMiddleware");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || "http://localhost:3000",
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "ayutrac-api",
  });
});

app.use("/api", mockAuthenticate);

app.use("/api/studies", require("./routes/studyRoutes"));
app.use("/api/participants", require("./routes/participantRoutes"));
app.use("/api/safety", require("./routes/safetyRoutes"));
app.use("/api/regulatory", require("./routes/regulatoryRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));

app.use(notFound);
app.use(errorHandler);

module.exports = app;