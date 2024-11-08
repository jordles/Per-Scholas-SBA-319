import {Schema, model} from 'mongoose';

const loginSchema = new Schema({
  loginId: { type: Number, required: true, unique: true, immutable: true },
  username: { type: String, required: true },
  password: { type: String, minLength: 5, required: true },
  salt: { type: String, required: true, unique: true},
  sha256: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', immutable: true }
}, { versionKey: false }); //disables the __v field

loginSchema.index({username: 1})
loginSchema.index({password: 1})
loginSchema.index({user: 1})
loginSchema.index({email: 1})

export default model('Login', loginSchema)