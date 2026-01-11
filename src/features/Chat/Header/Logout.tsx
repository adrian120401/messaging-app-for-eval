import React from "react";
import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { resetStore } from "../../../redux/store";
import { deleteToken } from "../../../utils/storage";

function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        Alert.alert(
            "Cerrar sesión",
            "¿Estás seguro que deseas cerrar sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "Cerrar sesión",
                    style: "destructive",
                    onPress: async () => {
                        await deleteToken();
                        dispatch(resetStore());
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Ionicons name="log-out-outline" size={24} color="red" />
        </TouchableOpacity>
    );
}

export default React.memo(Logout);

const styles = StyleSheet.create({
    logoutButton: {
        marginLeft: "auto",
        padding: 8,
    },
});
