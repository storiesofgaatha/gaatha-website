import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

interface Props {
    className?: string;
}

function SideNavbar(props: Props) {
    const {
        className,
    } = props;

    const router = useRouter();
    const currentRoute = router.pathname;

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
                    className={currentRoute === '/works'
                        ? styles.active
                        : styles.nonActive}
                >
                    Works
                </Link>
                <Link
                    href="/studio"
                    className={currentRoute === '/studio'
                        ? styles.active
                        : styles.nonActive}
                >
                    Studio
                </Link>
                <Link
                    href="/contact"
                    className={currentRoute === '/contact'
                        ? styles.active
                        : styles.nonActive}
                >
                    Contact
                </Link>
                <Link
                    href="/search"
                    className={currentRoute === '/search'
                        ? styles.active
                        : styles.nonActive}
                >
                    Search
                </Link>
            </div>
        </nav>
    );
}
export default SideNavbar;
