/** @format */

interface Auth {
  login: string;
  createAccount: string;
  username: string;
  password: string;
  fname: string;
  lname: string;
  dob: string;
}

export const enAuth: Auth = {
  login: "Login",
  createAccount: "Create Account",
  dob: "Date of birth",
  username: "Username",
  password: "Password",
  fname: "First Name",
  lname: "Last Name",
};

export const arAuth: Auth = {
  login: "تسجيل الدخول",
  createAccount: "انشاء حساب",
  dob: "تاريخ الولادة",
  username: "اسم المستخدم",
  password: "كلمة المرور",
  fname: "الاسم الاول",
  lname: "الاسم الاخير",
};
