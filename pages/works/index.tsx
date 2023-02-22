import { isDefined } from '@togglecorp/fujs';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from 'graphql-request';

import { gaathaRequest } from 'utils/common';
import { WorkListQuery } from 'generated/types';

import PageWithSideBar from 'components/PageWithSideBar';

import styles from './styles.module.css';

const BUCKET_SIZE = 12;
type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;

interface Props {
    works: WorkItemType[];
}

function Works(props: Props) {
    const {
        works,
    } = props;

    let noOfBuckets = Math.floor(works.length / BUCKET_SIZE);
    if (works.length % BUCKET_SIZE !== 0) {
        noOfBuckets += 1;
    }
    const buckets = [];
    while (buckets.length < noOfBuckets) {
        buckets.push(works.slice(
            buckets.length * BUCKET_SIZE,
            buckets.length * BUCKET_SIZE + BUCKET_SIZE,
        ));
    }

    return (
        <PageWithSideBar
            className={styles.work}
            pageTitle="Works"
            navbar="work"
        >
            <div className={styles.buckets}>
                {buckets.map((bucket, index) => (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className={styles.grid}
                    >
                        {bucket.map((work) => (
                            isDefined(work.coverImage) && (
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
                                </Link>
                            )
                        ))}
                    </div>
                ))}
            </div>
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
        }
    `;

    const value = await gaathaRequest(workList);
    return ({
        props: {
            works: value.works,
        },
    });
};

export default Works;
