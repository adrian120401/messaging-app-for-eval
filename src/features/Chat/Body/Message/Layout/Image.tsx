import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { Message } from "../../../../../api/domain/chat/chat.types";
import { config } from "../../../../../api/config";
import ImageZoom from "./ImageZoom";

interface Props {
    message: Message;
}

const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQfQ";

function ImageLayout({ message }: Props) {
    const [zoomVisible, setZoomVisible] = useState(false);
    const imageUrl = config.baseUrl + message.imageUrl;

    return (
        <>
            <TouchableOpacity
                className="rounded-lg overflow-hidden my-1"
                onPress={() => setZoomVisible(true)}
                activeOpacity={0.8}
            >
                <Image
                    className="bg-[#0553]"
                    style={{ width: 200, height: 200 }}
                    source={imageUrl}
                    placeholder={blurhash}
                    contentFit="cover"
                    transition={1000}
                />
            </TouchableOpacity>

            <ImageZoom
                visible={zoomVisible}
                onClose={() => setZoomVisible(false)}
                imageUrl={imageUrl}
                blurhash={blurhash}
            />
        </>
    );
}

export default React.memo(ImageLayout);