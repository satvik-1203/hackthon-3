export default interface IUser {
  name: string;
  email: string;
  password: string;
  todo?: {
    id: string;
    todo: string;
  }[];
}
