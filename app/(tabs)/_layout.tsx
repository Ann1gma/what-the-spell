import { Tabs } from "expo-router";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import useAuth from "@/hooks/useAuth";

export default function TabLayout() {
	const { currentUser } = useAuth();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#990000",
				tabBarInactiveTintColor: "#2B2B2B",
				headerShown: false,
				tabBarStyle: { height: 65 },
				tabBarIconStyle: { margin: "auto" },
				tabBarActiveBackgroundColor: "#F0E4D1",
				tabBarInactiveBackgroundColor: "#F0E4D1",
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
				options={
					!currentUser
						? {
								headerShown: false,
								href: null,
						  }
						: {
								title: "Characters",
								tabBarIcon: ({ color }) => <FontAwesome5 name="dice-d20" size={28} style={[{ marginBottom: -3, color: color }]} />,
						  }
				}
			/>

			<Tabs.Screen
				name="Profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={28} style={[{ marginBottom: -3, color: color }]} />,
				}}
			/>

			<Tabs.Screen
				name="FilterSpellbook"
				options={{
					headerShown: false,
					href: null,
				}}
			/>

			<Tabs.Screen
				name="spells/[id]"
				options={{
					headerShown: false,
					href: null,
				}}
			/>

			<Tabs.Screen
				name="Signup"
				options={{
					headerShown: false,
					href: null,
				}}
			/>

			<Tabs.Screen
				name="ResetPassword"
				options={{
					headerShown: false,
					href: null,
				}}
			/>

			<Tabs.Screen
				name="AddCharacter"
				options={{
					headerShown: false,
					href: null,
				}}
			/>

			<Tabs.Screen
				name="characters/[id]"
				options={{
					headerShown: false,
					href: null,
				}}
			/>

			<Tabs.Screen
				name="UpdateCharacter"
				options={{
					headerShown: false,
					href: null,
				}}
			/>
		</Tabs>
	);
}
