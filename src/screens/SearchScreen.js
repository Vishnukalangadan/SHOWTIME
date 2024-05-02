import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { StatusBar } from "expo-status-bar";
import COLORS from "../constants/Colors";
import FONTS from "../constants/Fonts";
import { Feather,Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { getUPComingMovies,getSearchedMovies } from "../services/MovieServices";
import MovieCard from "../components/MovieCard";
import ItemSeparator from "../components/ItemSeparator";
import debounce from "lodash.debounce";


const { width, height } = Dimensions.get("screen")
const setHeight = (h) => (height / 100) * h
const setWidth = (w) => (width / 100) * w
const SearchScreen = () => {
    const navigation = useNavigation();
    const [resultsCount, setResultsCount] = useState([])
    const [searchedMovies, setSearchedMovies] = useState({})
    const [searchText,setSearchText] =useState('')

    const handleSearch=async (value)=>{
        setSearchText(value)
        await getSearchedMovies({
            query:value,
            include_adult:'true',
        }).then((response)=>{setSearchedMovies(response.data)
          setResultsCount(response.data.results)
        })
    }

    // useEffect(() => {
    //     getUPComingMovies().then(rsp => {
    //         setUpcoming(rsp.data)
    //         // console.log("upcoming",rsp.data)
    //     })

    // }, [])
    // const handleTextDebounce = useCallback(debounce(handleSearch,400),[])
    return (
        <View style={styles.container}>
            <StatusBar style='light' />
            <View style={styles.inputContainer}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Feather name='chevron-left' size={35} color={COLORS.WHITE} />
        </TouchableOpacity>
                <TextInput 
                value={searchText}
                onChangeText={handleSearch}
                placeholder="Search Movies"
                 placeholderTextColor={COLORS.LIGHT_GRAY} 
                 style={styles.input}
                 
                 />
                <TouchableOpacity onPress={() => {
                   setSearchText('')
                   setSearchedMovies('')
                   setResultsCount('')
                }} style={{ padding: 3, margin: 1 }}>
                    <Ionicons name="close-circle-outline" size={35} color={COLORS.WHITE} />
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:20}}>

            
                <Text style={{ color: COLORS.WHITE,marginBottom:10 }}>Results -{'>'} {resultsCount.length}</Text>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        data={searchedMovies.results}
                        numColumns={2}
                        columnWrapperStyle={styles.flatliststyle}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        ItemSeparatorComponent={() => <ItemSeparator width={20} height={10} />}
                        ListHeaderComponent={() => <ItemSeparator width={20} />}
                        ListFooterComponent={() => <ItemSeparator width={20} />}
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
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: COLORS.BLACK,

    },
    inputContainer: {
        marginTop: 80,
        borderRadius: 10,
        borderColor: COLORS.WHITE,
        // width: setWidth(90),
        borderWidth: 2,
        // height: setHeight(5),
        // color: COLORS.WHITE,
        marginHorizontal: 20,
        marginBottom: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        paddingBottom: 1,
        paddingLeft: 15,
        flex: 1,
        color: COLORS.WHITE
    },
    cardContainer: {
        flexDirection: 'row',
        marginBottom:200,
        marginHorizontal:20
        // justifyContent: 'space-between',
        // flexWrap: 'wrap'
    },
    flatliststyle:{
        justifyContent:'space-between'
    }
})

export default SearchScreen;