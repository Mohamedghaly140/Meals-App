import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealList';
import BodyText from '../components/BodyText';

const CategoryMealsScreen = props => {
  const cadId = props.navigation.getParam('categoryId');

  const availabelMeals = useSelector(state => state.meals.filteredMeals);

  const dsiplayedMeals = availabelMeals.filter(
    meal => meal.categoryIds.indexOf(cadId) >= 0
  );

  if (dsiplayedMeals.length === 0) {
    return (
      <View style={styles.fallBack}>
        <BodyText>No meals Found, maybe check your filters?</BodyText>
      </View>
    );
  }

  return <MealList listData={dsiplayedMeals} navigation={props.navigation} />;
};

CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);
  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  fallBack: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CategoryMealsScreen;
