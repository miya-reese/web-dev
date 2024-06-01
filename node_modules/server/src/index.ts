// src/index.ts
import express, { Request, Response } from "express";
import path from "path";
import profiles from "./routes/profiles";
import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";

connect("cluster0"); // use your own db name here

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";
console.log("static files", staticDir);

app.use(express.static(staticDir));
app.use(express.json());

app.use("/auth", auth);

const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

app.use("/api/profiles", authenticateUser, profiles);

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");}
);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});