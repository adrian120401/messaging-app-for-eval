import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { HttpStatusCode } from "../api/baseRepositories/api/http/constants";
import { BaseError } from "../api/errors/BaseError";
import { useColorScheme } from "../hooks/useColorSchemeWeb";
import { resetStore, store } from "../redux/store";
import SocketProvider from "./socketProvider";
import { deleteToken } from "../utils/storage";
import { disconnectSocket } from "./socketProvider";
import { Toast } from "../components/Toast";
import { useToast } from "../hooks/useToast";
import '../../global.css';

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  const { showError } = useToast();

  const clearStorage = async () => {
    disconnectSocket();
    await deleteToken();
    store.dispatch(resetStore());
  };

  const defaultOnError = (error: BaseError) => {
    if (error) {
      const { status, message } = error;
      if (status === HttpStatusCode.UNAUTHORIZED) {
        return clearStorage();
      }

      showError(message || "Ha ocurrido un error inesperado");
    }
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: false,
      },
      mutations: {
        onError: (e) => {
          defaultOnError(e as BaseError);
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <SocketProvider>
          <GestureHandlerRootView>
            <Stack>
              <Stack.Screen name="index" options={{ headerShown: false }} />
            </Stack>

            <StatusBar style="light" />
            <Toast />
          </GestureHandlerRootView>
        </SocketProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutContent />
    </Provider>
  );
}
