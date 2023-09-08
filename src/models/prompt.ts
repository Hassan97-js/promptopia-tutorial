import { InferSchemaType, Schema, model, models } from "mongoose";

const promptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  }
});

export type MongoPrompt = InferSchemaType<typeof promptSchema>;

const Prompt = models.Prompt || model("Prompt", promptSchema);

export default Prompt;
