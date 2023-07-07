import { _cs, isDefined } from '@togglecorp/fujs';
import Link from 'next/link';
import { useRouter } from 'next/router';

import GaathaLogo from 'components/GaathaLogo';
import { primaryRoutes } from 'components/WorkNavbar';
import styles from './styles.module.css';

interface Props {
    className?: string;
    hideGaathaLogo?: boolean;
    lightMode?: boolean;
    transparentMode?: boolean;
}

function SideNavbar(props: Props) {
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
            <div className={styles.routes}>
                {primaryRoutes.map((item) => (
                    <Link
                        href={isDefined(item.url) ? item.url : {}}
                        className={_cs(
                            isDefined(item.url)
                                ? currentRoute.startsWith(item.url) && styles.active
                                : styles.disabled,
                            styles.link,
                        )}
                    >
                        {item.displayName}
                    </Link>
                ))}
            </div>
        </nav>
    );
}
export default SideNavbar;
