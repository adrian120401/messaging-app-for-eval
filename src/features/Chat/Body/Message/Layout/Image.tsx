import React from "react";
import { StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Message } from "../../../../../api/domain/chat/chat.types";
import { config } from "../../../../../api/config";

interface Props {
    message: Message;
}

const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQ";

function ImageLayout({ message }: Props) {

    const imageUrl = config.baseUrl + message.imageUrl;
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={imageUrl}
                placeholder={blurhash}
                contentFit="cover"
                transition={1000}
            />
        </View>
    );
}

export default React.memo(ImageLayout);

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: "hidden",
        marginVertical: 4,
    },
    image: {
        width: 200,
        height: 200,
        backgroundColor: "#0553",
    },
});
