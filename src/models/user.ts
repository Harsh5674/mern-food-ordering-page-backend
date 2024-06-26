import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    _id: string;
  auth0Id: string;
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
  country?: string;
}

const userSchema: Schema<IUser> = new Schema({
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;
