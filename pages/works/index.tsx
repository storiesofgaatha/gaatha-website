import Head from 'next/head';
import { GetStaticProps } from 'next';

import { gql } from 'graphql-request';

import {
    gaathaRequest,
} from 'utils/common';
import WorkGrid from 'components/WorkGrid';
import WorkNavbar from 'components/WorkNavbar';
import GaathaLogo from 'components/GaathaLogo';
import { WorkListQuery } from 'generated/types';

import styles from './styles.module.css';

type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;
type FilterChoiceType = NonNullable<WorkListQuery['filterChoices']>;

interface Props {
    works: WorkItemType[];
    filterChoices: FilterChoiceType;
}

function Works(props: Props) {
    const {
        works,
        filterChoices,
    } = props;

    const categories = filterChoices.workCategory;

    return (
        <div className={styles.works}>
            <Head>
                Works
            </Head>
            <div className={styles.topContainer}>
                <GaathaLogo variant="small" />
            </div>
            <div className={styles.content}>
                <WorkNavbar
                    className={styles.navbar}
                    categories={categories ?? []}
                    hideGaathaLogo
                />
                <WorkGrid
                    works={works}
                />
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const workList = gql`
        query WorkList (
            $categoryId: ID,
        ) {
            works (
                filters: {
                    category: $categoryId,
                }
                order: {
                    order: ASC
                },
            ) {
                description
                id
                title
                subTitle
                workType
                workTypeLabel
                category {
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
            }
        }
    `;

    const variables = {
        categoryId: undefined,
    };

    const value = await gaathaRequest(workList, variables);

    return ({
        props: {
            works: value.works,
            filterChoices: value.filterChoices,
        },
    });
};

export default Works;
