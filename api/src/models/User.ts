import * as mongoose from 'mongoose';
import IUser from 'typings/user';

const AddressSchema = new mongoose.Schema({
  city: String,
  country: String,
  street: String,
});

const UserSchema = new mongoose.Schema(
  {
    address: AddressSchema,
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    // password: {
    //   type: String,
    //   get: (): undefined => undefined,
    // },
    email: { type: String, required: true },
    username: { type: String, required: true },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false
      },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  },
);

UserSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author',
});

const UserModel = mongoose.model<IUser & mongoose.Document>('User', UserSchema);

export default UserModel;