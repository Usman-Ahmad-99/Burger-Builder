import {Component} from 'react';

import Auxillary from '../../hoc/Auxillary/auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControl';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import instance from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import axios from 'axios';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3, 
    bacon: 0.7
}

class BurgerBuilder extends Component {

    // constructor(){
    //     super()
    //     this.state= {
    //         ingredients: {
    //             salad: 0,
    //             bacon: 0,
    //             cheese: 0,
    //             meat: 0
    //         },
    //         totalPrice: 4
    //     }
    // }
    
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        instance.get('/ingredients.json').then(response => {
            this.setState({ingredients: response.data})
        }).catch(error => {this.setState({error: true})})
    }

    purchaseHandler= ()=> {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler= () => {
        this.setState({purchasing: false})

    }

    purchaseContinueHandler= () => {
        // alert('You continued!')
        this.setState({loading: true})
        const order= {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Usman Ahmad',
                address: {
                    street: 'Transylvania',
                    country: 'Romania'
                }
            }
        }
        instance.post('/orders.json', order).then(response => {
            this.setState({loading: false, purchasing: false})
            console.log(response)
        })
        .catch(error => this.setState({loading: false, purchasing: false}))

    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]
        }).reduce((sum, el) => {
            return sum + el
        }, 0)
        this.setState({purchasable: sum> 0})
    }

    addIngredientHandler= (type) =>{
        const oldCount = this.state.ingredients[type]
        console.log(oldCount)
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]= updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)

    }

    removeIngredientHandler= (type) =>{
        const oldCount = this.state.ingredients[type]
        console.log(oldCount)
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type]= updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    render(){
        const disabledInfo= {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
            
            let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
                if(this.state.ingredients) {
                    burger = (
                        <Auxillary>
                        <Burger ingredients={this.state.ingredients}/>
                        <BuildControls ingredientAdded= {this.addIngredientHandler} ingredientRemoved= {this.removeIngredientHandler} purchasable= {this.state.purchasable} disabled= {disabledInfo} ordered= {this.purchaseHandler} price={this.state.totalPrice}/>
                        </Auxillary>
                    );
                    orderSummary = <OrderSummary
                    ingredients = {this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    />;
                }


        
        if(this.state.loading){
            orderSummary= <Spinner/>
        }
        return(
            <Auxillary>
                <Modal show={this.state.purchasing} modalClosed= {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, instance)