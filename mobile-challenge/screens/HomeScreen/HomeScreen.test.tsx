import React from "react";
import { render } from "@testing-library/react-native";
import HomeScreen from "./HomeScreen";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAuthContext = {
  user: { name: "Test User" },
  signIn: jest.fn(),
  signOut: jest.fn(),
};

describe("HomeScreen", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: [] });
  });

  it("renders correctly and matches snapshot", async () => {
    const { toJSON } = render(
      <NavigationContainer>
        <AuthContext.Provider value={mockAuthContext}>
          <HomeScreen />
        </AuthContext.Provider>
      </NavigationContainer>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
