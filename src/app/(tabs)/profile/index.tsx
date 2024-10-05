import React, { useState } from 'react';
import { Image, StyleSheet, useColorScheme, View, Text, ScrollView, TouchableOpacity, Button, Alert } from 'react-native';
import { styled } from 'nativewind';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import { ParallaxScrollView } from "@components/ParallaxScrollView";
import { ThemedText } from "@components/ThemedText";
import { ThemedView } from "@components/ThemedView";
import { createThirdwebClient, defineChain, getContract, prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
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
import { createWallet } from "thirdweb/wallets";
import { baseSepolia, ethereum } from "thirdweb/chains";
import { createAuth } from "thirdweb/auth";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledImage = styled(Image);

// Define the Badge type
interface Badge {
  name: string;
  image: any; // Assuming it's a require() statement for image
  tier: number;
  minted: boolean;
}

interface Voucher {
  name: string;
  image: any; // Assuming it's a require() statement for image
  tokenId: number;
  minted: boolean;
}

const Profile = () => {
  const address = useActiveAccount();

  const client = createThirdwebClient({
    clientId: "80c1dc95156948e53be7c5fb04e39f96",
  });
  
  const contract = getContract({
    client,
    chain: defineChain(534351),
    address: "0x9874271DfD997481C342a4bB45aAdDc6cB42Aa52",
  });
  
  const contract2 = getContract({
    client,
    chain: defineChain(534351),
    address: "0x91cf93E732c82716aFB3142f08fDf973B9F996d0"
  });

  const { mutate: sendTransaction } = useSendTransaction();

  const calculateXp = (level: number) => {
    return 2 * Math.pow(2, level - 1);
  };

  const calculateMaxXp = (level: number) => { 
    return calculateXp(level + 1);
  };

  // State with Badge type
  const [badges, setBadges] = useState<Badge[]>([
    { name: 'Tier 1 Badge', image: require('@asset/images/badge1.png'), tier: 1, minted: false },
    { name: 'Tier 2 Badge', image: require('@asset/images/badge1.png'), tier: 2, minted: false },
    { name: 'Tier 3 Badge', image: require('@asset/images/badge1.png'), tier: 3, minted: false }
  ]);

  const [vouchers, setVouchers] = useState<Voucher[]>([
    { name: '20% off McDonalds', image: require('@asset/images/mcdonalds.png'), tokenId: 1, minted: false },
    { name: '20% off McDonalds', image: require('@asset/images/mcdonalds.png'),tokenId : 2, minted: false },
    { name: '20% off McDonalds', image: require('@asset/images/mcdonalds.png'), tokenId: 3, minted: false }
  ]);

  const profileData = {
    level: 2,
    get xp() { return calculateXp(this.level); },
    get maxXp() { return calculateMaxXp(this.level); },
  };

  const xpPercentage = (profileData.xp / profileData.maxXp) * 100;

  const wallets = [
    inAppWallet({
      auth: {
        options: [
          "google",
          "telegram",
          "email",
          "x",
          "passkey",
          "phone",
        ],
      },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("me.rainbow"),
    createWallet("io.rabby"),
    createWallet("io.zerion.wallet"),
  ];

  // Define mintBadge function with correct Badge type
  const mintBadge = async (badge: Badge, index: number) => {
    try {
      if (!address) {
        Alert.alert("Error", "Wallet not connected!");
        return;
      }

      const transaction = prepareContractCall({
        contract,
        method: "function mintBadge(address recipient, uint256 tier)",
        params: [address.address, BigInt(badge.tier)],  // Convert tier to BigInt
      });

      await sendTransaction(transaction);

      // Update badge minted status in state
      const updatedBadges = [...badges];
      updatedBadges[index].minted = true;
      setBadges(updatedBadges);

      Alert.alert("Success", "Mint Successful");
    } catch (error) {
      console.error("Transaction failed:", error);
      Alert.alert("Error", "Mint failed. Please try again.");
    }
  };

  // Define mintVoucher function with correct Voucher type
  const mintVoucher = async (voucher: Voucher, index: number) => {
    try {
      if (!address) {
        Alert.alert("Error", "Wallet not connected!");
        return;
      }

      const transaction = await prepareContractCall({
        contract: contract2,
        method: "function mintVoucher(address recipient) returns (uint256)",
        params: [address.address]
      });


      await sendTransaction(transaction);



      // Update voucher minted status in state
      const updatedVouchers = [...vouchers];
      updatedVouchers[index].minted = true;
      setVouchers(updatedVouchers);

      Alert.alert("Success", "Voucher Approved");
    } catch (error) {
      console.error("Transaction failed:", error);
      Alert.alert("Error", "Approval failed. Please try again.");
    }
  };

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
            wallets={wallets}
            theme={lightTheme({
              colors: { primaryButtonBg: "#3b82f6" },
            })}
            connectModal={{ size: "compact", showThirdwebBranding: false }}
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
      {badges.map((badge, index) => (
        <StyledView key={index} className="bg-white rounded-lg p-5 mx-5 mb-3 shadow-md flex-col items-center">
          <StyledImage 
            source={badge.image} 
            className="w-60 h-60 mr-3 mb-2"
          />
          <StyledText>{badge.name}</StyledText>
          <StyledTouchableOpacity
            className={`py-2 px-4 rounded mt-2 ${badge.minted ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={() => mintBadge(badge, index)}
            disabled={badge.minted}
          >
            <StyledText className="text-white text-center">{badge.minted ? 'Minted' : 'Mint'}</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      ))}

      <StyledText className="font-bold text-blue-500 m-5 mb-2">Vouchers:</StyledText>
      {vouchers.map((voucher, index) => (
        <StyledView key={index} className="bg-white rounded-lg p-5 mx-5 mb-3 shadow-md flex-col items-center">
          <StyledImage 
            source={voucher.image} 
            className="w-60 h-60 mr-3 mb-2"
          />
          <StyledText>{voucher.name}</StyledText>
          <StyledTouchableOpacity
            className={`py-2 px-4 rounded mt-2 ${voucher.minted ? 'bg-gray-400' : 'bg-blue-500'}`}
            onPress={() => mintVoucher(voucher, index)}
            disabled={voucher.minted}
          >
            <StyledText className="text-white text-center">{voucher.minted ? 'Minted' : 'Mint'}</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      ))}
    </StyledScrollView>
  );
};

export default Profile;