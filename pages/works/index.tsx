import { isDefined } from '@togglecorp/fujs';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from 'graphql-request';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import {
    Mousewheel,
} from 'swiper';

import {
    gaathaRequest,
    bucketify,
} from 'utils/common';
import { WorkListQuery } from 'generated/types';

import PageWithSideBar from 'components/PageWithSideBar';

import styles from './styles.module.css';

const BUCKET_SIZE = 12;
type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;
// type FilterChoiceType = NonNullable<WorkListQuery['filterChoices']>;
// type CategoryType = NonNullable<FilterChoiceType['workCategory']>[number];
// type TagType = NonNullable<FilterChoiceType['workTag']>[number];

interface Props {
    works: WorkItemType[];
    // filterChoices: FilterChoiceType;
}

function Works(props: Props) {
    const {
        works,
        // filterChoices,
    } = props;

    const workBuckets = bucketify(BUCKET_SIZE, works);

    return (
        <PageWithSideBar
            className={styles.work}
            contentClassName={styles.content}
            pageTitle="Works"
            navbar="work"
        >
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
                                    href={`works/${work.id}`}
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
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const workList = gql`
        query WorkList {
            works {
                description
                id
                title
                category {
                    id
                    name
                }
                tag {
                    id
                    name
                }
                coverImage {
                    name
                    url
                }
            }
            filterChoices {
                workCategory {
                    id
                    name
                }
                workTag {
                    id
                    name
                }
            }
        }
    `;

    const value = await gaathaRequest(workList);
    return ({
        props: {
            works: value.works,
            filterChoices: value.filterChoices,
        },
    });
};

export default Works;
