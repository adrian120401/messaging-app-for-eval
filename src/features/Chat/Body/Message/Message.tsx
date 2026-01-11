import React from "react";

import { StyleSheet, View } from "react-native";
import * as MessageView from "../../../../components/MessageView/MessageView";
import { getChatEventById, getChatEventPropertyById } from "../../../../redux/chat/chat.selector";
import { useAppSelector } from "../../../../redux/hooks";
import Regular from "./Layout/Regular";
import ImageLayout from "./Layout/Image";
import { MessageProvider, useMessageContext } from "./Provider";
import { MessageProps } from "./types";

function MessageContent() {
  const { id } = useMessageContext();
  const message = useAppSelector(getChatEventById(id));

  if (message?.type === 'image') {
    return <ImageLayout message={message} />;
  }

  return <Regular />;
}

function Message(props: MessageProps) {
  const { id } = props;

  const isAutoResponse = useAppSelector(
    getChatEventPropertyById(id, "isAutoResponse")
  );

  const timestamp = useAppSelector(getChatEventPropertyById(id, "timestamp"));

  const isReceived = !!isAutoResponse;

  return (
    <MessageProvider id={id}>
      <MessageView.Root isReceived={isReceived}>
        <View style={styles.messageContent}>
          <MessageContent />
        </View>

        <MessageView.BottomComposer
          icon={"check.fill"}
          isReceived={isReceived}
          timestamp={new Date(timestamp ?? Date.now())}
        />
      </MessageView.Root>
    </MessageProvider>
  );
}

export default React.memo(Message);

const styles = StyleSheet.create({
  messageContent: {
    paddingHorizontal: 6,
    width: "100%",
    alignContent: "flex-start",
  },
});
