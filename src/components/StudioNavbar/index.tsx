import { useMemo } from 'react';
import { _cs } from '@togglecorp/fujs';
import {
    IoChevronDown,
    IoChevronUp,
} from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from 'components/Button';
import { primaryRoutes } from 'components/WorkNavbar';
import useBooleanState from 'hooks/useBooleanState';
import styles from './styles.module.css';

const secondaryRoutes = [
    {
        key: 'about',
        url: '/studio',
        displayName: 'About',
    },
    {
        key: 'people',
        url: '/studio/people',
        displayName: 'People',
    },
];

interface Props {
    className?: string;
    hideGaathaLogo?: boolean;
    lightMode?: boolean;
    transparentMode?: boolean;
}

function StudioNavbar(props: Props) {
    const {
        className,
        lightMode,
        hideGaathaLogo = false,
        transparentMode = false,
    } = props;

    const router = useRouter();
    const currentRoute = router.pathname;

    const activeLink = useMemo(() => {
        if (currentRoute === '/studio') {
            return 'About';
        }
        return 'People';
    }, [
        currentRoute,
    ]);

    const [
        additionalNavShown,
        , , ,
        toggleShowAdditionalNav,
    ] = useBooleanState(false);

    return (
        <nav
            className={_cs(
                styles.sideNavbar,
                className,
                lightMode && styles.light,
                hideGaathaLogo && styles.noLogo,
                transparentMode && styles.transparentMode,
            )}
        >
            {!hideGaathaLogo && (
                <Link
                    className={styles.logo}
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

            <div className={styles.linkContainer}>
                <div className={styles.subRoutes}>
                    {secondaryRoutes.map((route) => (
                        <Link
                            href={route.url}
                            className={_cs(currentRoute === route.url && styles.active)}
                        >
                            {route.displayName}
                        </Link>
                    ))}
                </div>
                <div className={styles.routes}>
                    {primaryRoutes.map((route) => (
                        <Link
                            href={route.url}
                            className={_cs(currentRoute.startsWith(route.url) && styles.active)}
                        >
                            {route.displayName}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.responsiveMenu}>
                <div
                    className={_cs(
                        styles.subNavbarContainer,
                        additionalNavShown && styles.unhide,
                    )}
                >
                    <Button
                        className={styles.arrow}
                        name={undefined}
                        onClick={toggleShowAdditionalNav}
                        actions={additionalNavShown ? <IoChevronDown /> : <IoChevronUp />}
                    >
                        {activeLink}
                    </Button>
                    <div className={styles.otherRoutes}>
                        {secondaryRoutes.map((route) => (
                            <Link
                                href={route.url}
                                className={_cs(
                                    currentRoute.startsWith(route.url) && styles.active,
                                    styles.link,
                                )}
                            >
                                {route.displayName}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.routes}>
                    {primaryRoutes.map((route) => (
                        <Link
                            href={route.url}
                            className={_cs(
                                currentRoute.startsWith(route.url) && styles.active,
                                styles.link,
                            )}
                        >
                            {route.displayName}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}
export default StudioNavbar;
