import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native"; // Hook for functional component navigation
import { Box } from "@/components/ui/box";
import EntriesMain from "@/entries/EntriesMain";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation(); // Hook to access navigation

  return (
    <SafeAreaView style={styles.container}>
      <Box style={{ marginTop: 30 }} className="flex gap-10 items-center bg-orange-100 w-screen">
        <Text style={styles.text} className="text-orange-500">
          Welcome to the finance manager app!
        </Text>
      </Box>
      {/* Replace Link with Button to navigate */}
      <Button
        title="Entries HEREEE"
        onPress={() => navigation.navigate("Entries")}
        color="#841584" // Navigate to EntriesMain screen
      />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 30,
    paddingTop: 40,
    paddingBottom: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HomeScreen;
