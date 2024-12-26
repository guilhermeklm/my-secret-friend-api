import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
})

const UserModel = mongoose.model('User', userSchema);

export { UserModel }