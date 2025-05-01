import { HomeTabs, LoginSignupTabs } from "@/App";
import { RootState } from "@/store/store";
import { reloadJwtFromStorage } from "@/store/usersSlice";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";

function NavigationWrapper() {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch();
  // return <NavigationContainer>{!token ? <HomeTabs /> : <LoginSignupTabs />}</NavigationContainer>;

  useEffect(() => {
    async function getValueFor() {
      const userObj = JSON.parse((await SecureStore.getItemAsync("jwt")) || "");
      console.log("userObj", userObj);
      dispatch(reloadJwtFromStorage(userObj)); // in my code, I have no token
      // Instead, do the login functionality and save the token instead of the user.
    }
    getValueFor();
  }, []);

  return <NavigationContainer>{!token ? <HomeTabs /> : <LoginSignupTabs />}</NavigationContainer>;
}

export default NavigationWrapper;
