import { _cs, isDefined } from '@togglecorp/fujs';

import Link from 'next/link';
import { useRouter } from 'next/router';

import GaathaLogo from 'components/GaathaLogo';
import { primaryRoutes } from 'components/WorkNavbar';

import styles from './styles.module.css';

const secondaryRoutes = [
    {
        key: 'studio',
        url: '/about',
        displayName: 'Studio',
    },
    {
        key: 'people',
        url: '/about/people',
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
                <GaathaLogo
                    className={styles.logo}
                    variant="small"
                    lightMode={lightMode}
                />
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
                            href={isDefined(route.url) ? route.url : {}}
                            className={_cs(
                                isDefined(route.url)
                                    ? currentRoute.startsWith(route.url) && styles.active
                                    : styles.disabled,
                                styles.link,
                            )}
                        >
                            {route.displayName}
                        </Link>
                    ))}
                </div>
            </div>
            <div className={styles.responsiveMenu}>
                <div
                    className={styles.subNavbarContainer}
                >
                    {secondaryRoutes.map((route) => (
                        <Link
                            href={route.url}
                            className={_cs(
                                currentRoute === route.url && styles.active,
                                styles.link,
                            )}
                        >
                            {route.displayName}
                        </Link>
                    ))}
                </div>
                <div className={styles.routes}>
                    {primaryRoutes.map((route) => (
                        <Link
                            href={isDefined(route.url) ? route.url : {}}
                            className={_cs(
                                isDefined(route.url)
                                    ? currentRoute.startsWith(route.url) && styles.active
                                    : styles.disabled,
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
