const app = require("./server");
require('dotenv').config()

//start server
const PORT = 5001;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));