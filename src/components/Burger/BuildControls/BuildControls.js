import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const CONTROLS = [
  {label: 'Salad', type: 'salad'},
  {label: 'Meat', type: 'meat'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'}
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
  <p> Total Price: <strong>{props.price.toFixed(2)} </strong></p>
  {
    CONTROLS.map(ctrl =>
      <BuildControl
        key={ctrl.type}
        label={ctrl.label}
        add={() => props.onIngredientAddition(ctrl.type)}
        remove={() => props.onIngredientRemoval(ctrl.type)}
        disabled={props.disabledInfo[ctrl.type]}
      />
    )
  }
  <button
    className={classes.OrderButton}
    disabled={!props.isPurchasable}
    onClick={props.ordered}>{props.isAuthenticated ? 'Order Now' : 'Signup to order '}</button>
  </div>
)

export default BuildControls;
