import { HomeTabs, LoginSignupTabs } from "@/App";
import { RootState } from "@/store/store";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";

function NavigationWrapper() {
  const token = useSelector((state: RootState) => state.user.token);
  return <NavigationContainer>{!token ? <HomeTabs /> : <LoginSignupTabs />}</NavigationContainer>;
}

export default NavigationWrapper;
