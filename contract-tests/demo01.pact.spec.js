const path = require("path");
const {
  PactV3,
  MatchersV3,
  SpecificationVersion,
} = require("@pact-foundation/pact");
const { eachLike, like } = MatchersV3;
const getUser  = require("./node_modules/shared/dist/api");

describe("Pact contract test between frontend and backend", () => {
  const provider = new PactV3({
    consumer: "frontend",
    provider: "backend",
    dir: path.resolve(process.cwd(), "pacts"),
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "info",
  });

  const user1 = { id: 1, name: "Somkiat Pui" };
  const SUCCESS_EXPECTED_BODY = MatchersV3.like(user1);
  const NOTFOUND_EXPECTED_BODY = MatchersV3.like({ message: "User not found" });

  describe("when a call to the API is made to get user by id", () => {
    it("should receive the user details from the API", async () => {
      // set up Pact interactions
      await provider.addInteraction({
        states: [{ description: "user exist" }],
        uponReceiving: "get user by id",
        withRequest: {
          method: "GET",
          path: "/users/1",
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: like({
            id: 1,
            name: "Somkiat Pui",
          }),
        },
      });

      await provider.executeTest(async (mockserver) => {
        process.env.BACKEND_URL = mockserver.url;
        const user = await getUser(1);
        expect(user).toEqual({ id: 1, name: "Somkiat Pui" });
      });
    });

    it("should receive user not found message from the API", async () => {
      // set up Pact interactions
      await provider.addInteraction({
        states: [{ description: "user not exist in system" }],
        uponReceiving: "get user by id",
        withRequest: {
          method: "GET",
          path: "/users/2",
        },
        willRespondWith: {
          status: 404,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          body: like({
            message: "User not found",
          }),
        },
      });

      await provider.executeTest(async (mockserver) => {
        process.env.BACKEND_URL = mockserver.url;
        const user = await getUser(2);
        expect(user).toEqual({ message: "User not found" });
      });
    });
  });
});
