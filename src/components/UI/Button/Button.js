import Classes from './button.module.css'

const button = (props) => (
    <button className={[Classes.Button, Classes[props.btnType]].join(' ')} onClick={props.clicked}>
        {props.children}
    </button>
)

export default button