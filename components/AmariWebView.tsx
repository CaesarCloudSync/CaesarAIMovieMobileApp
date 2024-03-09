import InAppBrowser from "react-native-inappbrowser-reborn";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { Image } from "react-native";

export default function AmariWebViewButton(){
    const handleOpenInAppBrowser = async () => {
        if (InAppBrowser) {
          const url = "https://amari.dev"; // Replace with the URL you want to open
          const result = await InAppBrowser.open(url, {});
        }
      };
      return (
        <SafeAreaView>
          <TouchableOpacity onPress={handleOpenInAppBrowser}>
            <Image source={require("./Amari-logo.png")}></Image>
          </TouchableOpacity>
        </SafeAreaView>
      );
}