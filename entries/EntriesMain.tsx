import { SafeAreaView, Text, View, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const EntriesMain: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AllEntries">;
  const navigation = useNavigation<NavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SafeAreaView className="flex gap-4 w-auto">
          <Text style={styles.text} className="text-orange-500">
            Your Entries:
          </Text>

          {/* {categories && categories.length > 0 && <FlatList data={categories} keyExtractor={(item) => item.id?.toString() ?? ""} renderItem={renderItem} contentContainerStyle={styles.list} />} */}
        </SafeAreaView>
        <Button onPress={() => navigation.navigate("AddNewEntry")} title="Create new Entry" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginLeft: 32,
    marginRight: 32,
  },
  list: {
    paddingBottom: 16,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  item: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 8,
    marginVertical: 8,
  },
  itemText: {
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
    color: "#777",
  },
});

export default EntriesMain;
