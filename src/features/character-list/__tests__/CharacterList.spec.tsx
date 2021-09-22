import * as React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { render, waitFor } from "@testing-library/react-native";
import { CharacterList } from "../CharacterList";
import { GET_CHARACTERS } from "../../../requests/characters";

const mockCharactersData = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1 },
  },
  result: {
    data: {
      characters: {
        info: {
          count: 4,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            id: "1",
            name: "Rick Sanchez",
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          },
          {
            id: "2",
            name: "Morty Smith",
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          },
          {
            id: "3",
            name: "Summer Smith",
            image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
          },
          {
            id: "4",
            name: "Beth Smith",
            image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
          },
        ],
      },
    },
  },
};

describe("CharacterList", () => {
  it("should render and show progress on loading", () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mockCharactersData]}>
        <CharacterList />
      </MockedProvider>,
    );
    expect(wrapper.queryByTestId("loading")).toBeTruthy();
  });
  it("should render FlatList when loading is false", async () => {
    const wrapper = render(
      <MockedProvider addTypename={false} mocks={[mockCharactersData]}>
        <CharacterList />
      </MockedProvider>,
    );
    await waitFor(() => {
      expect(wrapper.queryByTestId("loading")).toBeFalsy();
    });
    expect(wrapper.queryByTestId("flat-list")).toBeTruthy();
  });
});
