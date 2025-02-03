import { User } from "@prisma/client";

const fakeUsers: User[] = [
  {
    id: "1",
    name: "John",
    email: "j@j.com",
    password: "Password1@",

    role: "USER",
    bio: null,
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Doe",
    email: "d@d.com",
    password: "Password2@",
    bio: null,

    role: "USER",
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Alice",
    email: "a@a.com",
    password: "Password3@",
    role: "USER",
    bio: null,
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Bob",
    email: "b@b.com",
    password: "Password4@",

    role: "USER",
    bio: null,
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Charlie",
    email: "c@c.com",
    password: "Password5@",

    role: "USER",
    bio: null,
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Eve",
    email: "e@e.com",
    password: "Password6@",

    role: "USER",
    bio: null,
    profilePicture: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getFakeUsers = () => fakeUsers;
