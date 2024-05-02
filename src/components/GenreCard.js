import React from "react";
import {View,TouchableOpacity,Text, StyleSheet,Dimensions} from'react-native';
import COLORS from "../constants/Colors";
import FONTS from"../constants/Fonts"

const {height,width} =Dimensions.get("screen");
const setWidth=(w)=>(width/100)*w;

const GenreCard=({genreName,active,onPress})=>{

    return(
      <TouchableOpacity style={{...styles.container,backgroundColor:active? COLORS.ACTIVE :COLORS.WHITE}} activeOpacity={0.5} onPress={()=>{
        onPress(genreName)
      }}>
          <Text style={{...styles.genreText,color:active ? COLORS.WHITE:COLORS.BLACK}}>{genreName}</Text>
      </TouchableOpacity>
    )
  }

  const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        paddingVertical:8,
        marginVertical:2,
        elevation:3,
        backgroundColor:COLORS.WHITE,
        width:setWidth(25)
    },
    genreText:{
        fontSize:13,
        color:COLORS.ACTIVE,
        fontFamily:FONTS.BOLD
    }
  })

  export default GenreCard;