import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import BodyText from './BodyText';

const MealItem = props => {
  return (
    <View style={{ padding: 15 }}>
      <View style={styles.mealItem}>
        <TouchableOpacity activeOpacity={0.7} onPress={props.onSelectMeal}>
          <View>
            <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
              <ImageBackground
                source={{ uri: props.image }}
                style={styles.bgImage}
                fadeDuration={250}
              >
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={1}>
                    {props.title}
                  </Text>
                </View>
              </ImageBackground>
            </View>
            <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
              <BodyText>{props.duration}m</BodyText>
              <BodyText>{props.complexity.toUpperCase()}</BodyText>
              <BodyText>{props.affordability.toUpperCase()}</BodyText>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#DCDCDC',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  mealRow: {
    flexDirection: 'row',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetail: {
    height: '15%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default MealItem;
