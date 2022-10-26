import Auxillary from "../../../hoc/Auxillary/auxillary"
import Button from "../../UI/Button/Button"

const orderSummary= (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        return <li key={igKey}><span>{igKey}</span>: {props.ingredients[igKey]}</li>
    })
    return(
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients.</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout</p>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <Button btnType="Danger" clicked= {props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked= {props.purchaseContinued}>CONTIUE</Button>
        </Auxillary>
    )

}

export default orderSummary