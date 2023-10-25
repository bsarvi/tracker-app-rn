import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  useFonts,
  Nunito_200ExtraLight,
  Nunito_300Light,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";
import * as SplashScreen from "expo-splash-screen";
import { setStatusBarStyle } from "expo-status-bar";
import { COLORS, FONT } from "./app/constants";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { HomeScreen, DetailsScreen, AddScreen } from "./app/screens/";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DataProvider } from "./app/context/DataContext";

const Stack = createNativeStackNavigator();

const stackNavigatorOptions = {
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: COLORS.background,
  },
  headerTintColor: COLORS.white,
  headerLeft: () => {
    const navigation = useNavigation();
    const handelPress = () => {
      navigation.navigate("Home");
    };

    return (
      <TouchableOpacity onPress={handelPress}>
        <Text style={styles.logoText}>TRACKER</Text>
      </TouchableOpacity>
    );
  },
  headerTitle: "",
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_300Light,
    Nunito_400Regular,
    Nunito_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  setStatusBarStyle("light");
  return (
    <NavigationContainer>
      <DataProvider>
        <Stack.Navigator screenOptions={stackNavigatorOptions}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  logoText: {
    color: COLORS.white,
    ...FONT.extraLight,
    fontSize: 24,
  },
});
