import {
    Modal,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../../../components/Text/Text";
import { Color } from "../../../constants/colors";

interface AttachmentSheetProps {
    visible: boolean;
    onClose: () => void;
    onCameraPress: () => void;
}

const ACTION_ITEMS = [
    {
        icon: "camera-outline",
        label: "Cámara",
        action: "camera",
        enabled: true,
    },
    {
        icon: "images-outline",
        label: "Fototeca",
        action: "library",
        enabled: false,
    },
    {
        icon: "document-text-outline",
        label: "Documento",
        action: "document",
        enabled: false,
    },
    {
        icon: "mic-outline",
        label: "Audio",
        action: "audio",
        enabled: false,
    },
];

export default function AttachmentSheet({
    visible,
    onClose,
    onCameraPress,
}: AttachmentSheetProps) {
    const insets = useSafeAreaInsets();

    const handleAction = (action: string) => {
        if (action === "camera") {
            onCameraPress();
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <View
                            style={[
                                styles.sheetContainer,
                                { paddingBottom: insets.bottom + 20 },
                            ]}
                        >
                            <View style={styles.optionsContainer}>
                                {ACTION_ITEMS.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.optionItem,
                                            !item.enabled && styles.disabledOption,
                                        ]}
                                        onPress={() => item.enabled && handleAction(item.action)}
                                        disabled={!item.enabled}
                                    >
                                        <View
                                            style={[
                                                styles.iconContainer,
                                                !item.enabled && styles.disabledIconContainer,
                                            ]}
                                        >
                                            <Ionicons
                                                name={item.icon as any}
                                                size={24}
                                                color={item.enabled ? Color.PRIMARY_500 : "#999"}
                                            />
                                        </View>
                                        <Text
                                            type="default"
                                            style={!item.enabled && styles.disabledText}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        justifyContent: "flex-end",
    },
    sheetContainer: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    optionsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: 10,
    },
    optionItem: {
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        width: 80,
    },
    disabledOption: {
        opacity: 0.5,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#E6F0FA",
        alignItems: "center",
        justifyContent: "center",
    },
    disabledIconContainer: {
        backgroundColor: "#F0F0F0",
    },
    disabledText: {
        color: "#999",
    },
});
