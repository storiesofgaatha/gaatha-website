import { isDefined } from '@togglecorp/fujs';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import { gql } from 'graphql-request';

import { gaathaRequest } from 'utils/common';
import { WorkListQuery } from 'generated/types';

import PageWithSideBar from 'components/PageWithSideBar';

import styles from './styles.module.css';

type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;

interface Props {
    works: WorkItemType[];
}

function Works(props: Props) {
    const {
        works,
    } = props;

    return (
        <PageWithSideBar
            className={styles.work}
            pageTitle="Works"
        >
            <div className={styles.grid}>
                <div className={styles.sectionOne}>
                    {works.map((work) => (
                        isDefined(work.coverImage) && (
                            <Image
                                key={work.id}
                                src={work.coverImage.url}
                                alt="cover image"
                                width={700}
                                height={500}
                            />
                        )
                    ))}
                </div>
            </div>
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const workList = gql`
        query WorkList {
            works {
                area
                description
                duration
                id
                location
                status
                title
                artWork {
                    name
                    url
                }
                category {
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
