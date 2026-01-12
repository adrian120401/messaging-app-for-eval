import {
    Modal,
    TouchableOpacity,
    View,
    Dimensions,
} from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

interface ImageZoomProps {
    visible: boolean;
    onClose: () => void;
    imageUrl: string;
    blurhash?: string;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ImageZoom({
    visible,
    onClose,
    imageUrl,
    blurhash,
}: ImageZoomProps) {
    const insets = useSafeAreaInsets();

    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            if (scale.value < 1) {
                scale.value = withSpring(1);
                savedScale.value = 1;
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                savedTranslateX.value = 0;
                savedTranslateY.value = 0;
            } else if (scale.value > 4) {
                scale.value = withSpring(4);
                savedScale.value = 4;
            } else {
                savedScale.value = scale.value;
            }
        });

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (scale.value > 1) {
                const maxTranslateX = (SCREEN_WIDTH * (scale.value - 1)) / 2;
                const maxTranslateY = (SCREEN_HEIGHT * (scale.value - 1)) / 2;

                const newTranslateX = savedTranslateX.value + e.translationX;
                const newTranslateY = savedTranslateY.value + e.translationY;

                translateX.value = Math.max(
                    -maxTranslateX,
                    Math.min(maxTranslateX, newTranslateX)
                );
                translateY.value = Math.max(
                    -maxTranslateY,
                    Math.min(maxTranslateY, newTranslateY)
                );
            }
        })
        .onEnd(() => {
            savedTranslateX.value = translateX.value;
            savedTranslateY.value = translateY.value;
        });

    const doubleTapGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd(() => {
            if (scale.value > 1) {
                scale.value = withSpring(1);
                savedScale.value = 1;
                translateX.value = withSpring(0);
                translateY.value = withSpring(0);
                savedTranslateX.value = 0;
                savedTranslateY.value = 0;
            } else {
                scale.value = withSpring(2);
                savedScale.value = 2;
            }
        });

    const composedGesture = Gesture.Simultaneous(
        doubleTapGesture,
        Gesture.Simultaneous(pinchGesture, panGesture)
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    const handleClose = () => {
        scale.value = withTiming(1, { duration: 200 });
        savedScale.value = 1;
        translateX.value = withTiming(0, { duration: 200 });
        translateY.value = withTiming(0, { duration: 200 });
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
        onClose();
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={handleClose}
            statusBarTranslucent
        >
            <View className="flex-1 items-center justify-center bg-black/95">
                <TouchableOpacity
                    className="absolute right-5 z-10 rounded-full bg-black/50 p-2 top-16"
                    onPress={handleClose}
                >
                    <Ionicons name="close" size={28} color="#fff" />
                </TouchableOpacity>

                <GestureDetector gesture={composedGesture}>
                    <Animated.View className="items-center justify-center w-full h-full"
                        style={animatedStyle}>
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            source={imageUrl}
                            placeholder={blurhash}
                            contentFit="contain"
                            transition={200}
                        />
                    </Animated.View>
                </GestureDetector>
            </View>
        </Modal>
    );
}