import * as React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { GET_CHARACTER } from "../../../requests/characters";
import { MockedProvider } from "@apollo/client/testing";
import { CharacterDetails } from "../CharacterDetails";

const mockCharacterData = {
  request: {
    query: GET_CHARACTER,
    variables: { id: 1 },
  },
  result: {
    data: {
      character: {
        id: "1",
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        species: "Human",
        gender: "Male",
        episode: [
          {
            id: "1",
            name: "Pilot",
            air_date: "December 2, 2013",
          },
          {
            id: "2",
            name: "Lawnmower Dog",
            air_date: "December 9, 2013",
          },
          {
            id: "3",
            name: "Anatomy Park",
            air_date: "December 16, 2013",
          },
          {
            id: "4",
            name: "M. Night Shaym-Aliens!",
            air_date: "January 13, 2014",
          },
          {
            id: "5",
            name: "Meeseeks and Destroy",
            air_date: "January 20, 2014",
          },
        ],
      },
    },
  },
};

const navigation: any = {
  navigate: jest.fn(),
};

const route: any = {
  params: {
    id: 1,
  },
};

describe("CharacterDetails", () => {
  it("should render and show progress on loading", () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mockCharacterData]}>
        <CharacterDetails navigation={navigation} route={route} />
      </MockedProvider>,
    );
    expect(wrapper.queryByTestId("loading")).toBeTruthy();
  });
  it("should render FlatList when loading is false", async () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mockCharacterData]}>
        <CharacterDetails navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(wrapper.queryByTestId("loading")).toBeFalsy();
    });
    expect(wrapper.queryByTestId("flat-list")).toBeTruthy();
  });
  it("should render episodes", async () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mockCharacterData]}>
        <CharacterDetails navigation={navigation} route={route} />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(wrapper.getByText("Lawnmower Dog")).toBeTruthy();
    });
  });
});
