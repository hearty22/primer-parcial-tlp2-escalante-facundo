import { hashPassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/mongoose/user.model.js";

export const register = async (req, res) => {
  try {
    // TODO: crear usuario con password hasheada y profile embebido
    const {username, email, password, role} = req.body
    const {employeeNumber, firstName, lastName, phone} = req.body.profile;
    const hashPass = await hashPassword(password);
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: hashPass,
      role: role,
      profile:{
        employee_number: employeeNumber,
        first_name: firstName,
        last_name: lastName,
        phone: phone
      }
    });


    return res.status(201).json({ msg: "Usuario registrado correctamente",
      user: newUser
     });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    // TODO: buscar user, validar password, firmar JWT y setear cookie httpOnly
    return res.status(200).json({ msg: "Usuario logueado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const getProfile = async (req, res) => {
  try {
    // TODO: devolver profile del user logueado actualmente
    return res.status(200).json({ data: profile });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token");
  return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
