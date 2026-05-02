const express = require("express");
const logger = require("../logging_middleware/logger");
const notificationRoutes = require("./routes/notifications");

const app = express();

app.use(express.json());
app.use(logger); 

app.use("/notifications", notificationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});