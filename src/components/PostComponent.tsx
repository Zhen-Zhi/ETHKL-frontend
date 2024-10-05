import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AnimatedPressable from './AnimatedPressable';
import { formatDistanceToNow } from 'date-fns';
import { shortenAddress } from "thirdweb/utils";
import { createThirdwebClient, defineChain, getContract, prepareContractCall } from "thirdweb"
import { useReadContract, useSendTransaction } from "thirdweb/react";

type RestaurantFeedback = {
  id: number;
  reviewer: string;
  reviewText: string;
  timestamp: number;
  voteCount: number;
  imageLink?: string;
  restaurantId: bigint;
};

const getRandomInt = (min = 1, max = 5) => {
  return Math.floor(Math.random() * (max - min + 1)) + min; // Generates a number between min and max (inclusive)
};

const formatTimestamp = (timestamp: number) => {
  // Convert the timestamp (in seconds) to milliseconds
  const date = new Date(timestamp * 1000); // Convert to milliseconds
  return formatDistanceToNow(date, { addSuffix: true });
};

const PostComponent = ({
  id, reviewer, reviewText, imageLink, voteCount, timestamp, restaurantId
  }: RestaurantFeedback) => 
{
  const { mutate: sendTransaction } = useSendTransaction();
  const client = createThirdwebClient({
    clientId: "ea6848c5d936b0dc84de9a3a9bdf4209"
  });
  
  const contract = getContract({
    client,
    chain: defineChain(534351),
    address: "0xE68501AA2ffeC1a3542686AAD5F850176166c204",
  });

  const { data: restaurant, isPending } = useReadContract({
    contract,
    method: "function restaurants(uint256) view returns (uint256 id, string name)",
    params: [restaurantId]
  });

  const star = getRandomInt()
  const ratingStar = [];
  for (let i = 0; i < star; i++) {
    ratingStar.push(
      <View key={i} className='mx-0.5'>
        <FontAwesome name="star" size={24} color="#ff4000" />
      </View>
    );
  }

  const blackStar = [];
  for (let i = 0; i < 5 - star; i++) {
    blackStar.push(
      <View key={i} className='mx-0.5'>
        <FontAwesome name="star" size={24} color="#000000" />
      </View>
    );
  }

  const { width } = Dimensions.get('window');

  return (
    <View className='pb-6 bg-slate-100'>
      <View className='flex-row my-2.5'>
        <Image
          className='h-10 w-10 my-auto ml-3' 
          source={require('@asset/images/facebook.png')}
        />
        <View className='flex-col ml-3.5 justify-center'>
          <Text className='font-semibold text-lg'>{shortenAddress(reviewer)}</Text>
          <Text className='my-auto leading-[14px] font-normal'>Lv 1</Text>
        </View>
      </View>

      {/* FlatList for swiping images */}
      {/* <FlatList 
        data={imageArray} // Pass the array of images to FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            style={{ width: width }}
            className='h-64'
            source={{ uri: imageLink }}
          />
        )}
      /> */}

      <Image
        style={{ width: width }}
        resizeMode='cover'
        className='h-64 bg-slate-400/40'
        source={{ uri: imageLink }}
      />

      <View className='mx-4 my-2'>
        <View className='flex-row justify-between mb-2'>
          <View className='flex-row'>
            {ratingStar}
            {blackStar}
          </View>
          <View className='flex-row'>
            <Entypo name="location-pin" size={24} color="black" />
            <Text className='font-normal text-base ml-0.5'>{restaurant?.[1] ?? "Family mart"}</Text>
          </View>
        </View>
        <Text className='font-medium text-[18px] mb-3'>{reviewText}</Text>
        <View className='flex-row justify-between'>
          <Text className='my-auto'>{formatTimestamp(Number(timestamp))}</Text>
          <View className='flex-row'>
            <AnimatedPressable
              className=''
              pressInValue={0.9}
              onPress={() => {
                console.log("pressed")
                const transaction = prepareContractCall({
                  contract,
                  method: "function voteReview(uint256 _restaurantId, uint256 _reviewIndex, bool _isUpvote)",
                  params: [BigInt(0), BigInt(id), true]
                });
                sendTransaction(transaction);
              }}
              >
              <SimpleLineIcons name="like" size={24} color="black" />
            </AnimatedPressable>
            <Text className='my-auto mx-2 text-md'>{voteCount == 0 ? 0 : Number(voteCount)}</Text>
            <AnimatedPressable
              className=''
              pressInValue={0.9}
              onPress={() => {
                console.log("pressed")
                const transaction = prepareContractCall({
                  contract,
                  method: "function voteReview(uint256 _restaurantId, uint256 _reviewIndex, bool _isUpvote)",
                  params: [BigInt(0), BigInt(id), false]
                });
                sendTransaction(transaction);
              }}
              >
              <SimpleLineIcons name="dislike" size={24} color="black" />
            </AnimatedPressable>
          </View>
        </View>
        
      </View>
    </View>
  )
}

export default PostComponent

const styles = StyleSheet.create({})