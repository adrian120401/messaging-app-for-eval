export interface Toast {
    id: string;
    message: string;
    type: "error";
    duration?: number;
}

export interface ToastSlice {
    toasts: Toast[];
}
