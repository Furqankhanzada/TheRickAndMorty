import * as React from "react";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";

import { CharacterList } from "../character-list/CharacterList";
import { CharacterDetails } from "../character-details/CharacterDetails";
import { RouteProp } from "@react-navigation/native";

type AppStackParamsList = {
  CharacterList: undefined;
  CharacterDetails: { id: number };
};
export type CharacterListScreenNavigationProp = StackNavigationProp<AppStackParamsList, "CharacterList">;
export type CharacterDetailsScreenNavigationProp = StackNavigationProp<AppStackParamsList, "CharacterDetails">;
export type CharacterDetailsScreenRouteProp = RouteProp<AppStackParamsList, "CharacterDetails">;

const Stack = createStackNavigator<AppStackParamsList>();

export const AppStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="CharacterList">
      <Stack.Screen name="CharacterList" component={CharacterList} />
      <Stack.Screen name="CharacterDetails" component={CharacterDetails} />
    </Stack.Navigator>
  );
};
