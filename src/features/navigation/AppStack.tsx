import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { CharacterList } from "../character-list/CharacterList";
import { CharacterDetails } from "../character-details/CharacterDetails";

export type AppStackParamsList = {
  CharacterList: undefined;
  CharacterDetails: undefined;
};

const Stack = createStackNavigator<AppStackParamsList>();

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="CharacterList">
      <Stack.Screen name="CharacterList" component={CharacterList} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
    </Stack.Navigator>
  );
};
