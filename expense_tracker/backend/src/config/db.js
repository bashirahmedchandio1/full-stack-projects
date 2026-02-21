import mongoose from "mongoose";

export default async function ConnectDB(uri) {
  await mongoose
    .connect(uri)
    .then(() => console.log("db connected successfully ✅"))
    .catch((e) => console.log(e));
}
