import express from "express";
import cors from "cors";
import { router } from "./src/router/router.js";
import { authRouter } from "./src/router/authRouter.js";

const port = 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (request, response) => {
  response.send({ state: "up", message: "Server is healthy" });
});

app.use("/auth", authRouter);

app.use("/api", router);

app.listen(port, () =>
  console.log("Server running, listening on port: " + port)
);
