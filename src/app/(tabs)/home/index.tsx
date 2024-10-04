import { StyleSheet, Text, View, StatusBar, FlatList, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import AnimatedPressable from '@/src/components/AnimatedPressable';
import PostComponent from '@/src/components/PostComponent';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    star: 4,
    restaurant: "The Village",
    date: "10 days ago",
    title: 'First Item feedback caption, what if this feedback is so long that might need another',
    vote: 188
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    star: 5,
    restaurant: "Pasta Palace",
    date: "2 days ago",
    title: 'Amazing experience! Loved the pasta and ambiance, would recommend to anyone visiting the city.',
    vote: 254
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    star: 3,
    restaurant: "Burger Haven",
    date: "7 days ago",
    title: 'Good burgers but the service was slow. Waited almost 30 minutes to get my food.',
    vote: 98
  },
  {
    id: '7d9fbb1a-dba4-4a62-987f-1b453d91abcf',
    star: 2,
    restaurant: "Sushi Station",
    date: "5 days ago",
    title: 'Not impressed with the sushi quality, it felt stale. Not planning to visit again.',
    vote: 47
  },
  {
    id: 'd3e290a3-e5b4-42ba-a937-b5455b087e87',
    star: 4,
    restaurant: "Steakhouse 55",
    date: "12 days ago",
    title: 'Great steak, perfectly cooked. The dessert options were amazing too!',
    vote: 320
  },
  {
    id: '8a9dbf24-334b-43fc-b9fa-5b9e2f1c540d',
    star: 1,
    restaurant: "Pizza Paradise",
    date: "15 days ago",
    title: 'Horrible experience, pizza was cold, and the toppings were barely there. Do not recommend.',
    vote: 22
  },
  {
    id: 'b7b0ef31-dc4d-4d2e-a7f4-19d79c9466a8',
    star: 5,
    restaurant: "Taco Town",
    date: "1 day ago",
    title: 'Best tacos in town! Fresh ingredients and great flavors, definitely coming back.',
    vote: 413
  },
  {
    id: 'c0efcdd1-7d4f-478f-b301-6e4cb9e882f4',
    star: 3,
    restaurant: "Cafe Delight",
    date: "3 days ago",
    title: 'The coffee was decent, but the pastries were dry. Could be better.',
    vote: 120
  }
];

type RestaurantFeedback = {
  id: string;
  star: number;
  restaurant: string;
  date: string;
  title: string;
  vote: number;
};
//   <View className='pb-6 bg-slate-100'>
//     <View className='flex-row my-2.5'>
//       <Image
//         className='h-10 w-10 my-auto ml-3' 
//         source={require('@asset/images/facebook.png')}
//       />
//       <View className='flex-col ml-3.5 justify-center'>
//         <Text className='font-semibold text-lg'>User 1</Text>
//         <Text className='my-auto leading-[14px] font-normal'>Lv 1</Text>
//       </View>
//     </View>
//     <Image 
//       className='w-full h-64'
//       source={require('@asset/images/title.png')} 
//     />
//     <View className='mx-4 my-2'>
//       <View className='flex-row justify-between mb-2'>
//         <View className='flex-row'>
//           <FontAwesome name="star" size={24} color="#ff4000" />
//           <FontAwesome name="star" size={24} color="black" />
//           <FontAwesome name="star" size={24} color="black" />
//           <FontAwesome name="star" size={24} color="black" />
//           <FontAwesome name="star" size={24} color="black" />
//         </View>
//         <View className='flex-row'>
//           <Entypo name="location-pin" size={24} color="black" />
//           <Text className='font-normal text-base ml-0.5'>The Village</Text>
//         </View>
//       </View>
//       <Text className='font-medium text-[18px] mb-3'>{title}</Text>
//       <View className='flex-row justify-between'>
//         <Text className='my-auto'>10 days ago</Text>
//         <View className='flex-row'>
//           <AnimatedPressable
//             className=''
//             pressInValue={0.9}
//             >
//             <SimpleLineIcons name="like" size={24} color="black" />
//           </AnimatedPressable>
//           <Text className='my-auto mx-2 text-md'>1234</Text>
//           <AnimatedPressable
//             className=''
//             pressInValue={0.9}
//             >
//             <SimpleLineIcons name="dislike" size={24} color="black" />
//           </AnimatedPressable>
//         </View>
//       </View>
      
//     </View>
//   </View>
// );

const HomeScreen = () => {
  return (
    <View className='bg-white'>
      <FlatList
        data={DATA}
        renderItem={
          ({ item }) => 
            <PostComponent
              id={item.id}
              title={item.title} 
              star={item.star}
              restaurant={item.restaurant}
              date={item.date}
              vote={item.vote}
            />
        }
        keyExtractor={item => item.id}
        initialNumToRender={3}
        windowSize={4}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({});