import { View,StyleSheet ,Button} from "react-native";
import { useRef,useState } from "react";
import Video from "react-native-video";
export const VideoPlayer = ({uri,styles}:any) => {
    const videoPlayer:any = useRef();
    const [isPlaying, setIsPlaying] = useState(false);  
    const [isMuted, setIsMuted] = useState(false);  


    const goFullScreen = () => {  
        if (videoPlayer.current) {  
            videoPlayer.current.presentFullscreenPlayer();  
        }  
    };

    return (
        <View >
            <Video  
                ref={ref => (videoPlayer.current = ref)}
                source={{uri:uri}}                  // the video file
                paused={false}                  // make it start    
                style={styles}  // any style you want
                repeat={true}                   // make it a loop
                controls={true}
                resizeMode={"contain"}
                fullscreen={true}
            
            />

        </View>

    )
}