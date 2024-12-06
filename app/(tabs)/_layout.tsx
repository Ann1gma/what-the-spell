import { Tabs } from "expo-router";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#C20000",
				tabBarInactiveTintColor: "#2B2B2B",
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Spellbook",
					tabBarIcon: ({ color }) => <FontAwesome6 name="book-bookmark" size={28} style={[{ marginBottom: -3, color: color }]} />,
				}}
			/>
			<Tabs.Screen
				name="Characters"
				options={{
					title: "Characters",
					tabBarIcon: ({ color }) => <FontAwesome5 name="dice-d20" size={28} style={[{ marginBottom: -3, color: color }]} />,
				}}
			/>
		</Tabs>
	);
}
