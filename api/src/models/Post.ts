import * as mongoose from 'mongoose';
import IPost from 'typings/post';

const PostSchema = new mongoose.Schema({
  author: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  content: String,
  title: String,
});

const PostModel = mongoose.model<IPost & mongoose.Document>('Post', PostSchema);

export default PostModel;