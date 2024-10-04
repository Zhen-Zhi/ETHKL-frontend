import { View, Text } from 'react-native'
import { Redirect, Stack, Tabs, withLayoutContext } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'

export default function TabLayout() {
	return (
		<Tabs>
			<Tabs.Screen
				name="home"
				options={{ title: 'Home' }}
			/>
			<Tabs.Screen
				name="post"
				options={{ title: 'Post' }}
			/>
			<Tabs.Screen
				name="profile"
				options={{ title: 'Profile' }}
			/>
		</Tabs>
  );
}