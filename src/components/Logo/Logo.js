import Classes from './Logo.module.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = (props) => (
    <div className={Classes.Logo}>
        <img src={burgerLogo} alt='Burger Logo'/>
    </div>
)

export default logo