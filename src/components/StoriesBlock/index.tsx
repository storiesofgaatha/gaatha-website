import { _cs } from '@togglecorp/fujs';
import styles from './styles.module.css';

interface Props {
    className?: string;
    semiTransparent?: boolean;
}

function StoriesBlock(props: Props) {
    const {
        className,
        semiTransparent = false,
    } = props;

    return (
        <div className={_cs(
            className,
            styles.storiesBlock,
            semiTransparent && styles.semiTransparent,
        )}
        >
            <span className={styles.stories}>Stories</span>
            <div className={styles.areBestWhen}>
                are best when shared
                <span className={styles.together}>together</span>
            </div>
        </div>
    );
}

export default StoriesBlock;
