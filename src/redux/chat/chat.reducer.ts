import { PayloadAction } from "@reduxjs/toolkit";

import { Message } from "../../api/domain/chat/chat.types";
import { Pagination } from "../../api/types/paginated";
import { ChatsSlice } from "./chat.types";

export const chatReducers = {
  setChatEvents: (
    state: ChatsSlice,
    action: PayloadAction<Message[] | undefined>
  ) => {
    if (action.payload) {
      state.chatEvents = action.payload.reduce((acc, message) => {
        acc[message.id] = message;
        return acc;
      }, {} as Record<string, Message>);
    } else {
      state.chatEvents = undefined;
    }
  },

  setChatPagination: (
    state: ChatsSlice,
    action: PayloadAction<Pagination | undefined>
  ) => {
    state.pagination = action.payload;
  },

  setMessageInput: (
    state: ChatsSlice,
    action: PayloadAction<string | undefined>
  ) => {
    state.messageInput = action.payload;
  },

  setAddEvent: (state: ChatsSlice, action: PayloadAction<Message>) => {
    if (state.chatEvents) {
      state.chatEvents[action.payload.id] = action.payload;
    } else {
      state.chatEvents = { [action.payload.id]: action.payload };
    }
  },

  appendChatEvents: (
    state: ChatsSlice,
    action: PayloadAction<Message[] | undefined>
  ) => {
    if (action.payload) {
      const newEvents = action.payload.reduce((acc, message) => {
        acc[message.id] = message;
        return acc;
      }, {} as Record<string, Message>);

      state.chatEvents = { ...state.chatEvents, ...newEvents };
    }
  },
};
