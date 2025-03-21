import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { signup } from "@/store/usersSlice";

const SignupScreen: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, "SignupScreen">;
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.user.errormessage); // view subscribes to the store
  const userToken = useSelector((state: RootState) => state.user.token);

  const onSubmit = async () => {
    dispatch(signup({ email, password }));
  };

  return (
    <View style={styles.container}>
      <Text>Signup</Text>

      <Text>{error}</Text>
      <View>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} placeholder="Enter a valid email" />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} onChangeText={setPassword} value={password} placeholder="Enter a passwod" />
      </View>
      <Button onPress={onSubmit} title="Signup" color="#841584" accessibilityLabel="Signup" />

      <Button onPress={() => navigation.navigate("LoginScreen")} title="Go to login" color="#841584" accessibilityLabel="Go to login" />
    </View>
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
  input: {
    height: 40,
    // width: "80%",
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
  },
  label: {
    fontSize: 16,
    textAlign: "left",
    marginBottom: 6,
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

export default SignupScreen;
