import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { productRoutes } from "./routes/products-router";
import cors, { CorsOptions } from "cors";
import { userRoutes } from "./routes/user-router";
import { authRoutes } from "./routes/user-login";
import { verifyJWT } from "./middleware/verifyJWT";
import cookieParser from "cookie-parser";
import { refreshTokenRoute } from "./routes/refresh-router";
import { logoutRoute } from "./routes/logout-router";
import { allowedOrigins, credentials } from "./middleware/credentials";

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

// app.use(credentials);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
