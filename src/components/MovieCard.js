import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableNativeFeedback, ImageBackground } from "react-native";
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts'
import { Ionicons } from '@expo/vector-icons';
import IMAGES from '../constants/Images'
import { useState } from "react";
import { getPoster, getLanguages} from "../services/MovieServices";


const MovieCard = ({ title, language, voteAverage, voteCount, poster, size ,heartLess,onPress}) => {

    const [Liked, SetLiked] = useState(false)
    const [voteCountValue,setVoteCountValue]=useState(voteCount)

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <ImageBackground style={{ ...styles.movieContainer, width: 280 * size, height: 400 * size }} resizeMode={ poster ? "cover" : "contain"} source={ poster?{uri: getPoster(poster) }:IMAGES.NO_IMAGE} imageStyle={{ borderRadius: 12 }}>
                <View style={{ ...styles.imdbContainer, paddingVertical: 3 * size }}>
                    <Image source={IMAGES.IMDB} resizeMode="cover" style={{ ...styles.imdbImage, height: 20 * size, width: 50 * size }} />
                    <Text style={{ ...styles.imbbRating, marginRight: 5 * size, fontSize: 14 * size }}>{voteAverage}</Text>
                </View>
                {
                    !heartLess ?
                    <TouchableNativeFeedback onPress={() => {
                        SetLiked(!Liked)
                        setVoteCountValue(Liked ? voteCountValue-1 :voteCountValue+1)
                    }}>
                        <Ionicons name={Liked ? "heart" : "heart-outline"} size={25 * size} color={Liked ? COLORS.HEART : COLORS.WHITE} style={styles.heartOutline} />
                    </TouchableNativeFeedback>:null
                }
       
            </ImageBackground>
            <View >
                <Text style={{...styles.movieTitle ,width:260*size}} numberOfLines={2}>{title}</Text>

                {language !=="" ? (
                <View style={styles.movieSubTitleContainer}>
                    <Text style={styles.movieSubTitle}>{getLanguages(language).english_name}</Text>
                    <View style={styles.rowAndCenter}>
                        <Ionicons name="heart" size={17 * size} color={COLORS.HEART} style={{ marginRight: 5 }} />
                        <Text style={{color:COLORS.WHITE}}>{voteCountValue}</Text>
                    </View>
                </View>) : null}
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    movieContainer: {
        flex: 1,
        width: 230,
        height: 340,
        backgroundColor: COLORS.BLACK,
        borderRadius: 12,
        elevation: 5,
        marginVertical: 5,
        // borderColor:COLORS.WHITE,
        // borderWidth:1

    },
    movieSubTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowAndCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    movieSubTitle: {
        fontFamily: FONTS.REGULAR,
        fontSize: 12,
        color:COLORS.WHITE

    },
    movieTitle: {
        fontFamily: FONTS.EXTRA_BOLD,
        color: COLORS.GRAY,
    },
    imdbContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: COLORS.YELLOW,
        borderBottomLeftRadius: 5,
        borderTopRightRadius: 12,
        paddingVertical: 3
    },
    imdbImage: {
        height: 20,
        width: 50,
        borderBottomLeftRadius: 5,

    },
    imbbRating: {
        marginRight: 5,
        color: COLORS.HEART,
        fontFamily: FONTS.EXTRA_BOLD
    },
    heartOutline: {
        position: 'absolute',
        bottom: 30,
        left: 10
    }
})

MovieCard.defaultProps = {
    size: 1,
    heartLess:true,
    voteCount:0,
    language:"",
}

export default MovieCard;