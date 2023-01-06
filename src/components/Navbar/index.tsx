import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
}

function Navbar(props: Props) {
    const {
        className,
    } = props;

    return (
        <nav
            className={_cs(styles.navbar, className)}
        >
            <h2>
                Flowers
            </h2>
        </nav>
    );
}

export default Navbar;
