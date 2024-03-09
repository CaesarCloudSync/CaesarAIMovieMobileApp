import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    useWindowDimensions,
    View,
    Dimensions,
    Pressable,
    TouchableOpacity
  } from 'react-native';
import {Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from 'react-native';
//import { VideoPlayer } from './VideoPlay';
import { useEffect, useState } from 'react';
import VideoPlayer from 'react-native-video-controls';
import  {TextTrackType} from "react-native-video"
import axios from "axios"
import Video from 'react-native-video';
import { AmariSubtitles } from './AmariSubtitle';

import { useDeviceOrientation } from "@react-native-community/hooks";
import RNFS from 'react-native-fs';
export default function WatchMovie({ route, navigation}:any){
  const orientation = useDeviceOrientation();
  //console.log(orientation)
  const [currentTime,setCurrentTime] = useState(0);
  const height = useWindowDimensions().height
  const width = useWindowDimensions().width
  const [subtitles,setSubtitles] = useState("");
  const [subfilebuffer,setSubFileBuffer] = useState(null);
  const [showReturn,setShowReturn] = useState(true)


  const {mediauri,thumbnail,title,subtitlepath} = route.params;
  useEffect(() => {
    if (showReturn) {
      const timeout = setTimeout(() => setShowReturn(false), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showReturn]);

 
      return(
        <SafeAreaView style={{backgroundColor:"black", height:height}}>
          {showReturn === true &&
                    <TouchableOpacity onPress={() =>{navigation.goBack()}}  style = {{position:"absolute",top:20,left:20,zIndex:100}}>
                    <Text>Return</Text>
                </TouchableOpacity>}

        
      <Pressable onPress={() =>{setShowReturn(true)}}>
      <Video
      style={{height:height}}
      controls={true}
      resizeMode={"contain"}
      fullscreen={true}
        source={{uri: mediauri}}
        selectedTextTrack={{type: "title", value: "English Subtitles"}}
        onLoad={(data) =>{}}
        onProgress={(data) =>{setCurrentTime(data.currentTime)}}


        //navigator={navigation}

/></Pressable>
<View style={{position:"absolute",bottom:20,left:orientation === "portrait" ? 100:200}}>
  {subtitlepath &&
    <AmariSubtitles 
    textStyle={{fontSize:orientation === "portrait" ? 15:25,backgroundColor:"transparent"}}
      
    {...{ currentTime }}
    selectedsubtitle={{
      file:
      subtitlepath,
    }}
    // 'https://www.opensubtitles.com/download/FC9F68A3945E08E6899EA2E422415E27F216C36DB3B8F68F0A9E993D83283CAE954CAF15BFB7112C4520961188201008ECC6DCFA1ACD0D970DEB61ACCF651F390F5FEA1A07C308F0486AF86B3C613ABA64E65F1F3D44E5E8C404D020F590902F64CD582659CA51DCD2B4AAFA0622A858A76D1B2A353F7E0F152A2E34757D825AB11DD6EA59BB33AC378783CFEE76ACE82817D0BF7335933ECAF314B5A0D21239B962594E3BF377A1F6D6FC3D30F3F905ECA6AF292EB586B443E8762DBB171927AEB2584E354607B3E374B89BF1D01B7652CB05B1490B58BCC58C491BB6EB5294A16BA02E9B05D6249A5F99D822C2DC2C0C7954F58BF0664E34948FEDEAD999F6217E357222CE88F777D38D3D5CE80C01BC5F89305C68ABF3A22D7D8586A31616F752C884D867655AC5127E5C2259CDC8A8712887A2650B531CEBB5D62197DEDB85FF8D49581DDE99/subfile/The.Wrong.Way.to.Use.Healing.Magic.S01E04.WEB.H264-KAWAII.en.srt'
    />}

</View>

  


      </SafeAreaView>
    )
  
    }

