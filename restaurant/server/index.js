const express = require('express');
const cors = require('cors');
const menuRouter = require('./routes/menu.routes');
const dishRouter = require('./routes/dish.routes');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.disable('etag');
app.use(express.json());
app.use('/api', menuRouter);
app.use('/api', dishRouter);

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
