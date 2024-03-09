import { Button, Image, Text, View ,Pressable,TextInput, Alert } from "react-native";
import Video from "react-native-video"
import { useEffect, useRef, useState } from "react";
import {createThumbnail} from 'react-native-create-thumbnail'; 
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { downloadFile, getFileURI, readFile } from "./Downloadfile";
import { Dropdown } from "./SelectDropDown";
export default function Movies({title,uri,navigation}:any){
    const [thumbnail,setThumbnail] = useState(null);
    const [addingsubtitle,setAddingSubtitle] = useState(false);
    const [subimdb_id,setSubImdbID] = useState("");
    const [subtitlepath,setSubtitlePath] = useState("");
    const [subtitlename,setSubtitleName] = useState("");
    const [subtitleselectpaths,setSubtitleSelectPaths] = useState([]);
    const [loadingsubtitle,setLoadingSubtitle] = useState(false)

    function isNumber(value:any) {
      return !isNaN(value);
    }
    const handleSubtitleLink = async () =>{
      
      if (subimdb_id === ""){
        Alert.alert("Fill in field.")
      }
      else{
        try{
          setLoadingSubtitle(true)
          let substring = subimdb_id.split("/")
        
          if (substring[substring.length -1].includes("tt")){
            // Movie
            const response  = await axios.get(`https://amarisubtitles-qqbn26mgpa-uc.a.run.app/api/fetchsubtitlemovie?imdb_id=${substring[substring.length -1]}`)
            let result = response.data
          
            await downloadFile(result.link,result.filename)
            let path:any = await getFileURI(result.filename)
            //console.log(path)
            setSubtitlePath(path)

            setSubtitleName(result.filename)

  
          }
          else if (isNumber(substring[substring.length -1])){
            // Series
            const response  = await axios.get(`https://amarisubtitles-qqbn26mgpa-uc.a.run.app/api/fetchsubtitle?imdb_id=${substring[substring.length -3]}&season=${substring[substring.length -2]}&episode=${substring[substring.length -1]}`)
            let result = response.data

            setSubtitleName(result.filename)
            await downloadFile(result.link,result.filename)
            let path:any = await getFileURI(result.filename)
            setSubtitlePath(path)
     
     
          }
          else{
            Alert.alert("Incorrect format.")
          }
        }
        catch(error:any){
          Alert.alert(error.message)
        }
        setLoadingSubtitle(false)
        

      }

    }
    const generateThumbnail = (uri:string) => {
        createThumbnail({
          url: uri,
          timeStamp: 10000,
          format: 'png',
        })
          .then((response:any)=> {
            //console.log('response', response);
            setThumbnail(response.path)
          })
          .catch(err => console.log({err}));
      };
      useEffect(()=>{
        generateThumbnail(uri)
        readFile(setSubtitleSelectPaths)
      },[])
    return(
        <View >
            {thumbnail !== null && (uri !== undefined || uri !== null) &&
            <TouchableOpacity style={{display:"flex",flexDirection:"row",width:200,gap:30,marginLeft:20,marginTop:20}} onPress={() =>{
                //console.log(uri);
                          navigation.navigate('Watchmovie', {
                            mediauri:uri,
                            thumbnail:thumbnail,
                            title:title,
                            subtitlepath:subtitlepath
                          });
            }}>
            
            <Image style={{width:100,height:100}}   source={{
                uri: thumbnail,
                }}></Image>

            <Text style={{flexWrap:"wrap"}}>{title}</Text>
            </TouchableOpacity>
        }
        <View style={{display:"flex",justifyContent:"flex-start",alignItems:"flex-start",width:addingsubtitle === false ?  500 : 300}}>
          {subtitlename === "" ? addingsubtitle === false ?
          thumbnail !== null && (uri !== undefined || uri !== null) &&
          <View style={{display:"flex",marginTop:20,gap:10}}>

            <Pressable onPress={() =>{setAddingSubtitle(true)}} style={{display:"flex",backgroundColor:"#141212",padding:10,borderRadius:5}}>
            <Text style={{color:"white"}}>Add Subtitle</Text>
          
          </Pressable>
          {subtitleselectpaths.length !== 0 &&
            <Dropdown style={{marginTop:3}} data={subtitleselectpaths.map((pathselect:any) =>{;return(pathselect.label)}).filter((name:any) =>{return(name.includes("srt"))})} setSubtitleName={setSubtitleName} setSubtitlePath={setSubtitlePath}></Dropdown>  
            }
          </View>
              :
          <View style={{display:"flex",flexDirection:"row"}}>
            
              <TextInput
              style={{borderColor:"white",marginLeft:17}}
              value={subimdb_id}
              onChangeText={(text) =>{
                if (text.includes("imdb=")){
                  console.log(text.split("=")[1].split("&")[0])
                  setSubImdbID(text.split("=")[1].split("&")[0])
                }
                else{
                  setSubImdbID(text)
                }
              }}

              placeholder="Enter IMDBId(tv|movie/tt11126994/1/1):"

              />
              <View style={{marginLeft:17,marginTop:12}}>
                {loadingsubtitle === false?
                              <Pressable onPress={() =>{handleSubtitleLink()}} style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"green",padding:5,borderRadius:5}}>
                              <Text>Submit</Text>
                            </Pressable>
                            :
                  <Pressable disabled  style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"grey",padding:5,borderRadius:5}}>
                      <Text>Submit</Text>
                    </Pressable>
                            }

                </View>
                <View style={{marginLeft:17,marginTop:11,width:20}}>
                  <Pressable onPress={() =>{setSubImdbID("");setAddingSubtitle(false)}}>
                    <Text style={{fontSize:20}}>x</Text>
                  </Pressable>
                </View>

            

          </View>:
          <Text>
              {subtitlename}
          </Text>

                  }

        </View>
 

            
        </View>

    )
}