import { ReactNode, useCallback } from 'react';
import { _cs } from '@togglecorp/fujs';

import styles from './styles.module.css';

export type ButtonVariant = (
    'primary' | 'default' | 'outline' | 'outline-active' | 'tab' | 'tab-active' | 'transparent' | 'primary-active'
);

export interface ButtonLikeProps {
    variant?: ButtonVariant;
    className?: string;
    children?: ReactNode;
    icons?: ReactNode;
    actions?: ReactNode;
    actionsClassName?: string;
    disabled?: boolean;
}

export function useButtonFeatures(props: ButtonLikeProps) {
    const {
        variant = 'default',
        className: classNameFromProps,
        icons,
        children,
        actions,
        disabled,
    } = props;

    const buttonClassName = _cs(
        classNameFromProps,
        styles.button,
        variant === 'default' && styles.default,
        variant === 'primary' && styles.primary,
        variant === 'primary-active' && styles.primaryActive,
        variant === 'tab' && styles.tab,
        variant === 'tab-active' && styles.tabActive,
        variant === 'outline' && styles.outline,
        variant === 'outline-active' && styles.outlineActive,
        variant === 'transparent' && styles.transparent,
        disabled && styles.disabled,
    );

    const buttonChildren = (
        <>
            {icons && (
                <div className={styles.icons}>
                    {icons}
                </div>
            )}
            {children && (
                <div className={styles.children}>
                    {children}
                </div>
            )}
            {actions && (
                <div className={styles.actions}>
                    {actions}
                </div>
            )}
        </>
    );

    return {
        className: buttonClassName,
        children: buttonChildren,
    };
}

interface Props<N> extends ButtonLikeProps {
    name: N;
    onClick?: (name: N) => void;
    type?: 'button' | 'submit' | 'reset';
}

function Button<N>(props: Props<N>) {
    const {
        variant,
        className,
        children,
        icons,
        actions,
        name,
        onClick,
        type,
        ...otherProps
    } = props;

    const buttonProps = useButtonFeatures({
        variant,
        className,
        children,
        icons,
        actions,
    });

    const handleClick = useCallback(() => {
        if (onClick) {
            onClick(name);
        }
    }, [name, onClick]);

    return (
        <button
            // eslint-disable-next-line react/button-has-type
            type={type}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...buttonProps}
            onClick={handleClick}
        />
    );
}

export default Button;
