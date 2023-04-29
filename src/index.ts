import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "hi there how are you";
  res.send(helloMessage);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
