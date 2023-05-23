import { useMemo, useCallback } from 'react';
import { _cs, isDefined } from '@togglecorp/fujs';
import {
    AiFillCaretUp,
    AiFillCaretDown,
} from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

import GaathaLogo from 'components/GaathaLogo';
import Button from 'components/Button';
import useBooleanState from 'hooks/useBooleanState';

import styles from './styles.module.css';

export const primaryRoutes = [
    {
        key: 'works',
        url: '/works',
        displayName: 'Works',
    },
    {
        key: 'studio',
        url: '/studio',
        displayName: 'Studio',
    },
    {
        key: 'contact',
        url: '/contact',
        displayName: 'Contact',
    },
    {
        key: 'search',
        url: undefined,
        displayName: 'Search',
    },
];

interface Category {
    id: string;
    name: string;
}

interface Props {
    className?: string;
    hideGaathaLogo?: boolean;
    lightMode?: boolean;
    activeCategory?: string;
    categories: (Category | undefined)[];
}

function WorkNavbar(props: Props) {
    const {
        className,
        lightMode,
        hideGaathaLogo = false,
        activeCategory,
        categories,
    } = props;

    const router = useRouter();
    const currentRoute = router.pathname;

    const [
        additionalNavShown,
        , , ,
        toggleShowAdditionalNav,
    ] = useBooleanState(false);

    const getCategoryName = useCallback((id: string) => (
        categories?.find((cat) => cat?.id === id)?.name ?? ''
    ), [categories]);

    const activeLink: string = useMemo(() => {
        if (isDefined(activeCategory)) {
            return getCategoryName(activeCategory);
        }
        if (currentRoute.startsWith('/works/visualizations')) {
            return 'Graphics + Visualizations';
        }
        return 'Architecture';
    }, [
        activeCategory,
        getCategoryName,
        currentRoute,
    ]);

    const subRoutes = categories.map((cat: Category | undefined) => ({
        key: cat?.id,
        url: `/works/categories/${cat?.id}`,
        displayName: cat?.name,
    }));

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
                <GaathaLogo
                    variant="small"
                    lightMode={lightMode}
                />
            )}
            <div className={styles.linkContainer}>
                <div className={styles.subRoutes}>
                    <Link
                        href="/works/"
                        className={_cs(
                            currentRoute === '/works' && styles.active,
                            styles.link,
                        )}
                    >
                        Architecture
                    </Link>
                    {subRoutes.map((route) => (
                        <Link
                            href={route.url}
                            className={_cs(
                                (activeCategory === route.key) && styles.active,
                                styles.link,
                            )}
                        >
                            {route.displayName}
                        </Link>
                    ))}
                </div>
                <div className={styles.additionalRoutes}>
                    <Link
                        href="/works/visualizations"
                        className={_cs(
                            currentRoute === '/works/visualizations'
                            && styles.active,
                            styles.link,
                        )}
                    >
                        Graphics + Visualizations
                    </Link>
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
                    className={_cs(
                        styles.subNavbarContainer,
                        additionalNavShown && styles.unhide,
                    )}
                >
                    <Button
                        className={styles.arrow}
                        name={undefined}
                        onClick={toggleShowAdditionalNav}
                        actions={additionalNavShown ? <AiFillCaretDown /> : <AiFillCaretUp />}
                    >
                        {activeLink}
                    </Button>
                    <div className={styles.otherRoutes}>
                        <Link
                            href="/works/"
                            className={_cs(
                                currentRoute === '/works' && styles.active,
                                styles.link,
                            )}
                        >
                            Architecture
                        </Link>
                        {subRoutes.map((route) => (
                            <Link
                                href={route.url}
                                className={_cs(
                                    (activeCategory === route.key) && styles.active,
                                    styles.link,
                                )}
                            >
                                {route.displayName}
                            </Link>
                        ))}
                        <Link
                            href="/works/visualizations"
                            className={_cs(
                                currentRoute.startsWith('/works/visualizations')
                                && styles.active,
                                styles.link,
                            )}
                        >
                            Graphics + Visualizations
                        </Link>
                    </div>
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

export default WorkNavbar;
