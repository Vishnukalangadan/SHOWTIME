import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import MovieScreen from "./src/screens/MovieScreen";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import SearchScreen from "./src/screens/SearchScreen";
import ViewAll from "./src/screens/ViewAllMoviesScreen";
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect ,useState} from "react";


const Stack=createStackNavigator();
export default function App(){
  // const [isSplashReady,setIsSplashReady]=useState(false)

  // useEffect(()=>{
  //   SplashScreen.preventAutoHideAsync().then(()=>setIsSplashReady(true));
  //   return ()=>{
  //     SplashScreen.hideAsync();
  //   };
  // },[])

  // useEffect(()=>{
  //   if(fontLoaded && isSplashReady){
  //     SplashScreen.hideAsync();
  //   }
  // },[fontLoaded,isSplashReady]);

  const [fontLoaded]=useFonts({
    Regular:require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
    Bold:require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
    ExtraBold:require('./assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    ExtraLight:require('./assets/fonts/NunitoSans_10pt-ExtraLight.ttf'),
    Light:require('./assets/fonts/NunitoSans_10pt-Light.ttf'),
    SemiBold:require('./assets/fonts/NunitoSans_10pt-SemiBold.ttf')
  })

  return( fontLoaded ?
       <NavigationContainer>
           <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Movie" component={MovieScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
            <Stack.Screen name="ViewAll" component={ViewAll} options={{headerShown:false}}/>
           </Stack.Navigator>
       </NavigationContainer>
       : null
  )
}