import { useMemo, useState } from 'react';
import { _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { gql } from 'graphql-request';

import {
    gaathaRequest,
} from 'utils/common';
import WorkGrid from 'components/WorkGrid';
import WorkNavbar from 'components/WorkNavbar';
import GaathaLogo from 'components/GaathaLogo';
import { WorkListQuery } from 'generated/types';

import PageWithSideBar from 'components/PageWithSideBar';
import Button from 'components/Button';

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

    // const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedTag, setSelectedTag] = useState<string | undefined>(undefined);

    const categories = filterChoices.workCategory;
    const tags = filterChoices.workTag;

    const allTags = useMemo(() => {
        const tempTags = [
            {
                id: '0',
                name: 'All',
            },
            ...(tags ?? []),
        ];
        return tempTags;
    }, []);

    const subRoutes = (
        <>
            <div className={styles.categories}>
                {categories?.map((cat) => (
                    <Link
                        key={cat.id}
                        href={`works/categories/${cat.id}`}
                        className={_cs(
                            styles.link,
                        )}
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>
            <div className={styles.tags}>
                {allTags.map((tag) => (
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
                    subRoutes={subRoutes}
                    subRoutesClassName={styles.subroutes}
                    hideGaathaLogo
                />
                <WorkGrid
                    works={works}
                    selectedTag={selectedTag}
                />
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
        categoryId: undefined,
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

export default Works;
