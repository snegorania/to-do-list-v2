// add express, and routers for users, lists and tasks
const express = require('express');
const userRouter = require('./routers/userRouts');
const listRouter = require('./routers/listRouts');
const taskRouter = require('./routers/taskRouts');
const tagRouter = require('./routers/tagRouts');
const fullListRouter = require('./routers/fullListRouts');
const errorHandler = require('./midleware/ErrorHandler');
const cors = require("cors");

// ask for port
const PORT = process.env.PORT || 8080;

// init app
const app = express();

app.use(cors());
// helps express to understand json
app.use(express.json());
// send routers to /api address
app.use('/api', listRouter);
app.use('/api', taskRouter);
app.use('/api', tagRouter);
app.use('/api', fullListRouter);

app.use(errorHandler);

// listen server
app.listen(PORT, () => console.log(`server started on port: ${PORT}`));