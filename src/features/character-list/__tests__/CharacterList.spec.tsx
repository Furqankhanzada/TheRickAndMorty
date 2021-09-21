import * as React from "react";
import { View } from "react-native";
import { render } from "@testing-library/react-native";

describe("CharacterList", () => {
  it("placeholder", () => {
    render(<View />);
    expect(true).toBe(true);
  });
});
