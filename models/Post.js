import {Schema, model} from 'mongoose';

const postSchema = new Schema({
  postId: { type: Number, required: true, unique: true, immutable: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: {type: String}
}, { versionKey: false }) //disables the __v field

//indexes
postSchema.index({title: 1})
postSchema.index({content: 1})
postSchema.index({postId: 1})

export default model('Post', postSchema)