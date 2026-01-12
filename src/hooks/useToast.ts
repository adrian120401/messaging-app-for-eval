import { useCallback } from "react";
import { addToast, removeToast } from "../redux/toast";
import { useAppDispatch } from "../redux/hooks";

export const useToast = () => {
    const dispatch = useAppDispatch();

    const showError = useCallback(
        (message: string, duration: number = 3000) => {
            const id = `toast-${Date.now()}-${Math.random()}`;

            dispatch(
                addToast({
                    id,
                    message,
                    type: "error",
                    duration,
                })
            );

            if (duration > 0) {
                setTimeout(() => {
                    dispatch(removeToast(id));
                }, duration);
            }

            return id;
        },
        [dispatch]
    );

    const hide = useCallback(
        (id: string) => {
            dispatch(removeToast(id));
        },
        [dispatch]
    );

    return { showError, hide };
};
