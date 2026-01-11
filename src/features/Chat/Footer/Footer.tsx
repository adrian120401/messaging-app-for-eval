import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ThemedView } from "../../../components/ThemedView/ThemedView";
import { setMessageInput } from "../../../redux/chat";
import { getMessageInput } from "../../../redux/chat/chat.selector";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useSendImage } from "../../../hooks/useSendImage";
import { setAddEvent } from "../../../redux/chat";
import Send from "./Send";
import AttachmentSheet from "./AttachmentSheet";
import CameraModal from "./CameraModal";

function Footer() {
  const insets = useSafeAreaInsets();

  const dispatch = useAppDispatch();

  const message = useAppSelector(getMessageInput);

  const [sheetVisible, setSheetVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
  const { mutate: sendImage } = useSendImage();

  const onChangeText = useCallback((text: string) => {
    dispatch(setMessageInput(text));
  }, []);

  const handleCameraPress = () => {
    setCameraVisible(true);
  };

  const handleCapture = async (uri: string) => {
    const formData = new FormData();

    formData.append("image", {
      uri: uri,
      name: uri.split("/").pop() || "photo.jpg",
      type: "image/jpeg",
    } as any);

    sendImage(formData, {
      onSuccess: (data: any) => {
        if (data && data.data) {
          dispatch(setAddEvent(data.data));
        }
      },
      onError: (error) => {
        Alert.alert("Error", "No se pudo enviar la imagen.");
        console.error(error);
      }
    });
  };

  return (
    <ThemedView
      style={[styles.footerContainer, { paddingBottom: insets.bottom }]}
    >
      <TouchableOpacity
        style={styles.attachButton}
        onPress={() => setSheetVisible(true)}
      >
        <Ionicons name="add-circle-outline" size={28} color="#666" />
      </TouchableOpacity>

      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={onChangeText}
        placeholder="Escribe un mensaje..."
        multiline
        numberOfLines={4}
        maxLength={1000}
        textAlignVertical="top"
        scrollEnabled={true}
      />

      <Send />

      <AttachmentSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        onCameraPress={handleCameraPress}
      />

      <CameraModal
        visible={cameraVisible}
        onClose={() => setCameraVisible(false)}
        onCapture={handleCapture}
      />
    </ThemedView>
  );
}

export default React.memo(Footer);

const styles = StyleSheet.create({
  footerContainer: {
    borderTopWidth: 1,
    flexDirection: "row",
    width: "100%",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#ccc",
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 70,
  },
  attachButton: {
    padding: 4,
  },
  textInput: {
    borderWidth: 1,
    flex: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
    lineHeight: 22,
    backgroundColor: "#fff",
    minHeight: 44,
    maxHeight: 110,
    textAlignVertical: "top",
  },
});
