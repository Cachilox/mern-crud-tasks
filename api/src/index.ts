require('dotenv').config()
import app from "./app";
import { PORT } from "./config";
import { connectDB } from "./db";

connectDB();
app.listen(PORT, () => console.log(`Server on Port ${PORT}`));
