import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
}

function Footer(props: Props) {
    const {
        className,
    } = props;

    return (
        <footer className={_cs(styles.footer, className)}>
            Made with 💜 and ☕
        </footer>
    );
}

export default Footer;
