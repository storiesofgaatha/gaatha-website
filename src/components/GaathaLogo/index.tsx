import Link from 'next/link';
import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';

import styles from './styles.module.css';

type LogoVariant = 'small' | 'medium' | 'large';

const sizeByLogoVariant = {
    small: {
        width: 100,
        height: 80,
    },
    medium: {
        width: 200,
        height: 160,
    },
    large: {
        width: 320,
        height: 200,
    },
};

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
            className={className}
            href="/"
        >
            <Image
                className={_cs(logoClassName, styles.logo)}
                src={lightMode ? '/logo-dark.png' : '/logo-light.png'}
                alt="Gaatha"
                width={sizeByLogoVariant[variant].width}
                height={sizeByLogoVariant[variant].height}
            />
        </Link>
    );
}

export default GaathaLogo;
