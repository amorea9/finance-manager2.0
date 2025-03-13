import { Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const EntriesMain: React.FC = () => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <View>
      <Text>EntriesMain</Text>
    </View>
  );
};

export default EntriesMain;
