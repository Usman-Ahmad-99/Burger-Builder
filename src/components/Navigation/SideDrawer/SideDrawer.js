import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import Classes from './SideDrawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxillary from '../../../hoc/Auxillary/auxillary';

const sideDrawer = (props) => {
    let attachedClasses = [Classes.SideDrawer, Classes.Close]
    if(props.open) {
        attachedClasses= [Classes.SideDrawer, Classes.Open]
    }
    return (
        <Auxillary>
            <Backdrop show= {props.open} clicked= {props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className= {Classes.Logo}><Logo/></div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxillary>
    )
}

export default sideDrawer