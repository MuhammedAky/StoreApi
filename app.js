require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./database/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleware = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());

// routes
app.get("/", (req,res) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products'>products route</a>");
});

app.use("/api/v1/products", productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connectDB
        await connectDB("mongodb://127.0.0.1/storeapi");
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (err) {
        console.log(err);
    }
};

start();