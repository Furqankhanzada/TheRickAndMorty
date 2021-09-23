import * as React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { CharacterListItem } from "../CharacterListItem";
import { ReactTestInstance } from "react-test-renderer";

const mockCharacterData: any = {
  id: 1,
  name: "Rick Sanchez",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
};

const navigation: any = {
  navigate: jest.fn(),
};

describe("CharacterListItem", () => {
  it("should render and show item", () => {
    const wrapper = render(<CharacterListItem character={mockCharacterData} navigation={navigation} />);
    expect(wrapper.queryByTestId("list-item")).toBeTruthy();
  });
  it("should have character name", () => {
    const wrapper = render(<CharacterListItem character={mockCharacterData} navigation={navigation} />);
    expect(wrapper.getByText("Rick Sanchez")).toBeTruthy();
  });
  it("should navigate on item press", () => {
    const wrapper = render(<CharacterListItem character={mockCharacterData} navigation={navigation} />);
    fireEvent.press(wrapper.queryByTestId("list-item") as ReactTestInstance);
  });
});
