export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

export type UserSignupCredentials = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};
export type SignupResponse = {
  message: 'User created and logged in';
  token: string;
  user: User;
};

export type UserLoginCredentials = {
  email: string;
  password: string;
};
export type LoginResponse = {
  message: 'User logged in';
  token: string;
  user: User;
};
