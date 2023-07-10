import { _cs, isTruthyString } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
    title: string;
    subtitle?: string;
    size?: 'small' | 'medium' | 'large' | 'extraLarge';
    separateLines?: boolean;
}

function ProjectTitle(props: Props) {
    const {
        title,
        subtitle,
        size = 'small',
        className,
        separateLines,
    } = props;

    return (
        <div className={_cs(
            styles.projectTitle,
            className,
            size === 'medium' && styles.medium,
            size === 'large' && styles.large,
            size === 'extraLarge' && styles.extraLarge,
            separateLines && styles.block,
        )}
        >
            <span className={styles.title}>
                {title}
            </span>
            <span className={styles.subtitle}>
                {isTruthyString(subtitle) && (
                    <>
                        &thinsp;
                        <b>|</b>
                        &thinsp;
                        {subtitle}
                    </>
                )}
            </span>
        </div>
    );
}

export default ProjectTitle;
