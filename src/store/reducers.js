import * as actionType from "./actions";

const initialState = {
  ingredients: {
    meat: 0,
    cheese: 0,
    salad: 0,
    bacon: 0
  },
  totalPrice: 4
};

const INGREDIENTS_PRICE = {
  meat: 1,
  cheese: 0.3,
  salad: 0.4,
  bacon: 1.9
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
      };
    default:
      return state;
  }
};

export default reducers;
