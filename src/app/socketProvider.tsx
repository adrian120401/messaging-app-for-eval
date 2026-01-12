import React, { useCallback, useEffect } from "react";
import { Message } from "../api/domain/chat/chat.types";
import { Socket } from "../api/sockets/Sockets";
import { SocketEvent } from "../api/types/socket";
import { setAddEvent } from "../redux/chat";
import { getToken } from "../redux/global/global.selector";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

interface SocketProviderProps {
  children: React.ReactNode;
}

export const disconnectSocket = () => {
  Socket.disconnect();
};

function SocketProvider(props: SocketProviderProps) {
  const dispatch = useAppDispatch();
  const token = useAppSelector(getToken);

  const handleNewMessage = useCallback(
    (data: Message) => {
      dispatch(setAddEvent(data));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    Socket.listen(SocketEvent.NEW_MESSAGE, handleNewMessage);

    return () => {
      disconnectSocket();
    };
  }, [token, handleNewMessage]);

  return props.children;
}

export default React.memo(SocketProvider);
