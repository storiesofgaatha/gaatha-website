import { _cs, isDefined } from '@togglecorp/fujs';
import Link from 'next/link';
import Image from 'next/image';

import ProjectTitle from 'components/ProjectTitle';
import { WorkListQuery } from 'generated/types';
import styles from './styles.module.css';

type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;

interface Props {
    works: WorkItemType[][];
}

function ResponsiveWorkGrid(props: Props) {
    const {
        works,
    } = props;
    return (
        <div className={_cs(styles.responsive)}>
            {works.map((bucket, index) => (
                <div
                    className={styles.grid}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                >
                    {bucket.map((work) => (
                        isDefined(work.coverImage) && isDefined(work.coverImage.url) && (
                            <Link
                                key={work.id}
                                href={`/work/${work.id}`}
                                className={styles.imageContainer}
                            >
                                <Image
                                    className={styles.coverImage}
                                    src={work.coverImage.url}
                                    alt="cover image"
                                    layout="fill"
                                />
                                <ProjectTitle
                                    className={styles.title}
                                    title={work.title}
                                    subtitle={work.subTitle}
                                />
                            </Link>
                        )
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ResponsiveWorkGrid;
