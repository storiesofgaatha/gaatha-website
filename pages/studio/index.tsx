import { useCallback, useMemo, useState } from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import StudioNavbar from 'components/StudioNavbar';
import Image from 'next/image';

import StoriesBlock from 'components/StoriesBlock';
import CollapsibleContent from 'components/CollapsibleContent';

import styles from './styles.module.css';

type Topic = 'studio' | 'design' | 'collaboration';
function Studio() {
    const [
        selectedTopic,
        setSelectedTopic,
    ] = useState<Topic | undefined>();

    const handleExpansionChange = useCallback((newValue: boolean, name: Topic | undefined) => {
        setSelectedTopic(!newValue ? undefined : name);
    }, []);

    const sideImage = useMemo(() => {
        if (!selectedTopic) {
            return '/about_right.png';
        }
        if (selectedTopic === 'design') {
            return 'https://images.unsplash.com/photo-1676808527792-2c6937102a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
        }
        if (selectedTopic === 'studio') {
            return 'https://images.unsplash.com/photo-1676909027980-4d01f76652e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
        }
        return 'https://images.unsplash.com/photo-1676834173767-e77528eebbb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=721&q=80';
    }, [
        selectedTopic,
    ]);

    return (
        <div className={styles.studio}>
            <div className={styles.bgWrap}>
                <StudioNavbar
                    className={styles.navbar}
                    transparentMode
                    hideGaathaLogo
                />
                <div className={styles.content}>
                    <div className={styles.studioContent}>
                        <div className={styles.logoWrapper}>
                            <Image
                                className={styles.image}
                                src="/logo-dark.png"
                                alt="Gaatha"
                                width={145}
                                height={100}
                            />
                        </div>
                        <div className={styles.descriptionContainer}>
                            <div className={_cs(
                                styles.studioDescription,
                                isDefined(selectedTopic) && styles.hideDescription,
                            )}
                            >
                                Based in Kathmandu, Gaatha (Nepali: गाथा), translating to s
                                stories, started with a young group of collaborative
                                professionals aligned together in creating a studio where
                                ideas are valued to reinforce better solutions in architectural
                                practice. Our studio incorporates a team constantly striving
                                to enhance the built environment with the same care and detail
                                in all works of architecture, planning, landscape, art,
                                graphics and research. Exploring, creating and documenting
                                stories with a team from diverse disciplines across the globe,
                                our practice has remained true to its core values ever since.
                            </div>
                            <StoriesBlock
                                semiTransparent={isDefined(selectedTopic)}
                            />
                        </div>
                        <div className={styles.studioTopics}>
                            <CollapsibleContent
                                name="studio"
                                headerClassName={styles.topic}
                                onExpansionChange={handleExpansionChange}
                                isExpanded={selectedTopic === 'studio'}
                                header="studio"
                                childrenClassName={styles.topicDescription}
                            >
                                While our workspace follows basic fundamentals and layouts of
                                any design office, the studio isn’t just limited to that but
                                expands to our working site and related collaboration offices
                                working together in a regulated structure. We have organized
                                our workspace such that there are events of critical
                                brainstorming and planning while having interactive sessions
                                within the team building up connections and unity, all adding
                                up to create a joyful experience and story of its own.
                            </CollapsibleContent>
                            <CollapsibleContent
                                name="design"
                                headerClassName={styles.topic}
                                onExpansionChange={handleExpansionChange}
                                isExpanded={selectedTopic === 'design'}
                                childrenClassName={styles.topicDescription}
                                header="design"
                            >
                                From the very first interaction to everything that comes
                                along the process, everyone has a story, be that the clients,
                                designers, field workers or the site itself. Collecting and
                                expressing those experiences with us in the process along with
                                theoretical and practical knowledge combined with the most
                                abstract ideas enhance the design, ultimately adding to the
                                experience. Moreover, the idea of multi-disciplinary thinking
                                helps the design evolve in sense of material, aesthetics,
                                functionality and purpose.
                            </CollapsibleContent>
                            <CollapsibleContent
                                name="collaboration"
                                headerClassName={styles.topic}
                                onExpansionChange={handleExpansionChange}
                                isExpanded={selectedTopic === 'collaboration'}
                                childrenClassName={styles.topicDescription}
                                header="collaboration"
                            >
                                We have valued our partnerships while collaborating with
                                various engineering professionals, architects, artists,
                                academicians, local communities and stakeholders aiding
                                in useful and interactive problem-solving in the overall
                                design and delivery process. Constant interaction with
                                multiple disciplines inspires us into newer perspectives
                                of approaching a subject while opening a window of
                                opportunity to learn and grow. For instance, getting
                                to know the material and construction techniques of
                                natural building practice from the perspective of site
                                personnel allows our team to experiment further on
                                possibilities of design which ultimately opens up further
                                conversation for innovation in the projects.
                            </CollapsibleContent>
                        </div>
                    </div>
                    <div className={styles.rightBackground}>
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src={sideImage}
                            placeholder="blur"
                            fill
                        />
                    </div>
                </div>
                <div className={styles.leftBackground}>
                    <Image
                        className={styles.image}
                        alt="Left Image"
                        src="/about_left.png"
                        placeholder="blur"
                        fill
                    />
                </div>
            </div>
        </div>
    );
}

export default Studio;
