import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { getPoster } from "../services/MovieServices";
import COLORS from '../constants/Colors';
import FONTS from "../constants/Fonts";
import IMAGES from "../constants/Images";

const CastCards = ({ originalName,image,characterName }) => {
    return (
        <View style={styles.container}>
            <Image resizeMode={image? 'cover':'contain'} style={styles.profileImage} source={image ? {uri:getPoster(image)}:IMAGES.NO_IMAGE} />
            <Text style={styles.originalName} numberOfLines={2}>{originalName}</Text>
            <Text style={styles.characterName} numberOfLines={2}>{characterName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileImage:{
        height:120,
        width:80,
        borderRadius:10,
    },
    characterName:{
        width:80,
        color:COLORS.LIGHT_GRAY,
        fontFamily:FONTS.BOLD,
        fontSize:10,
    },
    originalName:{
        width:80,
        color:COLORS.WHITE,
        fontFamily:FONTS.BOLD,
        fontSize:12,
       
    }
})

export default CastCards;