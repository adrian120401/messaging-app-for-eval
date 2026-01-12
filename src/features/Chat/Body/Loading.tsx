import React from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import { Text } from "../../../components/Text/Text";
import { Color } from "../../../constants/colors";

function Loading() {
  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      className="flex-1 w-full items-center justify-center gap-2"
      resizeMode="repeat"
    >
      <ActivityIndicator size="large" color={Color.PRIMARY_500} />

      <Text lightColor="#333" type="default">
        Cargando...
      </Text>
    </ImageBackground>
  );
}

export default React.memo(Loading);
