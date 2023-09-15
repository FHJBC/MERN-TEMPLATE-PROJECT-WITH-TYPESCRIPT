interface IUser {
  _id: string;
  firstName: string;
  lastName?: string;
  fullName?: string;
  username: string;
  email: string;
  photo?: string;
  address?: {
    street: string,
    city: string,
  };
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

export default IUser;