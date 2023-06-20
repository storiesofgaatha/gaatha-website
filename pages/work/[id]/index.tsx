import React, { useRef, useCallback } from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import { IoCaretDown } from 'react-icons/io5';
import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import { gql } from 'graphql-request';

import { gaathaRequest } from 'utils/common';
import {
    WorkItemQuery,
    WorkMiniListQuery,
} from 'generated/types';

import ProjectTitle from 'components/ProjectTitle';
import GaathaLogo from 'components/GaathaLogo';
import WorkDetail from 'components/workDetail';
import Button from 'components/Button';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;

interface Props {
    work: WorkItemType;
}

function WorkItem(props: Props) {
    const {
        work,
    } = props;

    const divRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
        divRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, []);

    return (
        <div className={styles.page}>
            <div className={styles.imageWrapper}>
                {isDefined(work.coverImage) && isDefined(work.coverImage.url) && (
                    <Image
                        className={styles.image}
                        src={work.coverImage.url}
                        alt="cover image"
                        fill
                    />
                )}
            </div>
            <div className={styles.header}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <ProjectTitle
                            className={_cs(
                                styles.title,
                            )}
                            title={work.title}
                            subtitle={work.subTitle}
                            size="medium"
                        />
                        <div className={styles.artwork}>
                            {isDefined(work.artWork) && isDefined(work.artWork.url) && (
                                <Image
                                    className={styles.image}
                                    src={work.artWork.url}
                                    alt="artwork"
                                    fill
                                />
                            )}
                        </div>
                    </div>

                    <GaathaLogo
                        className={styles.logo}
                        variant="small"
                        lightMode={!work.isCoverImageDark}
                    />
                </div>
                <div className={styles.responsiveArtwork}>
                    {isDefined(work.artWork) && isDefined(work.artWork.url) && (
                        <Image
                            className={styles.image}
                            src={work.artWork.url}
                            alt="artwork"
                            fill
                        />
                    )}
                </div>
                <div className={styles.bottom}>
                    <Button
                        name={undefined}
                        onClick={handleClick}
                        className={styles.button}
                    >
                        <IoCaretDown />
                    </Button>
                </div>
            </div>
            <WorkDetail
                elementRef={divRef}
                className={styles.detail}
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
                subTitle
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
                subTitle
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
