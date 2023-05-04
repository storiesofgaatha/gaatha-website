import React from 'react';
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

import GaathaLogo from 'components/GaathaLogo';
import WorkDetail from 'components/workDetail';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;

interface Props {
    work: WorkItemType;
}

function WorkItem(props: Props) {
    const {
        work,
    } = props;

    return (
        <div className={styles.page}>
            <div className={styles.imageWrapper}>
                {isDefined(work.coverImage) && isDefined(work.coverImage.url) && (
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
                    <div className={work.isCoverImageDark && styles.dark}>
                        {work.title}
                    </div>
                    <div className={styles.artwork}>
                        {isDefined(work.artWork) && isDefined(work.artWork.url) && (
                            <Image
                                className={styles.image}
                                src={work.artWork.url}
                                alt="artwork"
                                layout="fill"
                            />
                        )}
                    </div>
                </div>
                <GaathaLogo
                    variant="small"
                    lightMode={!work.isCoverImageDark}
                />
            </div>
            <WorkDetail
                work={work}
            />
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
                isCoverImageDark
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

    const value = await gaathaRequest(work, { id: params?.id });
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
        params: { id: project.id },
    }));

    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    };
};

export default WorkItem;
