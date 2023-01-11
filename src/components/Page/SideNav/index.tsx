import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
}
function SideNavbar(props: Props) {
    const {
        className,
    } = props;
    return (
        <nav
            className={_cs(styles.sideNavbar, className)}
        >
            <h5>
                SideNavbar
            </h5>
        </nav>
    );
}
export default SideNavbar;
