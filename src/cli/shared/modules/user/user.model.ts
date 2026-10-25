import {Schema, Document, model} from 'mongoose';
import {User, UserTypes} from '../../types/index.js';
import {createSHA256} from '../../helpers/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
  setPassword(password: string, salt: string): void;
  getPassword(): string;
}

const userSchema = new Schema<UserDocument>({
  name: {type: String, required: true, minlength: [2, 'Min length for firstname is 2']},
  email: {type: String, required: true, unique: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],},
  photoUrl: String,
  password: {type: String, required: true, minlength: [8, 'Min length for password is 8']},
  type: {
    type: String,
    enum: UserTypes,
    required: true,
  },
}, {
  timestamps: true,
});

userSchema.method('setPassword', function (this: UserDocument, password: string, salt: string) {
  this.password = createSHA256(password, salt);
});

userSchema.method('getPassword', function (this: UserDocument) {
  return this.password;
});

export const UserModel = model<UserDocument>('User', userSchema);
