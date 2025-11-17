import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  image?: string;
  author: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
