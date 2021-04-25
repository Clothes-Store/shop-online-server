const express = require("express");
const http = require("http");
const cors = require("cors");
const config = require("config");

const routers = require('./routers');

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(cors());
app.options("*", cors());

app.use('/api/category', routers.CategoryRouter);
app.use('/api/city', routers.CityRouter);
app.use('/api/province', routers.ProvinceRouter);
app.use('/api/collection', routers.CollectionRouter);
app.use('/api/notice', routers.NoticeRouter);
app.use('/api/product', routers.ProductRouter);
app.use('/api/order', routers.OrderRouter);

const server = http.createServer(app);
const PORT = config.get("server.port") || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
