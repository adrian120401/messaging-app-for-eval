import React from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { Color } from "../../../constants/colors";
import Avatar from "./Avatar";
import Data from "./Data";
import Logout from "./Logout";

function Header() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        styles.headerContainer,
        { paddingTop: insets.top + 8, height: 80 + insets.top },
      ]}
    >
      <Avatar />

      <Data />

      <Logout />
    </ThemedView>
  );
}

export default React.memo(Header);

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    width: "100%",
    backgroundColor: Color.PRIMARY_500,
    height: 80,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
