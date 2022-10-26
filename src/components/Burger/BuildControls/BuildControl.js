import Classes from './buildControl.module.css'
import BuildContr from './BuildContr/BuildContr'

const controls= [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const buildControls = (props) => (
    <div className={Classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (<BuildContr key={ctrl.label} label={ctrl.label} added={() => props.ingredientAdded(ctrl.type)} removed={() => props.ingredientRemoved(ctrl.type)} disabled={props.disabled[ctrl.type]}/>))}
        <button className={Classes.OrderButton} disabled= {!props.purchasable} onClick= {props.ordered}>ORDER NOW</button>
    </div>
)

export default buildControls