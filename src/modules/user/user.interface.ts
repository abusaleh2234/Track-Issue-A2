export interface CUser {
  name: string,
  email: string,
  password: string,
  role: "contributor" | "maintainer"
}
