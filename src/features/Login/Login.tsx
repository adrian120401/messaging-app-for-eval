import React, { useState } from "react";

import {
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../../redux/global";
import { useLogin } from "../../hooks/useLogin";
import { saveToken } from "../../utils/storage";
import logoSource from "../../assets/images/logo_chatter_color_2.png";
import { Text } from "../../components/Text/Text";
import { ThemedView } from "../../components/ThemedView/ThemedView";
import { useToast } from "../../hooks/useToast";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { showError } = useToast();

  const dispatch = useDispatch();
  const { mutateAsync: login, isPending } = useLogin();

  const handleLogin = async () => {
    if (!username || !password) {
      showError("Por favor ingresa usuario y contraseña");
      return;
    }

    try {
      const response = await login({ username, password });
      await saveToken(response.token);
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
    } catch (error: any) {
      const message = error?.message || "Ocurrió un error al iniciar sesión";
      showError(message);
    }
  };

  return (
    <ThemedView className="flex-1 bg-primary_500 items-center justify-center">
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        className="flex-1 w-full items-center justify-center gap-4"
      >
        <ThemedView className="flex-1 w-full !bg-transparent items-center justify-center gap-4 p-4">
          <Image source={logoSource} className="w-4/5 max-h-[80px] self-center mb-5" resizeMode="contain" />

          <TextInput
            className="w-full h-[50px] bg-transparent border border-white/60 text-white rounded-lg px-4 py-3"
            placeholder="Nombre de usuario"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            className="w-full h-[50px] bg-transparent border border-white/60 text-white rounded-lg px-4 py-3"
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            className="bg-primary_300 w-full items-center justify-center rounded-2xl p-4 disabled:opacity-70"
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator className="text-white" />
            ) : (
              <Text className="!text-white font-bold">Iniciar sesión</Text>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

export default React.memo(Login);
