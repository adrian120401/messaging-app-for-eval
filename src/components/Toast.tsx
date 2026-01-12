import React, { useEffect, useRef } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getToasts } from "../redux/toast/toast.selector";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeToast } from "../redux/toast";

const ToastItem: React.FC<{
    id: string;
    message: string;
    onRemove: (id: string) => void;
}> = ({ id, message, onRemove }) => {
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handleRemove = () => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onRemove(id);
        });
    };

    return (
        <Animated.View
            style={{
                transform: [{ translateY }],
                opacity,
            }}
            className="bg-red-500 rounded-lg shadow-lg mx-4 mb-2 flex-row items-center p-4"
        >
            <Ionicons name="alert-circle" size={24} color="white" />
            <Text className="flex-1 text-white font-medium text-base ml-3">
                {message}
            </Text>
            <TouchableOpacity onPress={handleRemove} className="ml-2">
                <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export const Toast: React.FC = () => {
    const insets = useSafeAreaInsets();
    const toasts = useAppSelector(getToasts);
    const dispatch = useAppDispatch();

    const handleRemove = (id: string) => {
        dispatch(removeToast(id));
    };

    if (toasts.length === 0) {
        return null;
    }

    return (
        <View
            style={{ top: insets.top }}
            className="absolute left-0 right-0 z-50 pointer-events-none"
        >
            <View className="pointer-events-auto">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        onRemove={handleRemove}
                    />
                ))}
            </View>
        </View>
    );
};
