import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { createEntry } from "@/store/entrySlice";
import { CreateEntryDto } from "./EntryEntity";
import DropDownPicker from "react-native-dropdown-picker"; // Correct import

const NewEntryScreen: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("");
  const [categoryID, setCategoryID] = useState<string>("");

  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.category.errormessage);
  const categories = useSelector((state: RootState) => state.category.categories);

  const onCreateEntry = () => {
    if (!title || !amount) {
      alert("Please fill all required fields!");
      return;
    }

    // const newEntry = new CreateEntryDto(title, parseFloat(amount), date.toISOString(), paymentMethod, currency, parseInt(categoryID));
    console.log("categoryID", categoryID);
    dispatch(createEntry(new CreateEntryDto(title, amount, date.toString(), paymentMethod, currency, parseInt(categoryID))));

    setTitle("");
    setAmount("");
    setDate(new Date());
    setPaymentMethod("Cash");
    setCurrency("USD");
    setCategoryID("");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Create a New Entry</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Title input */}
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} onChangeText={setTitle} value={title} placeholder="Enter entry title" />

        {/* Amount input */}
        <Text style={styles.label}>Amount</Text>
        <TextInput style={styles.input} onChangeText={setAmount} value={amount} placeholder="Enter the amount" keyboardType="numeric" />

        {/* Date picker */}
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

        {/* Payment Method dropdown */}
        <Text style={styles.label}>Payment Method</Text>
        <DropDownPicker
          open={paymentMethodOpen}
          value={paymentMethod}
          items={[
            { label: "Cash", value: "Cash" },
            { label: "Credit Card", value: "CreditCard" },
            { label: "Bank Transfer", value: "BankTransfer" },
          ]}
          setValue={setPaymentMethod}
          setOpen={setPaymentMethodOpen}
          style={[styles.pickerStyle, { zIndex: 3000 }]} // Explicitly set zIndex
          dropDownContainerStyle={{ zIndex: 4000 }} // Ensure dropdown items are on top
        />

        {/* Currency dropdown */}
        <Text style={styles.label}>Currency</Text>
        <DropDownPicker
          open={currencyOpen}
          value={currency}
          items={[
            { label: "DKK", value: "DKK" },
            { label: "EUR", value: "EUR" },
            { label: "GBP", value: "GBP" },
            { label: "USD", value: "USD" },
          ]}
          setValue={setCurrency}
          setOpen={setCurrencyOpen}
          style={[styles.pickerStyle, { zIndex: 3000 }]} // Explicitly set zIndex
          dropDownContainerStyle={{ zIndex: 4000 }} // Ensure dropdown items are on top
        />

        {/* Category dropdown */}
        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={categoryOpen}
          value={categoryID}
          items={categories.map((category) => ({
            label: category.title,
            value: category.id?.toString(),
          }))}
          setValue={setCategoryID}
          setOpen={setCategoryOpen}
          style={[styles.pickerStyle, { zIndex: 3000 }]} // Explicitly set zIndex
          dropDownContainerStyle={{ zIndex: 4000 }} // Ensure dropdown items are on top
        />

        {/* Submit button */}
        <Button onPress={onCreateEntry} title="Create Entry" color="#841584" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    marginHorizontal: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    height: 40,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "#ccc",
  },
  dateWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  pickerStyle: {
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingLeft: 10,
  },
});

export default NewEntryScreen;
