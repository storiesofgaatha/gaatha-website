import { useState, useCallback, useMemo } from 'react';
import { isDefined } from '@togglecorp/fujs';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { gql } from 'graphql-request';

import PageWithSideBar from 'components/PageWithSideBar';
import { gaathaRequest } from 'utils/common';
import {
    VisualizationWorksQuery,
} from 'generated/types';

import styles from './styles.module.css';

type VisualizationType = NonNullable<NonNullable<VisualizationWorksQuery['works']>[number]>;
type FilterChoiceType = NonNullable<VisualizationWorksQuery['filterChoices']>;

interface Props {
    visualizations: VisualizationType[];
    filterChoices: FilterChoiceType;
}

function GraphicsAndVisualizations(props: Props) {
    const {
        visualizations,
        filterChoices,
    } = props;

    const categories = filterChoices.workCategory;
    const [selectedVizId, setSelectedVizId] = useState<string | undefined>(undefined);
    const handleMouseHover = useCallback((vizId: string) => {
        setSelectedVizId(vizId);
    }, []);

    const selectedViz = useMemo(() => visualizations.find(
        (viz) => viz.id === selectedVizId,
    ), [
        visualizations,
        selectedVizId,
    ]);

    return (
        <PageWithSideBar
            className={styles.page}
            contentClassName={styles.content}
            pageTitle="Works"
            navbarClassName={styles.navbar}
            navbar="work"
            categories={categories ?? undefined}
            lightMode
        >
            <div className={styles.imagesContainer}>
                {visualizations.map((viz) => (
                    <div className={styles.imageWrapper}>
                        {isDefined(viz.coverImage) && isDefined(viz.coverImage.url) && (
                            <Image
                                className={styles.image}
                                alt="Visualization cover image"
                                src={viz.coverImage.url}
                                placeholder="blur"
                                onMouseOver={() => handleMouseHover(viz.id)}
                                fill
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.infoContainer}>
                <span className={styles.vizTitle}>
                    {selectedViz?.title}
                </span>
                <span>
                    {selectedViz?.location}
                </span>
            </div>
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const visualizationWorks = gql`
        query VisualizationWorks {
            works (
                filters: {
                    workType: GRAPHICS_AND_VISUALIZATION,
                }
                order: {
                    order: ASC
                },
            ) {
                id
                title
                description
                coverImage {
                    name
                    url
                }
                location
                duration
                area
                status
            }
            filterChoices {
                workCategory {
                    id
                    name
                }
            }
        }
    `;

    const value = await gaathaRequest(visualizationWorks);

    return ({
        props: {
            visualizations: value.works,
            filterChoices: value.filterChoices,
        },
    });
};

export default GraphicsAndVisualizations;
