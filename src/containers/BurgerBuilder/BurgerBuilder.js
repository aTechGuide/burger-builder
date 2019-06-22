import React, {Component} from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

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
    totalPrice: 4,
    purchasable: false,
    purchasingFalse: false,
    loading: false
  }

  updatePurchaseState = (ingredients) => {

    const sum = Object.keys(ingredients)
    .map(igKey => {
      return ingredients[igKey]
    })
    .reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({purchasable: sum > 0});
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

    /** We might not Get updated ingredients when we call  updatePurchaseState*/
    this.updatePurchaseState(updatedIngredient);
  }

  removeIngredientHandler = (type) => {

    const {ingredients, totalPrice} = this.state;
    const oldCount = ingredients[type];

    if (oldCount <= 0) {
      return;
    }
    
    const updatedCount = oldCount - 1;
    const updatedIngredient = {
      ...ingredients
    };

    updatedIngredient[type] = updatedCount;

    const priceAdditon = INGREDIENT_PRICES[type];
    const newPrice = totalPrice - priceAdditon;

    this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
    this.updatePurchaseState(updatedIngredient);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    
    this.setState({loading: true});

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kamran Ali',
        email: 'test@test.com',
        address: {
          street: 'Sector 43',
          city: 'Gurugram',
          zipCode: '122002'
        },
        deliveryMethod: 'fastest'
      }
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({loading: false, purchasing: false});
    })
    .catch(error => {
      this.setState({loading: false, purchasing: false});
    });
  }

  render () {
    const {ingredients, totalPrice, purchasable, purchasing, loading} = this.state;

    const disabledInfo = {
      ...ingredients
    }

    let orderSummary = <OrderSummary 
      ingredients={ingredients} 
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler} 
      price={totalPrice}/>;

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={ingredients} />

        <BuildControls 
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice} 
          purchasable={purchasable} 
          order={this.purchaseHandler}/>
      </Aux>
      
    );
  }
}

export default BurgerBuilder;

