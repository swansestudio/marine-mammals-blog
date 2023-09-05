import express from "express";
import cors from "cors";
import routes from "./router/routes.mjs";

const PORT = process.env.PORT || 8800;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/posts", routes);


// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});



