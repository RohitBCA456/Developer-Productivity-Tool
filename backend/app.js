import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { developerRouter } from "./src/routers/developer.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["POST", "GET", "OPTIONS"],
    allowedHeaders: ["Content-Type", "application/json"],
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/developer", developerRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT}`);
});
