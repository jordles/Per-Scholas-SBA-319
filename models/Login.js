import {Schema, model} from 'mongoose';

const loginSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true, unique: true },
  sha256: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { versionKey: false }); //disables the __v field

export default model('Login', loginSchema)