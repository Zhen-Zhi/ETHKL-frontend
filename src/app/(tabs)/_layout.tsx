import { View, Text } from 'react-native'
import { Redirect, Stack, Tabs, withLayoutContext } from 'expo-router';
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useConnect, useActiveAccount } from 'thirdweb/react';
import { ThemedButton } from '@/src/components/ThemedButton';
import { client } from '@/src/constants/thirdweb';
import { createWallet } from 'thirdweb/wallets';
import AnimatedPressable from '@/src/components/AnimatedPressable';

export default function TabLayout() {
	const ConnectWithMetaMask = () => {
		const account = useActiveAccount(); // Get the connected wallet address
		const { connect, isConnecting } = useConnect();
		return (
			<AnimatedPressable
				className='justify-end w-1/2 p-3 rounded-lg mx-3 bg-[#267dff]'
				pressInValue={0.9}
				onPress={() => {
					connect(async () => {
						const w = createWallet("io.metamask");
						await w.connect({
							client,
						});
						return w;
					});
				}}
			>
				{isConnecting ? <Text className='font-semibold text-[#ffffff]'>Connecting Wallet...</Text> : <Text className='text-center truncate font-semibold text-[#ffffff]' numberOfLines={1}>{account?.address ? `Wallet: ${account?.address}` : "Connect Wallet"}</Text>}
			</AnimatedPressable>
		);
	};
	
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: '#0066ff' }}>
			<Tabs.Screen
				name="home"
				options={{ 
					title: 'Home',
					tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
					headerRight: () => <ConnectWithMetaMask />,
				}}
			/>
			<Tabs.Screen
				name="post"
				options={{ 
					title: 'Post',
					tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={28} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{ 
					title: 'Profile',
					tabBarIcon: ({ color }) => <FontAwesome name="user" size={28} color={color} />,
				}}
			/>
		</Tabs>
  );
}