import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { CategoryEntity } from "./CategoryEntity";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchCategories, removeCategory } from "../store/categorySlice";

const CategoryList: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AllCategories">;
  const navigation = useNavigation<NavigationProp>();
  const categories = useSelector((state: RootState) => state.category.categories);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch categories on categories change
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onRemoveCategory = async (id: number) => {
    // You might want to show a confirmation before removing a category
    Alert.alert("Confirm Deletion", "Are you sure you want to delete this category?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          await dispatch(removeCategory(id));
          // dispatch(fetchCategories());
        },
      },
    ]);
  };

  // Render a single category item
  const renderItem = ({ item }: { item: CategoryEntity }) => (
    <TouchableOpacity onPress={() => onRemoveCategory(item.id as number)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SafeAreaView className="flex gap-4 w-auto">
          <Text style={styles.text} className="text-orange-500">
            Your categories:
          </Text>

          {categories && categories.length > 0 && <FlatList data={categories} keyExtractor={(item) => item.id?.toString() ?? ""} renderItem={renderItem} contentContainerStyle={styles.list} />}
        </SafeAreaView>
        <Button onPress={() => navigation.navigate("AddNewCategory")} title="Create new Category" />
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

export default CategoryList;
