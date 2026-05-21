export interface CUser {
  name: string,
  email: string,
  password: string,
  role: "contributor" | "maintainer"
}

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};
// export type User = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   created_at: Date;
//   updated_at: Date;
// };

