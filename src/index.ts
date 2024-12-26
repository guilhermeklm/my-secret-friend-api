import app from "./app";
import dotenv from "dotenv";
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});