import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese:0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  }

  addIngredientHandler = (type) => {

    const {ingredients, totalPrice} = this.state;
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;

    const updatedIngredient = {
      ...ingredients
    };

    updatedIngredient[type] = updatedCount;

    const priceAdditon = INGREDIENT_PRICES[type];
    const newPrice = totalPrice + priceAdditon;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
  }

  render () {
    const {ingredients} = this.state;
    return (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls 
          ingredientAdded={this.addIngredientHandler}/>
      </Aux>
      
    );
  }
}

export default BurgerBuilder;

