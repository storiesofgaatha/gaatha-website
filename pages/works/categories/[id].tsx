import { useState } from 'react';
import { _cs } from '@togglecorp/fujs';
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import { gql } from 'graphql-request';

import {
    gaathaRequest,
} from 'utils/common';
import { WorkListQuery } from 'generated/types';

import PageWithSideBar from 'components/PageWithSideBar';
import WorkGrid, { WorkItemType } from 'components/WorkGrid';
import Button from 'components/Button';

import styles from './styles.module.css';

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

    const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

    const categories = filterChoices.workCategory;
    const tags = filterChoices.workTag;

    const subRoutes = (
        <>
            <div className={styles.categories}>
                {categories?.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`/works/categories/${cat.id}`}
                        className={_cs(
                            styles.link,
                        )}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
            <div className={styles.tags}>
                {tags?.map((tag) => (
                    <Button
                        name={tag.id}
                        className={_cs(
                            tag.id === selectedTag && styles.active,
                            styles.link,
                        )}
                        onClick={setSelectedTag}
                        variant="transparent"
                    >
                        {tag.name}
                    </Button>
                ))}
            </div>
        </>
    );

    return (
        <PageWithSideBar
            className={styles.work}
            contentClassName={styles.content}
            pageTitle="Works"
            navbar="work"
            subRoutes={subRoutes}
            subRoutesClassName={styles.subroutes}
        >
            <WorkGrid
                works={works}
                selectedTag={selectedTag}
            />
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const workList = gql`
        query WorkList (
            $categoryId: ID,
            $tagId: ID,
        ) {
            works (
                filters: {
                    category: $categoryId,
                    tag: $tagId,
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

    const variables = {
        categoryId: params?.id,
        tagId: undefined,
    };

    const value = await gaathaRequest(workList, variables);

    return ({
        props: {
            works: value.works,
            filterChoices: value.filterChoices,
        },
    });
};

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

    const pathsWithParams = categories.map((category: unknown) => ({
        params: { id: category.id },
    }));

    return {
        paths: pathsWithParams,
        fallback: 'blocking',
    };
};

export default Works;
