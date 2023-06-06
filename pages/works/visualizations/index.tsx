import { useState, useCallback, useMemo } from 'react';
import { isDefined } from '@togglecorp/fujs';
import Image from 'next/image';
import { GetStaticProps } from 'next';
import { gql } from 'graphql-request';

import PageWithSideBar from 'components/PageWithSideBar';
import { gaathaRequest } from 'utils/common';
import {
    FeaturedWorksQuery,
} from 'generated/types';
import styles from './styles.module.css';

type ProjectType = NonNullable<NonNullable<FeaturedWorksQuery['projects']>[number]>;
type FilterChoiceType = NonNullable<FeaturedWorksQuery['filterChoices']>;

interface Props {
    projects: ProjectType[];
    filterChoices: FilterChoiceType;
}

function GraphicsAndVisualizations(props: Props) {
    const {
        projects,
        filterChoices,
    } = props;

    const categories = filterChoices.workCategory;
    const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);
    const handleMouseHover = useCallback((projectId: string) => {
        setSelectedProjectId(projectId);
    }, []);

    const selectedProject = useMemo(() => projects.find(
        (project) => project.id === selectedProjectId,
    ), [
        projects,
        selectedProjectId,
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
                {projects.map((project) => (
                    <div className={styles.imageWrapper}>
                        {isDefined(project.image) && isDefined(project.image.url) && (
                            <Image
                                className={styles.image}
                                alt="project cover image"
                                src={project.image.url}
                                onMouseOver={() => handleMouseHover(project.id)}
                                fill
                            />
                        )}
                    </div>
                ))}
            </div>
            <div className={styles.infoContainer}>
                <span className={styles.projectTitle}>
                    {selectedProject?.title}
                </span>
                <span>
                    {selectedProject?.location}
                </span>
            </div>
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const featuredWorks = gql`
        query FeaturedWorks {
            projects {
                id
                location
                title
                image {
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

    const value = await gaathaRequest(featuredWorks);

    return ({
        props: {
            projects: value.projects,
            filterChoices: value.filterChoices,
        },
    });
};

export default GraphicsAndVisualizations;
