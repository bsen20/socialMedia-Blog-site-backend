import Post from "../models/Post.js";
import User from "../models/User.js";

//create post
export const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update Post
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post has been updated");
    } else {
      res.status(403).json("you can only update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete post
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Post has been Deleted");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//like / dislike a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("post has been likes");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("post has been dislikes");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getParticularPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTimelinePosts = async (req, res) => {
  let postArray = [];
  try {
    const currentUser = await User.findById(req.body.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const user = await User.findById(req.body.comment.userId);
    if (user) {
      try {
        const post = await Post.findById(req.params.id);
        await post.updateOne({ $push: { comments: req.body.comment } });
        res.status(200).json("Successfully commented");
      } catch (error) {
        res.status(500).json(error);
      }
    }
  } catch (error) {
    res.status(403).json("You need to signin first to comment");
  }
};

export const getAllCommentsOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const allComments = await Promise.all(
      post.comments.map((comment) => {
        return comment;
      })
    );
    res.status(200).json(allComments);
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete comments
// router.delete("/:id/comment/delete", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     const commentToDelete = post.comments.map((comment) => {
//       if (
//         comment._id === req.body.commentId &&
//         comment.userId === req.body.userId
//       )
//         return comment;
//     });
//     if (commentToDelete) {
//       await post.comments.updateOne({
//         $pull: { comments: req.body.commentToDelete },
//       });
//       res.status(200).json("Comment delete successfully");
//     } else {
//       res.status(403).json("Comment cant be delete ");
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
