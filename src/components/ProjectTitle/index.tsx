import { _cs, isTruthyString } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
    title: string;
    subtitle?: string;
    size?: 'small' | 'medium' | 'large';
}

function ProjectTitle(props: Props) {
    const {
        title,
        subtitle,
        size = 'small',
        className,
    } = props;

    return (
        <div className={_cs(
            styles.title,
            className,
            size === 'medium' && styles.medium,
            size === 'large' && styles.large,
        )}
        >
            <span className={styles.bold}>
                {title}
            </span>
            {isTruthyString(subtitle) && (
                <>
                    &thinsp;
                    <b> | </b>
                    &thinsp;
                    {subtitle}
                </>
            )}
        </div>
    );
}

export default ProjectTitle;
