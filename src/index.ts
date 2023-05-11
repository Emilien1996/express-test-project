import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { productRoutes } from "./routes/products-router";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/products',productRoutes)



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
