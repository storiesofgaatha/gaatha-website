import Link from 'next/link';
import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';

import styles from './styles.module.css';

type LogoVariant = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge' | 'mediumSmall';

interface Props {
    className?: string;
    logoClassName?: string;
    variant?: LogoVariant;
    lightMode?: boolean;
}

function GaathaLogo(props: Props) {
    const {
        className,
        logoClassName,
        variant = 'medium',
        lightMode,
    } = props;

    return (
        <Link
            className={_cs(
                className,
                styles.logo,
                variant === 'extraSmall' && styles.extraSmall,
                variant === 'small' && styles.small,
                variant === 'mediumSmall' && styles.mediumSmall,
                variant === 'medium' && styles.medium,
                variant === 'large' && styles.large,
                variant === 'extraLarge' && styles.extraLarge,
            )}
            href="/"
        >
            <Image
                className={_cs(logoClassName, styles.image)}
                src={lightMode ? '/logo-dark.png' : '/logo-light.png'}
                alt="Gaatha"
                fill
            />
        </Link>
    );
}

export default GaathaLogo;
