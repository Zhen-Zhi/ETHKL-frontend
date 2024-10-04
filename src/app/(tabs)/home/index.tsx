import { StyleSheet, Text, View, StatusBar, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item feedback caption, what if this feedback is so long that might need another',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View className='pb-6 bg-slate-100'>
    <View className='flex-row my-2.5'>
      <Image
        className='h-10 w-10 my-auto ml-3' 
        source={require('@asset/images/facebook.png')}
      />
      <View className='flex-col ml-3 border-0 justify-center'>
        <Text className='font-semibold text-lg'>User 1</Text>
      </View>
    </View>
    <Image 
      className='w-full h-64'
      source={require('@asset/images/title.png')} 
    />
    <View className='mx-4 my-2'>
      <View className='flex-row justify-between mb-2'>
        <View className='flex-row'>
          <FontAwesome name="star" size={24} color="#ff4000" />
          <FontAwesome name="star" size={24} color="black" />
          <FontAwesome name="star" size={24} color="black" />
          <FontAwesome name="star" size={24} color="black" />
          <FontAwesome name="star" size={24} color="black" />
        </View>
        <View className='flex-row'>
          <Entypo name="location-pin" size={24} color="black" />
          <Text className='font-normal text-base ml-0.5'>The Village</Text>
        </View>
      </View>
      <Text className='font-medium text-[18px] mb-3'>{title}</Text>
      <View className='flex-row justify-between'>
        <Text className='my-auto'>10 days ago</Text>
        <View className='flex-row'>
          <AnimatedPressable
            className=''
            pressInValue={0.9}
            >
            <SimpleLineIcons name="like" size={24} color="black" />
          </AnimatedPressable>
          <Text className='my-auto mx-2 text-md'>1234</Text>
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
);

const HomeScreen = () => {
  return (
    <View className='bg-white'>
      {/* <View className='border border-slate-300 m-1'>
        <Text>HomeScreen</Text>
      </View> */}

      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});