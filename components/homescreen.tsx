import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    useWindowDimensions,
    View,
    Alert
  } from 'react-native';
import {Colors } from 'react-native/Libraries/NewAppScreen';
import { choosedirectory} from './handlefilesystem';
import { useEffect, useState } from 'react';

import Movies from './Movies';

import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';

import { useCallback } from 'react';
import { useRef } from 'react';
import AmariWebViewButton from './AmariWebView';
import { NativeModules } from "react-native";
import { deleteFiles } from './Downloadfile';
type OpenURLButtonProps = {
    url: string;
    children: string;
  };
export default function HomeScreen({navigation}:any){
    let webviewRef:any = useRef()
    const [movies,setMovies] = useState([]);
    const isDarkMode = useColorScheme() === 'dark';
    const [allhasbeendel,setAllHasBeenDel] = useState(false);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        minHeight:useWindowDimensions().height,
        flex:1
      };
    const loadmovies = async () =>{
        let files:any = await choosedirectory()
        files = files.filter((file:any) =>{return(file.mime === "video/mp4")})
        //console.log(files)
        setMovies(files)
    }
    const deleteall = () =>{
        Alert.alert('Delete All Subtitles', 'This will delete all subtitles.', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: async () => {await deleteFiles();setAllHasBeenDel(true)}},
          ]);
    }
 

    return(
        
        <SafeAreaView style={backgroundStyle} >
        
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:100}}>
            <Text style={{fontSize:30,fontWeight:"bold"}}>CaesarAIMovies</Text>
        </View>

        {movies.length !== 0 ?

        <FlatList
        style={{margin:20}}
        data={movies}
        renderItem={({item, index}:any) =>  <Movies  key={index} uri={item.uri} title={item.name} navigation={navigation} allhasbeendel={allhasbeendel}></Movies>
        }
        />
        :

        <View style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:200}}>
        <Text>Add Movies (+)</Text>
        </View>
        }   

            <View style={{position:"absolute",right:5,bottom:40}}>
                <View style={{display:"flex",gap:20}}>
                    <TouchableOpacity onPress={() =>{deleteall()}}>
                    <Text>Delete All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{loadmovies()}}>
                    <Image source={require('./MoviePlus.png')} />
                    </TouchableOpacity>
                    <AmariWebViewButton/>
                </View>

            </View>
      </SafeAreaView>
    )
}

// Later on in your styles..
var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        height:500
    },
    });