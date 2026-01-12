import { useCallback, useLayoutEffect } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Message } from "../../api/domain/chat/chat.types";
import Paginated from "../../api/types/paginated";
import { ThemedView } from "../../components/ThemedView/ThemedView";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../../constants/pagination";
import { useGetEvents } from "../../hooks/useGetEvents";
import { setChatEvents, setChatPagination } from "../../redux/chat";
import { useAppDispatch } from "../../redux/hooks";
import Body from "./Body/Body";
import Loading from "./Body/Loading";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import { useToast } from "../../hooks/useToast";

export default function Chat() {
  const { mutate: getEvents, isPending } = useGetEvents();
  const { showError } = useToast();

  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    getEvents({ limit: DEFAULT_LIMIT, offset: DEFAULT_OFFSET }, {
      onSuccess, onError: (error) => {
        showError(error.message || "Error al cargar los eventos");
      }
    });
  }, []);

  const onSuccess = useCallback((data: Paginated<Message>) => {
    dispatch(setChatEvents(data.elements));
    dispatch(setChatPagination(data.pagination));
  }, []);

  return (
    <ThemedView className="flex-1 w-full">
      <KeyboardAvoidingView
        className="flex-1 w-full"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <Header />

        {!isPending ? <Body /> : <Loading />}

        <Footer />
      </KeyboardAvoidingView>
    </ThemedView>
  );
}
