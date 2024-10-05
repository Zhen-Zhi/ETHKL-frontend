import React from 'react';
import { Image, StyleSheet, useColorScheme, View, Text, ScrollView, TouchableOpacity, Button } from 'react-native';
import { styled } from 'nativewind';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { ParallaxScrollView } from "@components/ParallaxScrollView";
import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import {
  useActiveAccount,
  useConnect,
  useDisconnect,
  useActiveWallet,
  ConnectButton,
  lightTheme,
  ConnectEmbed,
} from "thirdweb/react";
import {
  getUserEmail,
  hasStoredPasskey,
  inAppWallet,
} from "thirdweb/wallets/in-app";
import { chain, client } from "@constants/thirdweb";
import { shortenAddress } from "thirdweb/utils";
import { ThemedButton } from "@components/ThemedButton";
import { useEffect, useState } from "react";
import { createWallet } from "thirdweb/wallets";
import { baseSepolia, ethereum } from "thirdweb/chains";
import { createAuth } from "thirdweb/auth";
const StyledView = styled(View)
const StyledText = styled(Text)
const StyledScrollView = styled(ScrollView)
const StyledTouchableOpacity = styled(TouchableOpacity)
const StyledImage = styled(Image)

const Profile = () => {
  const address = useActiveAccount();

  // Dummy data with image sources and XP calculation
  const profileData = {
    level: 5,
    xp: 32, // 2 * (2^(5-1)) = 32 for level 5
    maxXp: 64, // 2 * (2^5) = 64 for next level
    badges: [
      { name: 'Tier 1 Badge', image: require('@asset/images/badge1.png') },
      { name: 'Tier 2 Badge', image: require('@asset/images/badge1.png') },
      { name: 'Tier 3 Badge', image: require('@asset/images/badge1.png') }
    ],
    vouchers: [
      { name: '20% off McDonalds', image: require('@asset/images/mcdonalds.png') },
      { name: 'Tier 2 Badge', image: require('@asset/images/mcdonalds.png') },
      { name: 'Tier 3 Badge', image: require('@asset/images/mcdonalds.png') }
    ]
  };

  // Calculate XP percentage for the progress bar
  const xpPercentage = (profileData.xp / profileData.maxXp) * 100;

  return (
    <StyledScrollView className="flex-1 bg-gray-100">
      <StyledView className="bg-white rounded-lg p-5 m-5 shadow-md">
        <StyledText className="text-blue-500 text-center text-2xl font-bold mb-4">User Profile</StyledText>
        <StyledView className="mb-3">
          <StyledText className="font-bold text-blue-500">Wallet Address:</StyledText>
          {address ? (
            <StyledText className="mt-1">{address?.address}</StyledText>
          ) : (
            <StyledText className="my-2">Not connected</StyledText>
          )}
          <ConnectButton
            client={client}
          />
        </StyledView>
        <StyledView className="mb-3">
          <StyledText className="font-bold text-blue-500">Level:</StyledText>
          <StyledText className="mt-1">{profileData.level}</StyledText>
          <StyledView className="mt-2 bg-gray-200 rounded-full h-4 overflow-hidden">
            <StyledView 
              className="bg-blue-500 h-full rounded-full" 
              style={{ width: `${xpPercentage}%` }}
            />
          </StyledView>
          <StyledText className="mt-1 text-sm text-gray-600">
            XP: {profileData.xp} / {profileData.maxXp}
          </StyledText>
        </StyledView>
     
      </StyledView>

      <StyledText className="font-bold text-blue-500 m-5 mb-2">Badges:</StyledText>
      {profileData.badges.map((badge, index) => (
        <StyledView key={index} className="bg-white rounded-lg p-5 mx-5 mb-3 shadow-md flex-col items-center">
          <StyledImage 
            source={badge.image} 
            className="w-60 h-60 mr-3 mb-2"
          />
          <StyledText>{badge.name}</StyledText>
          <StyledTouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded mt-2"
            onPress={() => console.log(`Minting ${badge.name}`)}
          >
            <StyledText className="text-white text-center">Mint</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
        
      ))}

      <StyledText className="font-bold text-blue-500 m-5 mb-2">Vouchers:</StyledText>
      {profileData.vouchers.map((voucher, index) => (
           <StyledView key={index} className="bg-white rounded-lg p-5 mx-5 mb-3 shadow-md flex-col items-center">
           <StyledImage 
             source={voucher.image} 
             className="w-60 h-60 mr-3 mb-2"
           />
           <StyledText>{voucher.name}</StyledText>
           <StyledTouchableOpacity
             className="bg-blue-500 py-2 px-4 rounded mt-2"
             onPress={() => console.log(`Minting ${voucher.name}`)}
           >
             <StyledText className="text-white text-center">Mint</StyledText>
           </StyledTouchableOpacity>
         </StyledView>
      ))}
    </StyledScrollView>
  );
};

export default Profile;