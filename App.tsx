import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootState, store } from "./store/store";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native"; // Import this
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import EntriesMain from "./entries/EntriesMain";
import HomeScreen from "./home/Home";
import "./global.css";
import NewEntryScreen from "./entries/NewEntryScreen";
import SignupScreen from "./users/SignupScreen";
import NavigationWrapper from "./components/ui/NavigationWrapper";
import LoginScreen from "./users/LoginScreen";

export type RootStackParamList = {
  AllCategories: undefined;
  AddNewCategory: undefined;
  AllEntries: undefined;
  AddNewEntry: undefined;
  SignupScreen: undefined;
  LoginScreen: undefined;
};
// export type LoginSignupStackParamList = {
//   SignupScreen: undefined;
//   LoginScreen: undefined;
// };

export type BottomTabParamList = {
  Home: undefined;
  Entries: undefined;
  Categories: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const CategoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AllCategories" component={CategoryList} />
    <Stack.Screen name="AddNewCategory" component={NewCategoryScreen} />
  </Stack.Navigator>
);

export const LoginSignupTabs = () => (
  <Tab.Navigator>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
  </Tab.Navigator>
);

const EntryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AllEntries" component={EntriesMain} />
    <Stack.Screen name="AddNewEntry" component={NewEntryScreen} />
  </Stack.Navigator>
);

export const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Entries" component={EntryStack} />
    <Tab.Screen name="Categories" component={CategoryStack} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <GluestackUIProvider>
      <Provider store={store}>
        <NavigationWrapper />
      </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
