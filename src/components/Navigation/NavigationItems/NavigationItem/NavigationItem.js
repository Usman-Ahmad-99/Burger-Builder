import Classes from './NavigationItem.module.css'


const navigationItem = (props) => (
    <li className={Classes.NavigationItem}><a className={props.active ? Classes.active : null} href={props.link}>{props.children}</a></li>

)

export default navigationItem