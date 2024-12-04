// Validate account: 4-6 digits, not empty
const validateAccount = (account) => {
  const regex = /^\d{4,6}$/;
  return regex.test(account);
};

// Validate name: only letters, not empty
const validateName = (name) => {
  const regex = /^[A-Za-z\s]+$/;
  return regex.test(name);
};

// Validate email: correct format, not empty
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate password: 6-10 characters, at least 1 digit, 1 uppercase, 1 special character, not empty
const validatePassword = (password) => {
  const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/;
  return regex.test(password);
};

// Validate date: not empty, format mm/dd/yyyy
const validateDate = (date) => {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
  return regex.test(date);
};

// Validate salary: 1,000,000 - 20,000,000, not empty
const validateSalary = (salary) => {
  return salary >= 1000000 && salary <= 20000000;
};

// Validate role: must be one of the valid roles
const validateRole = (role) => {
  const validRoles = ["Sếp", "Trưởng phòng", "Nhân viên"];
  return validRoles.includes(role);
};

// Validate hours worked: 80 - 200 hours, not empty
const validateHoursWorked = (hoursWorked) => {
  return hoursWorked >= 80 && hoursWorked <= 200;
};

export {
  validateAccount,
  validateName,
  validateEmail,
  validatePassword,
  validateDate,
  validateSalary,
  validateRole,
  validateHoursWorked
};
