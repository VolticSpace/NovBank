import { validators } from "./validators.js";
export const validateSignup = function (inputs) {
  const errors = {};
  if (!validators.name(inputs.name))
    errors.name = "Enter firstname and lastname";
  if (!validators.phone(inputs.phoneNo))
    errors.phoneNo = "Invalid phone number";
  if (!validators.password(inputs.password)) errors.password = "Weak password";
  if (!validators.password_confirm(inputs.password, inputs.confirm_password))
    errors.confirm_password = "passwords mismatch";
  if (!validators.email(inputs.email)) errors.email = "Invalid Email";
  return errors;
};
