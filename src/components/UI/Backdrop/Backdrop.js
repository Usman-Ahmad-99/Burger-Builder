import Classes from './Backdrop.module.css'

const backDrop = (props) => (
    props.show ? <div className={Classes.Backdrop} onClick= {props.clicked}></div> : null
)

export default backDrop