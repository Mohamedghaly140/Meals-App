import React, { useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Text, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeadeButton from '../components/HeadeButton';
import BodyText from '../components/BodyText';
import Colors from '../constants/Colors';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props => {
  return (
    <View style={styles.listItem}>
      <BodyText>{props.children}</BodyText>
    </View>
  );
};

const MealDetailScreen = props => {
  const mealId = props.navigation.getParam('mealId');
  const availabelMeals = useSelector(state => state.meals.meals);
  const currentMealsIsFavorite = useSelector(state =>
    state.meals.favoriteMeals.some(meal => meal.id === mealId)
  );

  const selectedMeal = availabelMeals.find(meal => meal.id === mealId);

  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(mealId));
  }, [mealId, dispatch]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: currentMealsIsFavorite });
  }, [currentMealsIsFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <BodyText>{selectedMeal.duration}m</BodyText>
        <BodyText>{selectedMeal.complexity.toUpperCase()}</BodyText>
        <BodyText>{selectedMeal.affordability.toUpperCase()}</BodyText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map(ing => (
        <ListItem key={ing}>{ing}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map(step => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

MealDetailScreen.navigationOptions = navigationData => {
  // const mealId = navigationData.navigation.getParam('mealId');
  // const selectedMeal = MEALS.find(meal => meal.id === mealId);
  const mealTitle = navigationData.navigation.getParam('mealTitle');
  const toggleFavorite = navigationData.navigation.getParam('toggleFav');
  const isFavorite = navigationData.navigation.getParam('isFav');
  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeadeButton}>
        <Item
          title='Favorite'
          iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
    textAlign: 'center',
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
