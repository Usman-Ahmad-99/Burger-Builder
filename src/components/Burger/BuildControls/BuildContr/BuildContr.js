import Classes from './BuildContr.module.css'

const buildContr = (props) =>(
    <div className={Classes.BuildContr}>
        <div className={Classes.Label}>{props.label}</div>
        <button className={Classes.Less} onClick={props.removed} disabled= {props.disabled}>Less</button>
        <button className={Classes.More} onClick={props.added}>More</button>
    </div>

)

export default buildContr