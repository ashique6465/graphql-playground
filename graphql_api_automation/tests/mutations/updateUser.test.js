const { resetUsers } = require("../../src/data/users");
const graphqlRequest = require("../helpers/graphqlClient");

describe("Update User Mutation", () => {
  beforeEach(() => {
    resetUsers();
  });

  test("should update an existing user", async () => {

    const createUser = `
      mutation {
        createUser(name: "ash", email: "ashique@test.com") {
          id
          name
          email
        }
      }
    `;

    const createResponse = await graphqlRequest(
      createUser,
      {},
      "valid-token"
    );

    const userId = createResponse.body.data.createUser.id;

    const updateUser = `
      mutation {
        updateUser(id: ${userId}, name: "Updated", age: 23) {
          id
          name
          email
          age
        }
      }
    `;

    const updateResponse = await graphqlRequest(
      updateUser,
      {},
      "valid-token"
    );


    expect(updateResponse.body.data.updateUser).toEqual({
      id: userId,
      name: "Updated",
      email: "ashique@test.com",
      age: 23,
    });
  });
});
