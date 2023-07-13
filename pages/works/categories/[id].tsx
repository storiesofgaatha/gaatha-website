import React from 'react';
import { isDefined } from '@togglecorp/fujs';
import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { gql } from 'graphql-request';

import {
    gaathaRequest,
} from 'utils/common';
import { WorkListForCategoryQuery } from 'generated/types';

import GaathaLogo from 'components/GaathaLogo';
import WorkGrid, { WorkItemType } from 'components/WorkGrid';
import WorkNavbar from 'components/WorkNavbar';

import styles from './styles.module.css';

type FilterChoiceType = NonNullable<WorkListForCategoryQuery['filterChoices']>;

interface Props {
    works: WorkItemType[];
    filterChoices: FilterChoiceType;
    categoryId: string | undefined;
}

function Works(props: Props) {
    const {
        works,
        filterChoices,
        categoryId,
    } = props;

    const categories = filterChoices.workCategory?.filter((cat) => isDefined(cat.id));

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
                    activeCategory={categoryId}
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

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const workList = gql`
        query WorkListForCategory (
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
        categoryId: params?.id as (string | undefined),
    };

    const value = await gaathaRequest(workList, variables);

    return ({
        props: {
            works: value.works,
            filterChoices: value.filterChoices,
            // FIXME: don't cast
            categoryId: params?.id as (string | undefined),
        },
    });
};

type CategoryItem = NonNullable<FilterChoiceType['workCategory']>[number];

export const getStaticPaths: GetStaticPaths = async () => {
    const meta = gql`
        query Meta {
            filterChoices {
                workCategory {
                    id
                    name
                }
            }
        }
    `;

    const metaResponse = await gaathaRequest(meta);
    const categories = metaResponse.filterChoices.workCategory;

    const pathsWithParams = categories.map((category: CategoryItem) => ({
        params: { id: category.id },
    }));

    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    };
};

export default Works;
