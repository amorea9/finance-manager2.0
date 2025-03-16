import { StyleSheet } from "react-native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native"; // Import this
import { GluestackUIProvider } from "./components/ui/gluestack-ui-provider";
import CategoryList from "./categories/CategoryList";
import NewCategoryScreen from "./categories/NewCategoryScreen";
import EntriesMain from "./entries/EntriesMain";
import HomeScreen from "./home/Home";
import "./global.css";
import NewEntryScreen from "./entries/NewEntryScreen";

export type RootStackParamList = {
  AllCategories: undefined;
  AddNewCategory: undefined;
  AllEntries: undefined;
  AddNewEntry: undefined;
};

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

const EntryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AllEntries" component={EntriesMain} />
    <Stack.Screen name="AddNewEntry" component={NewEntryScreen} />
  </Stack.Navigator>
);

const HomeTabs = () => (
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
        <NavigationContainer>
          <HomeTabs />
        </NavigationContainer>
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
