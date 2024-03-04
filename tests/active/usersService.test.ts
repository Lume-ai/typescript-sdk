import { UserService } from "../../src/services/UsersService";
import { API_KEY } from "../api_key";

describe('UserService', () => {
  let userService: UserService;

  // Before running the tests, create an instance of UserService
  beforeAll(() => {
    const apiKey = API_KEY; // Replace with your actual API key
    userService = new UserService(apiKey);
  });

  describe('getUserDetails', () => {
    test('should return user details', async () => {
      const userDetails = await userService.getUserDetails();

      // Assuming userDetails contains some expected data
      expect(userDetails).toBeDefined();
      // Add more assertions based on the expected structure of userDetails
    });
  });

  // Add more tests for other methods of UserService
});
