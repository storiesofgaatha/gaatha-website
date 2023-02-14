import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './styles.module.css';

interface Props {
    className?: string;
    lightMode: boolean;
    hideGaathaLogo?: boolean;
}

function SideNavbar(props: Props) {
    const {
        className,
        lightMode,
        hideGaathaLogo = false,
    } = props;

    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <nav
            className={_cs(
                styles.sideNavbar,
                className,
                lightMode && styles.light,
                hideGaathaLogo && styles.noLogo,
            )}
        >
            {!hideGaathaLogo && (
                <Link
                    href="/"
                >
                    <div>
                        {lightMode
                            ? (
                                <Image
                                    src="/logo-dark.png"
                                    alt="Gaatha"
                                    width={150}
                                    height={110}
                                />
                            ) : (
                                <Image
                                    src="/logo-light.png"
                                    alt="Gaatha"
                                    width={150}
                                    height={110}
                                />
                            )}
                    </div>
                </Link>
            )}
            <div className={styles.routes}>
                <Link
                    href="/works"
                    className={_cs(currentRoute === '/works' && styles.active)}
                >
                    Works
                </Link>
                <Link
                    href="/studio"
                    className={_cs(currentRoute === '/studio' && styles.active)}
                >
                    Studio
                </Link>
                {
                    // TODO: Remove this after studio page is created
                }
                <Link
                    href="/people"
                    className={_cs(currentRoute === '/people' && styles.active)}
                >
                    People
                </Link>
                <Link
                    href="/contact"
                    className={_cs(currentRoute === '/contact' && styles.active)}
                >
                    Contact
                </Link>
                <Link
                    href="/search"
                    className={_cs(currentRoute === '/search' && styles.active)}
                >
                    Search
                </Link>
            </div>
        </nav>
    );
}
export default SideNavbar;
