import faker from "faker";

export const closeDB = (promises: any[]) => {
  Promise.all(promises)
    .then(() => {
      console.log("seeding successful");
      process.exit(0);
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

export function createChannel() {
  return {
    name: faker.lorem.words(),
  };
}

export function createMessage() {
  return {
    text: faker.lorem.paragraph(5),
  };
}

export function createUser() {
  return {
    name: faker.lorem.words(),
    email: faker.lorem.word(),
    password: faker.lorem.word(),
    avatar: faker.image.avatar(),
  };
}
