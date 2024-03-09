import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Text,View } from "react-native";
import HomeScreen from "./components/homescreen";
import WatchMovie from "./components/WatchMovie";
const Stack = createNativeStackNavigator();
export default function App () {
  return (

      <NavigationContainer>
      <Stack.Navigator   screenOptions={{
    headerShown: false
  }}>
         {/*Define our routes*/}
         <Stack.Screen name="Home" component={HomeScreen} />
         <Stack.Screen name="Watchmovie" component={WatchMovie} initialParams={{ mediauri: "hello" }} />

       </Stack.Navigator>
     </NavigationContainer>
  )
  }