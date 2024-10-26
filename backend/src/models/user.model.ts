import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  _id: Schema.Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber?: string;
  account?: number;
  role: string;
  profile_img: string;
  address?: string;
  otp: string;
  passwordResetToken?: string;
  passwordResetTokenExpire?: Date;
  boughtProducts?: [name: string];
  adoptions?: [name: string];
  donations?: [name: string];
  created_at: Date;
  updated_at: Date;
}

const userSchema = new Schema<IUser>({
  firstname: {
    type: String,
    required: [true, "Хэрэглэгчийн нэрийг заавал оруулна"],
  },
  lastname: {
    type: String,
    required: [true, "Хэрэглэгчийн овог заавал оруулна"],
  },
  email: {
    type: String,
    required: [true, "Хэрэглэгчийн и-мэйлийг заавал оруулна"],
    unique: true,
  },
  password: {
    type: String,
    minlength: [8, "хэрэглэгчийн нууц үг хамгийн багадаа 8 тэмдэгт байна"],
    requied: [true, "Хэрэглэгчийн нууц үгийг заавал оруулна уу"],
  },
  phoneNumber: String,
  account: {
    type: Number,
  },
  role: {
    type: String,
    enum: ["admin", "user", "manager"],
    default: "user",
  },
  profile_img: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=3276&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  address: {
    type: String,
  },
  otp: { type: String, default: "" },
  passwordResetToken: { type: String, default: "" },
  passwordResetTokenExpire: { type: Date, default: undefined },
  boughtProducts: [{ name: String }],
  adoptions: [{ name: String }],
  donations: [{ name: String }],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  } else {
    const hashedPassword = bcrypt.hashSync(this.password.toString(), 10);
    this.password = hashedPassword;
    next();
  }
});

const User = model("User", userSchema);

export default User;
