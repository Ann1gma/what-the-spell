import { Stack, Tabs } from "expo-router";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import useAuth from "@/hooks/useAuth";

export default function TabLayout() {
	const { currentUser } = useAuth();

	if (!currentUser) {
		return (
			<Stack screenOptions={{ headerShadowVisible: false }}>
				<Stack.Screen name="Login" options={{ headerShown: false }} />
				<Stack.Screen name="Signup" options={{ headerShown: false }} />
			</Stack>
		);
	} else {
		return (
			<Stack screenOptions={{ headerShadowVisible: false }}>
				<Stack.Screen name="Logout" options={{ headerShown: false }} />
			</Stack>
		);
	}
}
