import express from "express";
import routerPeliculas from "./routes/router";
import bodyParser from 'body-parser';

const app = express();

app.listen(3001, () => {
    console.log("Te escucho insecto");
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api",routerPeliculas);