import {Image, View, StyleSheet} from 'react-native';
import React from 'react';

interface IProps {
  rating: string;
  starColor?: string;
  testId?: string;
}

const CustomStarRating: React.FC<IProps> = props => {
  const mainRating= props.rating ? props.rating :'0'
  const firstSliceRating = mainRating?.slice(0, 1);
  const secondSliceRating = parseInt(mainRating?.slice(2, 3));
  const num = parseInt(firstSliceRating);
  const ratingNumber = num ? num : 0;

  const unfilledRating =
    (secondSliceRating === 0 || Number.isNaN(secondSliceRating)) ? 5 - ratingNumber : 4 - ratingNumber;
 
  const filledImages = Array(ratingNumber).fill(
    require('../components/assets/nFilledStar.png'),
  );

  const unFilledImages = Array(unfilledRating < 0 ? 0 : unfilledRating).fill(
    require('../components/assets/nEmptyStar.png'),
  );
  const halfFilledStar = require('../components/assets/nHalfFilled.png');
  return (
    <View testID="filled-star-images" style={styles.starRatingMainContainer}>
      {filledImages.map((each, index) => (
        <Image
          tintColor={props.starColor}
          style={styles.starImageMainItem}
          key={index}
          source={each}
          testID="filled-star-image"
        />
      ))}
      {secondSliceRating > 0 && (
        <Image
          resizeMode="contain"
          style={styles.halfFilledStar}
          source={halfFilledStar}
          testID="half-filled-star-image"
        />
      )}

      {unFilledImages.map((each, index) => (
        <Image
          style={styles.emptyStarStyle}
          key={index}
          source={each}
          testID="unfilled-star-image"
        />
      ))}
    </View>
  );
};
export default CustomStarRating;


const styles = StyleSheet.create({
    starRatingMainContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    starImageMainItem: {
      marginRight: 1,
      marginTop: 1,
      marginBottom: 1,
      width:15,
      height:15
    },
    halfFilledStar: {
      marginRight: 1,
      marginTop: 1,
      marginBottom:1,
      width:15,
      height:15
    },
    emptyStarStyle:{
      tintColor:"#b6e0e3",
      marginRight: 1,
      marginTop: 1,
      marginBottom: 1,
      width:15,
      height:15
    }
  });