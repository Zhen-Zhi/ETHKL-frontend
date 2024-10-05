import { StyleSheet, Text, View, Image, FlatList, Dimensions } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import AnimatedPressable from './AnimatedPressable';

type RestaurantFeedback = {
  id: string;
  star: number;
  restaurant: string;
  date: string;
  title: string;
  vote: number;
};

const PostComponent = ({
  id, star, restaurant, date, title, vote
}: RestaurantFeedback) => {
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

  const imageArray = [
    require('@asset/images/title.png'),
    require('@asset/images/title.png'),
    require('@asset/images/title.png'), // You can duplicate or use different paths here
    require('@asset/images/title.png'),
  ];

  const { width } = Dimensions.get('window');

  return (
    <View className='pb-6 bg-slate-100'>
      <View className='flex-row my-2.5'>
        <Image
          className='h-10 w-10 my-auto ml-3' 
          source={require('@asset/images/facebook.png')}
        />
        <View className='flex-col ml-3.5 justify-center'>
          <Text className='font-semibold text-lg'>{id}</Text>
          <Text className='my-auto leading-[14px] font-normal'>Lv 1</Text>
        </View>
      </View>

      {/* FlatList for swiping images */}
      <FlatList 
        data={imageArray} // Pass the array of images to FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            style={{ width: width }}
            className='h-64'
            source={item}
          />
        )}
      />

      {/* <Image 
        className='w-full h-64'
        source={require('@asset/images/title.png')} 
      /> */}

      <View className='mx-4 my-2'>
        <View className='flex-row justify-between mb-2'>
          <View className='flex-row'>
            {ratingStar}
            {blackStar}
          </View>
          <View className='flex-row'>
            <Entypo name="location-pin" size={24} color="black" />
            <Text className='font-normal text-base ml-0.5'>{restaurant}</Text>
          </View>
        </View>
        <Text className='font-medium text-[18px] mb-3'>{title}</Text>
        <View className='flex-row justify-between'>
          <Text className='my-auto'>{date}</Text>
          <View className='flex-row'>
            <AnimatedPressable
              className=''
              pressInValue={0.9}
              >
              <SimpleLineIcons name="like" size={24} color="black" />
            </AnimatedPressable>
            <Text className='my-auto mx-2 text-md'>{vote}</Text>
            <AnimatedPressable
              className=''
              pressInValue={0.9}
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