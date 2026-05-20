export const validators = {
  name: (name) => name.value.trim().split(/\s+/).length >= 2,
  phone: (phone) => /^0\d{10}$/.test(phone.value.trim()),
  password: (password1) =>
    /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password1.value.trim()),
  password_confirm: (password1, password2) =>
    password1.value.trim() === password2.value.trim(),
  email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()),
};
