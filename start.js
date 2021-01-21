const app = require("./server");
require('dotenv').config()

//start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));