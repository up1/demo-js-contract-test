const path = require("path");
const {
  PactV4,
  MatchersV3,
  SpecificationVersion,
} = require("@pact-foundation/pact");
const { getUser } = require("./node_modules/shared/api");

describe("Pact contract test between frontend and backend", () => {
  const provider = new PactV4({
    consumer: "frontend",
    provider: "backend",
    dir: path.resolve(process.cwd(), "pacts"),
    log: path.resolve(process.cwd(), "logs", "pact.log"),
    logLevel: "info",
    spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
  });

  const user1 = { id: 1, name: "Somkiat Pui" };
  const SUCCESS_EXPECTED_BODY = MatchersV3.like(user1);
  const NOTFOUND_EXPECTED_BODY = MatchersV3.like({ message: "User not found" });

  describe("when a call to the API is made to get user by id", () => {
    it("should receive the user details from the API", async () => {
      const p = provider
        .addInteraction()
        .given("I have a user")
        .uponReceiving("a request for user with id 1")
        .withRequest("GET", "/users/1")
        .willRespondWith(200, (builder) => {
          builder.headers({ "Content-Type": "application/json" });
          builder.jsonBody(SUCCESS_EXPECTED_BODY);
        });

      return p.executeTest(async (mockserver) => {
        process.env.BACKEND_URL = mockserver.url;
        const user = await getUser(1);
        expect(user).toEqual({ id: 1, name: "Somkiat Pui" });
      });
    });

    it("should receive user not found message from the API", async () => {
        const p = provider
          .addInteraction()
          .given("I not have a user in service")
          .uponReceiving("a request for user with id 2")
          .withRequest("GET", "/users/2")
          .willRespondWith(404, (builder) => {
            builder.headers({ "Content-Type": "application/json" });
            builder.jsonBody(NOTFOUND_EXPECTED_BODY);
          });
  
        return p.executeTest(async (mockserver) => {
          process.env.BACKEND_URL = mockserver.url;
          const user = await getUser(2);
          expect(user).toEqual({ message: "User not found"});
        });
      });
  });
});
