import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputField } from "@/components/ui/input";

const NewEntryScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.category.errormessage); // view subscribes to the store

  const onCreateEntry = async () => {
    // const newCategory = new CategoryEntity(title, description);
    // dispatch(createCategory(newCategory));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text} className="text-orange-500">
        Create a New Entry
      </Text>

      <Text>{error}</Text>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} placeholder="Enter category title" />

        <Text style={styles.label}>Amount</Text>
        <Input>
          <InputField style={styles.input} onChangeText={setAmount} value={amount} placeholder="Enter a short description" inputMode="numeric" />
        </Input>
      </View>
      <Button onPress={onCreateEntry} title="Create Entry" color="#841584" accessibilityLabel="Create a new entry" />
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

export default NewEntryScreen;
