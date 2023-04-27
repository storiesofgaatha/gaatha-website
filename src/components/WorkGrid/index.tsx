import { isDefined } from '@togglecorp/fujs';
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

import styles from './styles.module.css';

const BUCKET_SIZE = 12;
export type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;

interface Props {
    works: WorkItemType[];
    selectedTag?: string;
}

function WorkGrid(props: Props) {
    const {
        works,
        selectedTag,
    } = props;


    // const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    const filteredWorks = (isDefined(selectedTag) && selectedTag !== '0')
        ? works.filter((work) => work.tag?.id === selectedTag)
        : works;

    const workBuckets = bucketify(BUCKET_SIZE, filteredWorks);

    return (
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
                                href={`work/${work.id}`}
                                className={styles.imageContainer}
                            >
                                <Image
                                    className={styles.coverImage}
                                    src={work.coverImage.url}
                                    alt="cover image"
                                    layout="fill"
                                />
                                <div className={styles.title}>
                                    {work.title}
                                </div>
                            </Link>
                        )
                    ))}
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default WorkGrid;
