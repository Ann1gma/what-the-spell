import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import store from "./store";
import { Provider } from "react-redux";
import AuthContextProvider from "@/context/AuthContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		CinzelRegular: require("../assets/fonts/Cinzel-Regular.ttf"),
		CinzelSemiBold: require("../assets/fonts/Cinzel-SemiBold.ttf"),
		CinzelBold: require("../assets/fonts/Cinzel-Bold.ttf"),
		CinzelBlack: require("../assets/fonts/Cinzel-Black.ttf"),
		Inter: require("../assets/fonts/Inter-VariableFont.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}
	return (
		<Provider store={store}>
			<AuthContextProvider>
				<Stack screenOptions={{ headerShadowVisible: false }}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				</Stack>
			</AuthContextProvider>
		</Provider>
	);
}
