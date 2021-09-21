import * as React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CharacterDetailsProps {}

export const CharacterDetails: React.FC<CharacterDetailsProps> = () => {
  return (
    <View style={styles.container}>
      <Text>CharacterDetails</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
