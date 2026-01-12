import React from "react";
import { ActivityIndicator, FlatList, ImageBackground, StyleSheet } from "react-native";
import { Message as MessageType } from "../../../api/domain/chat/chat.types";
import { getChatEvents, getChatPagination } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useGetEvents } from "../../../hooks/useGetEvents";
import { appendChatEvents, setChatPagination } from "../../../redux/chat";
import Paginated from "../../../api/types/paginated";
import Message from "./Message/Message";

function Body() {
  const events = useAppSelector(getChatEvents);
  const pagination = useAppSelector(getChatPagination);
  const dispatch = useAppDispatch();
  const { mutate: getEvents, isPending } = useGetEvents();

  const e = Object.values(events || {}).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleEndReached = () => {
    if (isPending || !pagination) return;

    if (!pagination.hasMore) {
      return;
    }

    const { limit, offset } = pagination;
    const newOffset = offset + limit;

    getEvents(
      { limit, offset: newOffset },
      {
        onSuccess: (data: Paginated<MessageType>) => {
          dispatch(appendChatEvents(data.elements));
          dispatch(setChatPagination(data.pagination));
        },
      }
    );
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/chat-bg-pattern.jpg")}
      style={styles.bodyContainer}
      resizeMode="repeat"
    >
      <FlatList
        data={e}
        renderItem={({ item }) => <Message key={item.id} id={item.id} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        inverted
        overScrollMode="never"
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        initialNumToRender={15}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        ListFooterComponent={isPending ? <ActivityIndicator size="small" color="#999" /> : null}
      />
    </ImageBackground>
  );
}

export default React.memo(Body);

const styles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    flexDirection: "column",
    gap: 8,
    flexGrow: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
});
