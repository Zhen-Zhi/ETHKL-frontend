// components/StarRating.tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface StarRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)}>
          <Text style={{ fontSize: 24, color: star <= rating ? '#FFD700' : '#ddd' }}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default StarRating;
