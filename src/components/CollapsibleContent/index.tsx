import React from 'react';
import {
    IoChevronForward,
    IoChevronDown,
} from 'react-icons/io5';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

interface Props<N> {
    className?: string;
    childrenClassName?: string;
    header?: React.ReactNode;
    children?: React.ReactNode;
    isExpanded?: boolean;
    name: N,
    onExpansionChange: (isExpanded: boolean, name: N) => void;
    arrowShown?: boolean;
    headerClassName?: string;
}

function CollapsibleContent<N>(props: Props<N>) {
    const {
        className,
        header,
        children,
        isExpanded,
        name,
        onExpansionChange,
        childrenClassName,
        arrowShown,
        headerClassName,
    } = props;

    const handleHeaderClick = React.useCallback(() => {
        if (onExpansionChange) {
            onExpansionChange(!isExpanded, name);
        }
    }, [onExpansionChange, name, isExpanded]);

    return (
        <div className={_cs(styles.collapsibleContent, className)}>
            <div
                className={styles.headerContainer}
                onClick={handleHeaderClick}
                onKeyDown={handleHeaderClick}
                tabIndex={0}
                role="button"
            >
                <div className={_cs(styles.header, headerClassName)}>
                    {header}
                </div>
                {arrowShown && (
                    isExpanded ? (
                        <IoChevronDown className={styles.icon} />
                    ) : (
                        <IoChevronForward className={styles.icon} />
                    )
                )}
            </div>
            <div className={_cs(styles.children, childrenClassName, isExpanded && styles.expanded)}>
                <p>{children}</p>
            </div>
        </div>
    );
}

export default CollapsibleContent;
