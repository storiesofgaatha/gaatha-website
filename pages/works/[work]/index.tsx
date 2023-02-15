import React, { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { isDefined } from '@togglecorp/fujs';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import Image from 'next/image';
import Link from 'next/link';
import { gql } from 'graphql-request';

import { gaathaRequest } from 'utils/common';
import {
    WorkItemQuery,
    WorkMiniListQuery,
} from 'generated/types';

import WorkDetail from './workDetail';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;

interface Props {
    work: WorkItemType;
}

function WorkItem(props: Props) {
    const {
        work,
    } = props;

    const [
        nextPageButtonClicked,
        setNextPageButtonClicked,
    ] = useState<Boolean>(false);

    const handleClick = () => {
        setNextPageButtonClicked(true);
    };

    return (
        <div className={styles.page}>
            {!nextPageButtonClicked && (
                <>
                    <div className={styles.imageWrapper}>
                        {isDefined(work.coverImage) && (
                            <Image
                                className={styles.image}
                                src={work.coverImage.url}
                                alt="cover image"
                                layout="fill"
                            />
                        )}
                    </div>
                    <div className={styles.header}>
                        <div className={styles.left}>
                            <div>
                                {work.title}
                            </div>
                            <div className={styles.artwork}>
                                {isDefined(work.artWork) && (
                                    <Image
                                        className={styles.image}
                                        src={work.artWork.url}
                                        alt="artwork"
                                        layout="fill"
                                    />
                                )}
                            </div>
                        </div>
                        <Link href="/" className={styles.right}>
                            <Image
                                className={styles.image}
                                src="/logo-dark.png"
                                alt="Gaatha"
                                layout="fill"
                            />
                        </Link>
                    </div>
                    <div className={styles.buttonContainer}>
                        <IoChevronDownCircleOutline
                            className={styles.nextPageButton}
                            onClick={handleClick}
                        />
                    </div>
                </>
            )}
            {nextPageButtonClicked && (
                <WorkDetail
                    work={work}
                />
            )}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const work = gql`
        query WorkItem (
            $id: ID!,
        ) {
            work(pk: $id) {
                id
                title
                description
                area
                duration
                location
                status
                artWork {
                    name
                    url
                }
                coverImage {
                    name
                    url
                }
                images {
                    id
                    image {
                        name
                        url
                    }
                }
            }
        }
    `;

    const value = await gaathaRequest(work, { id: params?.work });
    const props = { work: value.work };

    return { props };
};

type WorkMiniItem = NonNullable<WorkMiniListQuery['works']>[number];
export const getStaticPaths: GetStaticPaths = async () => {
    const workMiniList = gql`
        query WorkMiniList {
            works {
                id
                title
            }
        }
    `;

    const value = await gaathaRequest(workMiniList);
    const pathsWithParams = value.works.map((project: WorkMiniItem) => ({
        params: { work: project.id },
    }));

    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    };
};

export default WorkItem;
