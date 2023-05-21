import { _cs, isDefined, isTruthyString } from '@togglecorp/fujs';
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import {
    Mousewheel,
} from 'swiper';

import {
    bucketify,
} from 'utils/common';
import { WorkListQuery } from 'generated/types';
import ResponsiveWorkGrid from 'components/ResponsiveWorkGrid';
import ProjectTitle from 'components/ProjectTitle';

import styles from './styles.module.css';

const BUCKET_SIZE = 12;

export type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;

interface Props {
    works: WorkItemType[];
}

function WorkGrid(props: Props) {
    const {
        works,
    } = props;

    const workBuckets = bucketify(BUCKET_SIZE, works);

    return (
        <>
            <div className={styles.swiperContainer}>
                <Swiper
                    className={styles.buckets}
                    modules={[Mousewheel]}
                    mousewheel
                >
                    {workBuckets.map((bucket, index) => (
                        <SwiperSlide
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className={styles.grid}
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={_cs(styles.responsive)}>
                <ResponsiveWorkGrid
                    works={workBuckets}
                />
            </div>
        </>
    );
}

export default WorkGrid;
