import { StyleSheet, Text, View, StatusBar, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import PostComponent from '@/src/components/PostComponent';
import { useStateContext } from '../../context/StateContext';

type RestaurantFeedback = {
  id: number;
  reviewer: string;
  reviewText: string;
  timestamp: number;
  voteCount: number;
  imageLink: string;
  restaurantId: number;
};

const HomeScreen = () => {
  const { reviews, isReviewsLoading } = useStateContext();

  return (
    <View className='bg-white'>
      <FlatList
        data={reviews}
        inverted
        renderItem={
          ({ item, index }) => 
            <PostComponent
              id={index}
              imageLink={item.imageLink}
              reviewer={item.reviewer}
              reviewText={item.reviewText} 
              timestamp={item.timestamp}
              voteCount={item.voteCount}
              restaurantId={0n}
            />
        }
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={3}
        windowSize={4}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({});