import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req: Request, res: Response) => {
  const helloMessage = "hi there how are you";
  res.send(helloMessage);
});

const products = [
  {
    id: 1,
    name: "toy",
    price: 100,
  },
  {
    id: 5,
    name: "tomato",
    price: 100,
  },
];

app.get("/products", (req: Request, res: Response) => {
  const title = req.query.title;
  if (title) {
    const filteredProducts = products.filter((p) =>
      p.name.includes(title as string)
    );
    res.send(filteredProducts);
  }
  res.send(products);
});

app.get("/products/:title", (req: Request, res: Response) => {
  const product = products.find((p) => p.name === req.params.title);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send("not found");
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  if (id) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === +id) {
        products.splice(i, 1);
        res.status(201).send("success");
        return;
      }
    }
  }
  res.status(404).send('product not found ');
});

app.post("/products", (req : Request ,res : Response) => {
  const newProduct = req.body
   products.push(newProduct)
  res.status(201).send(products)
})

app.put("/products/:id", (req : Request , res : Response) => {
  const id = req.params.id
  const title = req.body.title
  const modifiedproduct = products.find(p => p.id === +id)
  if(modifiedproduct) {
    modifiedproduct.name = title
    res.send(modifiedproduct)
  } else {
    res.status(404).send('not found')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
