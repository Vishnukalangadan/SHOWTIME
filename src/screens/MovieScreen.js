
import { StatusBar } from 'expo-status-bar';
import { Text, View, Alert, StyleSheet, Button, Image, Dimensions, Linking, ImageBackground, ScrollView, TouchableOpacity, FlatList, Share } from 'react-native';
import { getMovieById, getPoster, getVideo, getLanguages } from '../services/MovieServices';
import React, { useState, useEffect, useCallback } from 'react';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts'
import ItemSeparator from '../components/ItemSeparator';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { APPEND_TO_RESPONSE as AR } from '../constants/Urls';
import CastCards from '../components/CastCard';
import MovieCard from '../components/MovieCard';
import IMAGES from '../constants/Images';
import YoutubePlayer from "react-native-youtube-iframe";

const { width, height } = Dimensions.get("screen");

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const MovieScreen = ({ route, navigation }) => {

  const { movieId } = route.params
  const [movieDetails, setMovieDetails] = useState({})
  const [trailer, setTrailer] = useState([])
  const [isCastClicked, setIsCastClicked] = useState(true)
  // console.log("details", movieDetails)
  // console.log("TRA", trailer)
  const index = trailer.findIndex(item => item.type === "Trailer")
  const [playing, setPlaying] = useState(false);
  const [play, setPlay] = useState(false)
  // console.log("index",index)
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  useEffect(() => {
    getMovieById(movieId, `${AR.VIDEOS},${AR.CREDITS},${AR.SIMILAR},${AR.RECOMMENDATIONS}`).then(rsp => {
      setMovieDetails(rsp.data)
      setTrailer(rsp.data.videos.results)
      // console.log("details", rsp.data)
    })
  }, [])

  return (
    <ScrollView style={{ backgroundColor: COLORS.BLACK }}>
      <StatusBar style='light' />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.posterImageContainer}>
        <Image
          style={styles.posterImage}
          resizeMode='cover' source={{ uri: getPoster(movieDetails.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
          <Feather name='chevron-left' size={35} color={COLORS.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => Share.share({ message: `Movie Name - ${movieDetails?.title}\n\n Trailer Link - ${`www.youtube.com/watch?v=${trailer[index !== -1 ? index : 0]?.key}`}` })

        }>
          <Text style={styles.headerText}>Share</Text>

        </TouchableOpacity>

      </View>
      {/* <TouchableOpacity style={styles.playBtn} onPress={() => Linking.openURL(getVideo(trailer[index !== -1 ? index : 0]?.key))}> */}
      <TouchableOpacity style={styles.playBtn} onPress={() => setPlay(!play)}>
        {
          play === false ? <Ionicons name="play-circle-outline" size={55} color={COLORS.WHITE} />
            : <Ionicons name="stop-circle-outline" size={55} color={COLORS.WHITE} />
        }

      </TouchableOpacity>

      <ItemSeparator
        height={setHeight(34)}
      />
      {
        play === true ?
          <View>
            <YoutubePlayer
              height={250}
              play={playing}
              videoId={trailer[index !== -1 ? index : 0]?.key}
              onChangeState={onStateChange}
            />
            {/* <Button title={playing ? "pause" : "play"} onPress={togglePlaying} /> */}
          </View> : null

      }
      <View style={styles.movieTitleConatiner}>
        <Text style={styles.movieTitle} numberOfLines={2}>{movieDetails.title}</Text>
        <View style={styles.row}>
          <Ionicons name="heart" size={17} color={COLORS.HEART} style={{ marginRight: 5 }} />
          <Text style={styles.ratingText}>{movieDetails.vote_average}</Text>
        </View>

      </View>
      <Text style={styles.genreText}>
        {movieDetails?.genres?.map((genre) => genre.name)?.join(",")} | {" "} {movieDetails?.runtime} Min
      </Text>
      <Text style={styles.genreText}>{getLanguages(movieDetails?.original_language)?.english_name}</Text>
      <View style={styles.overViewContainer}>
        <Text style={styles.overViewTitle}>SYNOPSIS</Text>
        <Text style={styles.overViewText}>{movieDetails?.overview}</Text>
      </View>
      <View>
        <View style={styles.castContainer}>
          <TouchableOpacity onPress={() => setIsCastClicked(true)} >
            <Text style={isCastClicked ? styles.castTitle : { ...styles.castTitle, color: COLORS.GRAY }}>Cast</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsCastClicked(false)} >
            <Text style={isCastClicked ? { ...styles.castTitle, color: COLORS.GRAY } : styles.castTitle}>Crew</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={isCastClicked ? movieDetails?.credits?.cast : movieDetails?.credits?.crew}
          keyExtractor={(item) => item.credit_id}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CastCards originalName={item?.name} characterName={isCastClicked ? item?.character : item.job} image={item?.profile_path} />}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.castTitle}>Recommendations</Text>
        <FlatList
          data={movieDetails?.recommendations?.results}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average.toFixed(1)}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.5}
            onPress={() => navigation.push("Movie", { movieId: item.id })}
          />}
        />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={styles.castTitle}>Similar</Text>
        <FlatList
          data={movieDetails?.similar?.results}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <MovieCard
            title={item.title}
            language={item.original_language}
            voteAverage={item.vote_average.toFixed(1)}
            voteCount={item.vote_count}
            poster={item.poster_path}
            size={0.5}
            onPress={() => navigation.push("Movie", { movieId: item.id })}
          />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK,
  },
  posterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: 'center',
    position: 'absolute',
    // left:setWidth(1)
    // top:0,
    // marginTop:100,
    // borderBottomLeftRadius:300,
    // borderBottomRightRadius:300,
    elevation: 8

  },
  posterImage: {
    width: setWidth(100),
    height: setHeight(30),
    alignSelf: 'baseline',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: 'absolute',
    top: 0,
    elevation: 9
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    right: 0,
    left: 0,
    top: 50,
    elevation: 20
  },
  headerText: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD
  },
  playBtn: {
    position: 'absolute',
    top: 180,
    left: setWidth(45),
  },
  movieTitleConatiner: {
    // marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: COLORS.BLACK
  },
  movieTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(70)

  },
  ratingText: {
    marginLeft: 5,
    color: COLORS.WHITE,
    fontFamily: FONTS.EXTRA_BOLD,
    fontSize: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  genreText: {
    color: COLORS.LIGHT_GRAY,
    paddingHorizontal: 20,
    fontFamily: FONTS.BOLD,
    marginTop: 10,
  },
  overViewContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.BLACK,
    marginVertical: 10,


  },
  overViewText: {

    color: COLORS.LIGHT_GRAY,
    fontFamily: FONTS.BOLD,
    fontSize: 13,
    paddingVertical: 10,
    textAlign: 'justify'
  },
  overViewTitle: {
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
    fontSize: 18
  },
  castTitle: {
    marginLeft: 20,
    color: COLORS.WHITE,
    fontFamily: FONTS.BOLD,
    fontSize: 18,
    marginBottom: 5,
    // justifyContent:'center'
    // marginTop:15
  },
  castContainer: {
    marginRight: 10,
    flexDirection: 'row',
    marginBottom: 10
  },
})


export default MovieScreen;
