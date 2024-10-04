import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, TouchableOpacity, Animated, Modal, Image, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AnimatedPressable from '@/src/components/AnimatedPressable';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system'

interface Post {
  id: number;
  restaurant: string;
  description: string;
}

interface Review {
  owner: string;
  text: string;
  date: string;
  rating: number; // Add rating to the Review interface
}

const PostScreen: React.FC = () => {
  const posts: Post[] = [
    { id: 1, restaurant: 'Restaurant 1', description: 'Delicious food with great ambiance.' },
    { id: 2, restaurant: 'Restaurant 2', description: 'Amazing sushi and friendly staff.' },
    { id: 3, restaurant: 'Restaurant 3', description: 'Best pizza in town!' },
    { id: 4, restaurant: 'Restaurant 4', description: 'Asam Pedas the best!' },
    { id: 5, restaurant: 'Restaurant 5', description: 'Best pizza in town!' },
    // { id: 6, restaurant: 'Restaurant 6', description: 'Asam Pedas the best!' },
  ];

  const [newReview, setNewReview] = useState({ text: '', imageUrl: '', rating: 0 });
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState<string[] | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 0.5,
      allowsMultipleSelection: true
    });
  
    if (!result.canceled) {
      // Store all selected images' URIs in an array
      setImage(result.assets.map((asset) => asset.uri));
    }
  };

  // const uploadImage = async () => {
  //   if (!image?.startsWith('file://')) {
  //     return;
  //   }
  
  //   const base64 = await FileSystem.readAsStringAsync(image, {
  //     encoding: 'base64',
  //   });
  //   const filePath = `${randomUUID()}.png`;
  //   const contentType = 'image/png';
  //   const { data, error } = await supabase.storage
  //     .from('avatars')
  //     .upload(filePath, decode(base64), { contentType });
  
  //   if (data) {
  //     return data.path;
  //   }
  // };

  // Function to handle star rating selection
  const handleRating = (value: number) => {
    setNewReview({ ...newReview, rating: value });
  };

  return (
    <View className='flex-1'>
    <ScrollView className='flex-1 p-4 bg-slate-100'>
      <Text className='font-extrabold text-2xl mx-1 mb-3'>Select a restaurant</Text>
      {posts.map(post => (
        <AnimatedPressable 
          className='flex-1 border mb-5 rounded-3xl' 
          pressInValue={0.98} 
          key={post.id}
          onPress={() => setModalVisible(true)}
        >
          <Image
            className='w-full h-48 rounded-t-3xl'
            source={require('@asset/images/title.png')}
          />
          <View className='mx-3 p-2'>
            <Text className='text-xl font-bold'>{post.restaurant}</Text>
            <Text className=''>{post.description}</Text>
          </View>
        </AnimatedPressable>
      ))}
    </ScrollView>

    {/* Modal section */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
        presentationStyle='overFullScreen'
      >
        <Pressable onPress={() => setModalVisible(false)} className='bg-black/30 flex-1 justify-end'>
          <View className='bg-white rounded-t-3xl p-4'>
            <Text className='' style={styles.sectionHeader}>Dummy Res</Text>

            {/* Star Rating Component */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(value => (
                <AnimatedPressable pressInValue={0.9} key={value} onPress={() => handleRating(value)}>
                  <MaterialIcons name="star" size={30} color={newReview.rating >= value ? '#FFD700' : '#ccc'} />
                </AnimatedPressable>
              ))}
            </View>

            { image ?
              // <Image
              //   className='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
              //   source={{ uri: image }}
              // />
              <FlatList
                data={image}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <Image
                    source={{ uri: item }}
                    style={{ width: 100, height: 100, margin: 5 }}  // Adjust size as needed
                  />
                )}
                numColumns={3}  // Display images in a grid of 3 columns
              />
              :
              <Image
              className='w-48 h-48 aspect-square rounded-xl mx-auto mt-6'
              source={require('@asset/images/title.png')}
              />
            }

            <AnimatedPressable pressInValue={0.98} onPress={pickImage} className='border mt-4' >
              <Text className='font-bold text-xl text-center mt-2.5'>Upload Image</Text>
            </AnimatedPressable>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Write your review..."
                multiline
                value={newReview.text}
                onChangeText={(text) => setNewReview({ ...newReview, text, rating: newReview.rating })}
              />
            </View>
            <View className='flex border'>
              <AnimatedPressable
                className='bg-blue-500 px-3 rounded-lg'
                pressInValue={0.9}
                // onPress={handleSubmitReview}
                >
                <Text className='font-semibold text-lg text-white'>Post Review</Text>
              </AnimatedPressable>
            </View>
            
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    color: '#555',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    height: '60%',
  },
  reviewContainer: {
    maxHeight: 300,
    marginBottom: 20,
  },
  review: {
    marginTop: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f0f8ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  reviewOwner: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewDate: {
    fontSize: 12,
    color: '#777',
  },
  reviewText: {
    fontSize: 14,
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#333',
  },
});

export default PostScreen;
