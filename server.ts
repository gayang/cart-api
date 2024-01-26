import app from "./index";
import cors from "cors";

const PORT = 8080;
//app.use(cors());

app.listen(PORT, () => {
  console.log(`app is running at localhost:${PORT}`);
});
