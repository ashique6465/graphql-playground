const graphqlRequest = require("../helpers/graphqlClient");
const { resetUsers } = require("../../src/data/users");

describe("Delete User Mutation", () => {
  beforeEach(() => {
    resetUsers();
  });

  test("should delete an existing user", async () => {

    const createUserMutation = `
      mutation {
        createUser(name: "ash", email: "ash@test.com") {
          id
          name
          email
        }
      }
    `;

    const createRes = await graphqlRequest(
      createUserMutation,
      {},
      "valid-token"
    );

    const userId = createRes.body.data.createUser.id;


    const deleteUserMutation = `
      mutation {
        deleteUser(id: ${userId}) {
          id
          name
          email
        }
      }
    `;

    const deleteRes = await graphqlRequest(
      deleteUserMutation,
      {},
      "valid-token"
    );

    expect(deleteRes.statusCode).toBe(200);
    expect(deleteRes.body.data.deleteUser).toEqual({
      id: userId,
      name: "ash",
      email: "ash@test.com",
    });
  });
});
