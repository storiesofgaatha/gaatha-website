import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
            <div className={styles.routes}>
                {primaryRoutes.map((item) => (
                    <Link
                        href={item.url}
                        className={_cs(
                            currentRoute.startsWith(item.url) && styles.active,
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
