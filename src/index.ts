import express, { Request, Response } from "express";
import bodyParser from "body-parser";
<<<<<<< Updated upstream
=======
import { productRoutes } from "./routes/products-router";
import cors, { CorsOptions } from "cors";
import { userRoutes } from "./routes/user-router";
import { authRoutes } from "./routes/user-login";
import { verifyJWT } from "./middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { refreshTokenRoute } from "./routes/refresh-router";
import { logoutRoute } from "./routes/logout-router";
import { allowedOrigins, credentials } from "./middleware/credentials";
>>>>>>> Stashed changes

const app = express();
const port = process.env.PORT || 5000;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) === -1) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
  optionsSuccessStatus: 200,
};

<<<<<<< Updated upstream
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
=======
app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/register", userRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshTokenRoute);
app.use("/logout", logoutRoute);

app.use(verifyJWT);
app.use("/products", productRoutes);
>>>>>>> Stashed changes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
