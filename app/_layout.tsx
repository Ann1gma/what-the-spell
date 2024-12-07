import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		CinzelRegular: require("../assets/fonts/Cinzel-Regular.ttf"),
		CinzelSemiBold: require("../assets/fonts/Cinzel-SemiBold.ttf"),
		CinzelBold: require("../assets/fonts/Cinzel-Bold.ttf"),
		CinzelBlack: require("../assets/fonts/Cinzel-Black.ttf"),
		NunitoRegular: require("../assets/fonts/Nunito-Regular.ttf"),
		NunitoSemiBold: require("../assets/fonts/Nunito-SemiBold.ttf"),
		NunitoBold: require("../assets/fonts/Nunito-Bold.ttf"),
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
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
}
