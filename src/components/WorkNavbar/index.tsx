import { useMemo, useCallback } from 'react';
import { _cs, isDefined, isNotDefined } from '@togglecorp/fujs';
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
        key: 'about',
        url: '/about',
        displayName: 'About',
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

    const activeLinkTitle: string = useMemo(() => {
        if (isDefined(activeCategory)) {
            return getCategoryName(activeCategory);
        }
        if (currentRoute.startsWith('/works/visualizations')) {
            return 'Graphics + Visualizations';
        }
        return 'All';
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
        <>
            {additionalNavShown && <div className={styles.backdrop} />}
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
                    <div className={styles.nestedRoutes}>
                        <Link
                            href="/works/"
                            className={_cs(
                                (currentRoute === '/works' && isNotDefined(activeCategory))
                                && styles.active,
                                styles.link,
                            )}
                        >
                            All
                        </Link>
                        {(
                            subRoutes.map((route) => (
                                <Link
                                    href={route.url}
                                    className={_cs(
                                        (activeCategory === route.key) && styles.active,
                                        styles.link,
                                    )}
                                >
                                    {route.displayName}
                                </Link>
                            ))
                        )}
                        <Link
                            href="/visualizations"
                            className={_cs(
                                currentRoute.startsWith('/visualizations')
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
                            {activeLinkTitle}
                        </Button>
                        <div className={styles.otherRoutes}>
                            <Link
                                href="/works/"
                                className={_cs(
                                    (currentRoute === '/works' && isNotDefined(activeCategory))
                                    && styles.active,
                                    styles.link,
                                )}
                            >
                                All
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
        </>
    );
}

export default WorkNavbar;
