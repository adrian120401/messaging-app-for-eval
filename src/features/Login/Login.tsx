import React, { useState } from "react";

import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
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
import { Color } from "../../constants/colors";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { mutateAsync: login, isPending } = useLogin();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor ingresa usuario y contraseña");
      return;
    }

    try {
      const response = await login({ username, password });
      await saveToken(response.token);
      dispatch(setToken(response.token));
      dispatch(setUser(response.user));
    } catch (error: any) {
      const message = error?.message || "Ocurrió un error al iniciar sesión";
      Alert.alert("Error", message);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.png")}
        resizeMode="cover"
        style={styles.background}
      >
        <ThemedView style={styles.wrapper}>
          <Image source={logoSource} style={styles.logo} resizeMode="contain" />

          <TextInput
            style={styles.input}
            placeholder="Nombre de usuario"
            placeholderTextColor="#fff"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#fff"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            )}
          </TouchableOpacity>
        </ThemedView>
      </ImageBackground>
    </ThemedView>
  );
}

export default React.memo(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.PRIMARY_500,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    width: "100%",
  },
  wrapper: {
    backgroundColor: "transparent",
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 16,
  },
  logo: {
    width: "80%",
    maxHeight: 80,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ffffff99",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    width: "100%",
    height: 50,
  },
  button: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    backgroundColor: Color.PRIMARY_300,
    borderRadius: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textTransform: "none",
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
