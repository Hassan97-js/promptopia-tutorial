import { Schema, model, models, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username invalid, it should contain alphanumeric letters and be unique!"
      ]
    },
    email: { type: String, unique: true, required: true },
    image: String
  },
  {
    timestamps: true
  }
);

export type MongoUser = InferSchemaType<typeof userSchema>;

const userModel = models.User || model("User", userSchema);

export default userModel;
