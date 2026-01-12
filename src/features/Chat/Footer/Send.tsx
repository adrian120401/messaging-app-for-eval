import React, { useCallback } from "react";
import { View } from "react-native";

import { SendMessageResponse } from "../../../api/domain/chat/chat.types";
import { Icon } from "../../../components/Icon/Icon";
import { Color } from "../../../constants/colors";
import { useSendTextMessage } from "../../../hooks/useSendMessage";
import { setAddEvent, setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useToast } from "../../../hooks/useToast";

function Send() {
  const { mutate: sendMessage } = useSendTextMessage();

  const { showError } = useToast();

  const dispatch = useAppDispatch();

  const message = useAppSelector(getMessageInput);

  const hasText = (message ?? "").trim().length > 0;

  const c = hasText ? Color.PRIMARY_500 : "#ccc";

  const onTouchEnd = useCallback(() => {
    if (!message) {
      return;
    }

    sendMessage(message, { onSuccess, onError });
  }, [message]);

  const onSuccess = useCallback((r: SendMessageResponse) => {
    dispatch(setAddEvent(r.data));

    dispatch(setMessageInput(undefined));
  }, []);

  const onError = useCallback(() => {
    showError("No se pudo enviar el mensaje.");
  }, []);

  return (
    <View onTouchEnd={onTouchEnd}>
      <Icon name="send.fill" size={24} color={c} />
    </View>
  );
}

export default React.memo(Send);
