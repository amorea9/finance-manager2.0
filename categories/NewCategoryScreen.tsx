import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { CategoryEntity } from "./CategoryEntity";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategories } from "../store/categorySlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/App";
import { useNavigation } from "@react-navigation/native";

const NewCategoryScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AllCategories">;
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.category.errormessage); // view subscribes to the store

  const onCreateCategory = async () => {
    const newCategory = new CategoryEntity(title, description);

    dispatch(createCategory(newCategory));
    Alert.alert("Confirmation", "The category has been created!", [
      {
        text: "OK",
        onPress: async () => {
          navigation.goBack();
        },
      },
    ]);
    dispatch(fetchCategories());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} className="text-orange-500">
        Create a New Category
      </Text>

      <Text>{error}</Text>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} placeholder="Enter category title" />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} onChangeText={setDescription} value={description} placeholder="Enter a short description" />
      </View>
      <Button onPress={onCreateCategory} title="Create Category" color="#841584" accessibilityLabel="Create a new category" />
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   padding: 16,
  // },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    marginLeft: 40,
    marginRight: 40,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 6,
  },
  input: {
    height: 40,
    // width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
});

export default NewCategoryScreen;
