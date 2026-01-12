import { useState, useRef } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions, CameraType } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../../components/Text/Text";
import { useToast } from "../../../hooks/useToast";

interface CameraModalProps {
    visible: boolean;
    onClose: () => void;
    onCapture: (uri: string) => void;
}

export default function CameraModal({ visible, onClose, onCapture }: CameraModalProps) {
    const [facing, setFacing] = useState<CameraType>("back");
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);

    const { showError } = useToast();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <Modal visible={visible} animationType="slide">
                <View style={styles.container}>
                    <Text type="default" style={styles.message}>
                        Necesitamos permiso para usar la cámara
                    </Text>
                    <TouchableOpacity onPress={requestPermission} style={styles.button}>
                        <Text type="default" lightColor="#fff">Conceder Permiso</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }

    function toggleCameraFacing() {
        setFacing((current: CameraType) => (current === "back" ? "front" : "back"));
    }

    async function takePicture() {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if (photo) {
                    onCapture(photo.uri);
                    onClose();
                }
            } catch (error) {
                showError("No se pudo tomar la foto");
            }
        }
    }

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <View style={styles.container}>
                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                    <View style={styles.controlsContainer}>
                        <TouchableOpacity style={styles.controlButton} onPress={onClose}>
                            <Ionicons name="close" size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                            <View style={styles.captureInner} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.controlButton} onPress={toggleCameraFacing}>
                            <Ionicons name="camera-reverse-outline" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#000",
    },
    message: {
        textAlign: "center",
        paddingBottom: 10,
        color: "#fff"
    },
    camera: {
        flex: 1,
    },
    button: {
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    controlsContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "transparent",
        marginBottom: 40,
        justifyContent: "space-around",
        alignItems: "flex-end",
    },
    controlButton: {
        padding: 10,
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureInner: {
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#fff',
    }
});
