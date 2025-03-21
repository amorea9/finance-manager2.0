import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { Select, SelectTrigger, SelectInput, SelectPortal, SelectBackdrop, SelectContent, SelectItem } from "@gluestack-ui/themed";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createEntry } from "@/store/entrySlice";
import { EntryEntity } from "./EntryEntity";
import { CategoryEntity } from "@/categories/CategoryEntity";

const NewEntryScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [currency, setCurrency] = useState("USD");
  const [categoryID, setCategoryID] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.category.errormessage);
  const categories = useSelector((state: RootState) => state.category.categories);

  const onCreateEntry = () => {
    const newEntry = new EntryEntity(title, parseInt(amount), date.toString(), paymentMethod, currency, parseInt(categoryID));
    dispatch(createEntry(newEntry));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create a New Entry</Text>
      <Text>{error}</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} onChangeText={setTitle} value={title} placeholder="Enter entry title" />

      <Text style={styles.label}>Amount</Text>
      <TextInput style={styles.input} onChangeText={setAmount} value={amount} placeholder="Enter the amount" />

      <Text style={styles.label}>Date</Text>
      <View style={styles.dateWrapper}>
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      </View>

      <Text style={styles.label}>Payment Method</Text>
      <Select selectedValue={paymentMethod} onValueChange={setPaymentMethod}>
        <SelectTrigger>
          <SelectInput placeholder="Select payment method" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="Cash" value="Cash" />
            <SelectItem label="Credit Card" value="CreditCard" />
            <SelectItem label="Bank Transfer" value="BankTransfer" />
          </SelectContent>
        </SelectPortal>
      </Select>

      <Text style={styles.label}>Currency</Text>
      <Select selectedValue={currency} onValueChange={setCurrency}>
        <SelectTrigger>
          <SelectInput placeholder="Select currency" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="DKK" value="DKK" />
            <SelectItem label="EUR" value="EUR" />
            <SelectItem label="GBP" value="GBP" />
          </SelectContent>
        </SelectPortal>
      </Select>

      <Text style={styles.label}>Category</Text>
      <Select selectedValue={categoryID} onValueChange={setCategoryID}>
        <SelectTrigger>
          <SelectInput placeholder="Select category" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>{categories.map((category: CategoryEntity) => (category.id ? <SelectItem key={String(category.id)} label={category.title} value={String(category.id)} /> : null))}</SelectContent>
        </SelectPortal>
      </Select>

      <Button onPress={onCreateEntry} title="Create Entry" color="#841584" />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 6,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  dateWrapper: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "row",
  },
});

export default NewEntryScreen;
