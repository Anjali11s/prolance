const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')
const UserRouter = require('./Routes/UserRouter')
const ProjectRouter = require('./Routes/ProjectRouter')
require('dotenv').config();
require('./Models/db')
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', AuthRouter)
app.use('/api/users', UserRouter)
app.use('/api/projects', ProjectRouter)

app.listen(PORT, () => {
    console.log(`Sever is running on http://localhost:${PORT}`)
})