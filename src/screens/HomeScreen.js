import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import COLORS from '../constants/Colors';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import { useState, useEffect } from 'react';
import FONTS from '../constants/Fonts'
import MovieCard from '../components/MovieCard';
import { Ionicons } from '@expo/vector-icons';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { getNowPlayingMovies, getUPComingMovies, getGenre, getPopularMovies, getTopRatedMovies } from '../services/MovieServices';

const HomeScreen = ({ navigation }) => {
  // const [activeGenre, setActiveGenre] = useState("All")
  const [nowPlayingMovies, SetNoWPlayingMovies] = useState({})
  const [upcoming, setUpcoming] = useState({})
  const [genres, setGenres] = useState([{ "id": 11088, "name": "All" }])
  const [topRated, setTopRated] = useState({})
  const [popular, setPopular] = useState({})


  useEffect(() => {
    getNowPlayingMovies().then(rsp => SetNoWPlayingMovies(rsp.data));
    getUPComingMovies().then(rsp => {
      setUpcoming(rsp.data)
      // console.log("upcoming",rsp.data)
    })
    // getGenre().then(genreResponse => {
    //   setGenres([...genres, ...genreResponse.data.genres])
    //   // console.log("genre",rsp.data)
    // })
    getPopularMovies().then(rsp => setPopular(rsp.data));
    getTopRatedMovies().then(rsp => setTopRated(rsp.data));

  }, [])


  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style='light' />
      <View style={styles.titleContainer}>
        {/* <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white" /> */}
        <View style={{ marginLeft:100 }}>

          <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>
            <Text style={{ color: '#eab308', }}>SHOW</Text>TIME</Text>
        </View>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Search")
        }} >
          <Ionicons name="search" size={30} color={COLORS.WHITE} />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) =>
            <GenreCard genreName={item.name} active={item.name === activeGenre ? true : false} onPress={(genreElement) => {
              setActiveGenre(genreElement)
            }} />
          }
        />
      </View> */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>In Theaters</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("ViewAll", { movieArray: nowPlayingMovies, title: "In Theaters" })
        }}>
          <Text style={styles.headerSubTitle}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) =>
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average.toFixed(1)}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              size={1}
              onPress={() => navigation.navigate("Movie", { movieId: item.id })}

            />
          }
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("ViewAll", { movieArray: upcoming, title: "Coming Soon" })
        }}>
          <Text style={styles.headerSubTitle}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={upcoming.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) =>
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average.toFixed(1)}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.5}
              onPress={() => navigation.navigate("Movie", { movieId: item.id })}
            />
          }
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Top Rated</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("ViewAll", { movieArray: topRated, title: "Top Rated" })
        }}>
          <Text style={styles.headerSubTitle}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={topRated.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) =>
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average.toFixed(1)}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.5}
              onPress={() => navigation.navigate("Movie", { movieId: item.id })}
            />
          }
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Popular</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("ViewAll", { movieArray: popular, title: "Popular" })
        }}>
          <Text style={styles.headerSubTitle}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.genreListContainer}>
        <FlatList
          data={popular.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) =>
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average.toFixed(1)}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.5}
              onPress={() => navigation.navigate("Movie", { movieId: item.id })}
            />
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BLACK
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONTS.REGULAR,
    color: COLORS.WHITE
  },
  headerSubTitle: {
    fontSize: 15,
    color: COLORS.ACTIVE,
    fontFamily: FONTS.BOLD
  },
  genreListContainer: {
    paddingVertical: 20
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 4,
    marginTop: 50
  }
})

export default HomeScreen;
