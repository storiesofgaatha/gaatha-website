import { GetStaticProps } from 'next';
import Image from 'next/image';
import { request, gql } from 'graphql-request';

import envVariables from 'utils/common';

import PageWithSideBar from 'components/PageWithSideBar';

import styles from './styles.module.css';

interface Props {
    works?: unknown;
}

function Works(props: any) {
    return (
        <PageWithSideBar
            className={styles.work}
            pageTitle="Works"
        >
            <div className={styles.grid}>
                <div className={styles.sectionOne}>
                    {props.works.map((work) => (
                        <Image
                            key={work.id}
                            src={work.coverImage.url}
                            alt="idk"
                            width={700}
                            height={500}
                        />
                    ))}
                </div>
            </div>
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const WORKS_LIST = gql`
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

    // FIXME: setup typescript typings
    const value = await request(envVariables.graphqlEndpoint, WORKS_LIST);
    return { props: { works: value.works } };
};

export default Works;
