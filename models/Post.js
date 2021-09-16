import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      max: 500,
    },
    img: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: [
      {
        userId: {
          type: String,
          required: true,
        },
        desc: {
          type: String,
          max: 100,
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);
const Post = new mongoose.model("Post", PostSchema);
export default Post;
