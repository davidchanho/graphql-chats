import { users } from "../../data";

export const navigation = [
  {
    name: "Members",
    current: false,
    children: users,
  },
  {
    name: "Organizations",
    current: false,
    children: users,
  },
  {
    name: "Pinned",
    current: false,
    children: users,
  },
  {
    name: "Shortcuts",
    current: false,
    children: users,
  },
];
