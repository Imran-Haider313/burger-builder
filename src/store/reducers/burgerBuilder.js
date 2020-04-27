import * as actionType from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENTS_PRICE = {
  meat: 1,
  cheese: 0.3,
  salad: 0.4,
  bacon: 1.9
};

const addIngredientFunc = (state, action) => {
  const updatedProperties = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] + 1
    },
    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName],
    building: true,
  };

  return updatedObject(state, updatedProperties);
};

const removeIngredientFunc = (state, action) => {
  const removedIngredient = {
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: state.ingredients[action.ingredientName] - 1
    },
    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName],
    building: true,
  };

  return updatedObject(state, removedIngredient);
};

const setIngredientFunc = (state, action) => {
  const newIngredient = {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4,
    building: false,
  };

  return updatedObject(state, newIngredient);
};

const fetchIngredientFunc = (state, action) => {
  const failFetched = {
    error: true
  };

  return updatedObject(state, failFetched);
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return addIngredientFunc(state, action);

    case actionType.REMOVE_INGREDIENT:
      return removeIngredientFunc(state, action);

    case actionType.SET_INGREDIENT:
      return setIngredientFunc(state, action);

    case actionType.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientFunc(state, action);

    default:
      return state;
  }
};

export default reducers;
