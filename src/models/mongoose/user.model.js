import { model, Schema, VirtualType } from "mongoose";

// TODO: completar relacion embebida y configurar el virtuals para el populate inverso con assets

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 20,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["secretary", "administrator"],
      default: "secretary",
    },
    // ! FALTA COMPLETAR ACA
    profile:{
      first_name:{type: String, required: true},
      last_name:{type: String, required: true},
      employee_number:{type: String, required: true},
      phone:{type: String, optional: true}
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// ! FALTA COMPLETAR ACA


export const UserModel = model("Users", UserSchema);
