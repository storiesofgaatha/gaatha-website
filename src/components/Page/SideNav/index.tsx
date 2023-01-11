import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import Link from 'next/link';

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
            <Link
                href="/"
            >
                <Image
                    src="logo.jpg"
                    alt="Gaatha"
                    width={200}
                    height={150}
                />
            </Link>
            <div className={styles.routes}>
                <Link
                    href="/works"
                    passHref
                >
                    Works
                </Link>
                <Link
                    href="/studio"
                    passHref
                >
                    Studio
                </Link>
                <Link
                    href="/contact"
                    passHref
                >
                    Contact
                </Link>
                <Link
                    href="/search"
                    passHref
                >
                    Search
                </Link>
            </div>
        </nav>
    );
}
export default SideNavbar;
