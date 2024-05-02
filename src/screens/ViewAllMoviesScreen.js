import React from "react";
import { View, Text, StyleSheet, FlatList, ScrollView,TouchableOpacity } from 'react-native';
import COLORS from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import ItemSeparator from "../components/ItemSeparator";
import MovieCard from "../components/MovieCard";
import { useNavigation } from "@react-navigation/native";
import Fonts from "../constants/Fonts";
import { Feather } from '@expo/vector-icons';


const ViewAll = ({ route }) => {
    const navigation = useNavigation();
    const { movieArray } = route.params;
    const { title } = route.params
    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ alignItems: 'center', marginTop: 50, marginBottom: 20, flexDirection: 'row' }}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <Feather name='chevron-left' size={35} color={COLORS.WHITE} />
                    </TouchableOpacity>
                    <Text style={styles.titleContainer}>{title}</Text>
                </View>
                    <View style={styles.cardContainer}>
                        <FlatList
                            data={movieArray.results}
                            numColumns={2}
                            columnWrapperStyle={styles.flatliststyle}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                            ItemSeparatorComponent={() => <ItemSeparator width={20} height={10} />}
                            ListHeaderComponent={() => <ItemSeparator width={20} />}
                            ListFooterComponent={() => <ItemSeparator width={20} height={150} />}
                            renderItem={({ item }) =>
                                <MovieCard
                                    title={item.title}
                                    voteAverage={item.vote_average.toFixed(1)}
                                    poster={item.poster_path}
                                    size={0.5}
                                    onPress={() => navigation.navigate("Movie", { movieId: item.id })}
                                />
                            }
                        />
                    </View>
            </View>

        </View>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.BLACK,

    },
    cardContainer: {
        flexDirection: 'row',
        marginBottom:100
    },
    flatliststyle: {
        justifyContent: 'space-between'
    },
    titleContainer: {
        color: COLORS.YELLOW,
        fontSize: 35,
        fontFamily: Fonts.REGULAR,
        marginLeft:60
    }
})

export default ViewAll;