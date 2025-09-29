import { body } from "express-validator";
import { UserModel } from "../../models/mongoose/user.model.js";
export const registerValidation = [
  // TODO: completar las validaciones para el registro
  // registerValidation:
  // ● username: 3-20 caracteres, alfanumérico, único
  body("username")
  .notEmpty().withMessage("campo obligatorio")
  .isAlphanumeric().withMessage("el campo debe de ser alfanumerico")
  .isLength({min: 3, max: 20}).withMessage("el campo debe de tener una longitud de 3-20 caracteres")
  .custom(async (value)=>{
    const user = await UserModel.findOne({
      username: value
    });
    if(user){
      throw new Error("el username ya esta en uso");
      
    }
    return true;
  }),
  // ● email: formato válido, único
  body("email")
  .notEmpty()
  .isString().withMessage("el campo debe de ser un string")
  .isEmail().withMessage("el campo debe de ser un email valido")
  .custom(async (value)=>{
    const user = await UserModel.findOne({
      email: value
    });
    if(user){
      throw new Error("el email ya esta asociado");
      
    }
  }),
  // ● password: mínimo 8 caracteres, mayúscula, minúscula y número
  body("password")
    .notEmpty().withMessage("el campo no puede ser nulo")
    .isString().withMessage("el campo debe de ser un string")
    .isLength({min:8}).withMessage("el campo debe de tener 8 caracteres minimos")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).withMessage("el campo debe de contener una mayuscula, una minuscula y almenos un numero"),
  // ● role: valores permitidos ('secretary', 'administrator')
  body("role")
  .optional()
  .isString().withMessage("el campo debe de ser un string")
  .isIn(["secretary", "administrator"]).withMessage("el campo debe de ser solo secretary o administrator"),
  // ● employee_number: formato específico, único, obligatorio
  body("profile.employeeNumber")
  .notEmpty().withMessage("el campo es obligatorio")
  .isString().withMessage("el campo debe de ser un string")
  .custom(async (value)=>{
    const user = await UserModel.findOne({
      profile:{
        employee_number: value
      }
    });
    if(user){
      throw new Error("la id del empleado ya existe");
      
    }
  }),
  // ● first_name y last_name: 2-50 caracteres, solo letras
  body("profile.firstName")
  .notEmpty().withMessage("el campo es obligatorio")
  .isLength({min: 2, max: 50}).withMessage("el campo debe de tener entre 2 a 50 caracteres")
  .matches(/^[A-Za-z]+$/).withMessage("el campo debe de tener solo letras"),
  body("profile.lastName")
  .notEmpty().withMessage("el campo es obligatorio")
  .isLength({min: 2, max: 50}).withMessage("el campo debe de tener entre 2 a 50 caracteres")
  .matches(/^[A-Za-z]+$/).withMessage("el campo debe de tener solo letras"),
  // ● phone: formato válido (opcional)
  body("profile.phone")
  .optional()
  .isMobilePhone().withMessage("el campo debe de ser un numero valido")
];

export const loginValidation = [
  // TODO: completar las validaciones para el login
];
