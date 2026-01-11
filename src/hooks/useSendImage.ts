import { useCallback } from "react";
import ChatService from "../api/domain/chat/chat.service";
import useQuery from "./useQuery";

const chatService = new ChatService();

export const useSendImage = () => {
    const send = useCallback(async (data: FormData) => {
        return chatService.sendImageMessage(data);
    }, []);

    return useQuery({ fetchFn: send });
};
