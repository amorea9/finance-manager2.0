import { SafeAreaView, Text, View, StyleSheet, Button, TouchableOpacity, FlatList, Alert } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchEntries, removeEntry } from "@/store/entrySlice";
import { EntryEntity } from "./EntryEntity";

const EntriesMain: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AllEntries">;
  const navigation = useNavigation<NavigationProp>();

  const entries = useSelector((state: RootState) => state.entry.entries);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch categories on categories change
  useEffect(() => {
    dispatch(fetchEntries());
  }, []);

  // Render a single category item
  const renderItem = ({ item }: { item: EntryEntity }) => (
    <TouchableOpacity onPress={() => onRemoveEntry(item.id as number)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
        {(item.amount || item.currency) && (
          <View className="h-full flex justify-around py-8">
            <Text style={styles.label}>Entry details:</Text>
            <Text style={styles.itemText}>Amount: {item.amount}</Text>
            <Text style={styles.itemText}>{item.currency}</Text>
          </View>
        )}
        {item.date && <Text style={styles.itemText}>{item.date}</Text>}
        {item.paymentMethod && <Text style={styles.itemText}>{item.paymentMethod}</Text>}
        <Text style={styles.itemText}>{item.categoryId}</Text>
      </View>
    </TouchableOpacity>
  );

  const onRemoveEntry = async (id: number) => {
    // You might want to show a confirmation before removing a category
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this entry?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await dispatch(removeEntry(id));
          dispatch(fetchEntries());
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView className="w-auto mt-16">
        <Text style={styles.text} className="text-orange-500">
          Your Entries:
        </Text>

        {entries && entries.length > 0 && <FlatList data={entries} keyExtractor={(item) => item.id?.toString() ?? ""} renderItem={renderItem} contentContainerStyle={styles.list} />}
      </SafeAreaView>

      <Button onPress={() => navigation.navigate("AddNewEntry")} title="Create new Entry" />
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
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  item: {
    flex: 1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "center",
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
