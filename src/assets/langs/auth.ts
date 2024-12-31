/** @format */

interface Auth {
  login: string;
  createAccount: string;
  email: string;
  password: string;
  fname: string;
  lname: string;
  dob: string;
}

export const enAuth: Auth = {
  login: "Login",
  createAccount: "Create Account",
  dob: "Date of birth",
  email: "Email",
  password: "Password",
  fname: "First Name",
  lname: "Last Name",
};

export const arAuth: Auth = {
  login: "تسجيل الدخول",
  createAccount: "انشاء حساب",
  dob: "تاريخ الولادة",
  email: "البريد الالكتروني",
  password: "كلمة المرور",
  fname: "الاسم الاول",
  lname: "الاسم الاخير",
};
