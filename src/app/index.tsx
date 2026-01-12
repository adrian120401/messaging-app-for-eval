import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Login from "../features/Login/Login";
import Chat from "../features/Chat/Chat";
import { deleteToken, getToken } from "../utils/storage";
import { setToken } from "../redux/global";
import { getToken as getTokenSelector } from "../redux/global/global.selector";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const token = useSelector(getTokenSelector);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const storedToken = await getToken();
        if (storedToken) {
          dispatch(setToken(storedToken));
        }
      } catch {
        deleteToken();
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return token ? <Chat /> : <Login />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
