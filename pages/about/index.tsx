import { useCallback, useState } from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import StudioNavbar from 'components/StudioNavbar';
import Image from 'next/image';

import GaathaLogo from 'components/GaathaLogo';
import StoriesBlock from 'components/StoriesBlock';
import CollapsibleContent from 'components/CollapsibleContent';

import styles from './styles.module.css';

type Topic = 'workspace' | 'design' | 'collaboration';
function About() {
    const [
        selectedTopic,
        setSelectedTopic,
    ] = useState<Topic | undefined>();

    const handleExpansionChange = useCallback((newValue: boolean, name: Topic | undefined) => {
        setSelectedTopic(!newValue ? undefined : name);
    }, []);

    return (
        <div className={styles.studio}>
            <div className={styles.leftBackground}>
                <Image
                    className={styles.image}
                    alt="Left Image"
                    src="/about_left.png"
                    placeholder="blur"
                    fill
                />
            </div>
            <StudioNavbar
                className={styles.navbar}
                transparentMode
                hideGaathaLogo
            />
            <div className={styles.content}>
                <div className={styles.studioContent}>
                    <div className={styles.logoWrapper}>
                        <GaathaLogo
                            variant="mediumSmall"
                            lightMode
                        />
                    </div>
                    <div className={styles.descriptionContainer}>
                        <div className={_cs(
                            styles.studioDescription,
                            isDefined(selectedTopic) && styles.hideDescription,
                        )}
                        >
                            Gaatha (Nepali: गाथा), translating to &quot;stories,&quot; is
                            an architecture and design firm based in Kathmandu started in
                            2019 by a young group of architects with a common vision to
                            redefine architecture and design as a practice of crafting
                            stories of the relationship between people,
                            nature, and the built environment. Gaatha recognizes architecture
                            as a collaborative discipline between diverse fields of practice.
                            Thus, our studio incorporates a global team that constantly interact
                            together in exploring, creating, and documenting stories, to create
                            the &quot;stories of Gaatha&quot;.
                        </div>
                        <StoriesBlock
                            semiTransparent={isDefined(selectedTopic)}
                        />
                    </div>
                    <div className={styles.studioTopics}>
                        <CollapsibleContent
                            name="workspace"
                            headerClassName={_cs(
                                styles.topic,
                                selectedTopic === 'workspace' ? styles.active : styles.inactive,
                                !selectedTopic && styles.neutral,
                            )}
                            onExpansionChange={handleExpansionChange}
                            isExpanded={selectedTopic === 'workspace'}
                            header="workspace"
                            childrenClassName={styles.topicDescription}
                        >
                            <p>
                                Our studio is designed to promote collaboration, conversation,
                                and sharing of ideas. We have intentionally maintained a cozy,
                                homely environment where anyone feels comfortable being their
                                true self, which we believe would empower confident and
                                authentic designers to practice design freely. This value
                                is reflected in a non-hierarchial team structure where every
                                team member’s voice is heard and valued equally.
                            </p>
                            <p>
                                Although our workspace follows any design office&apos;s basic
                                fundamentals and layouts, our studio is not limited to just
                                that. Instead, it expands to our working site and related
                                collaboration offices, working together in a regulated
                                structure. We have organized our workspace in such a way
                                that critical brainstorming and planning events take place,
                                while interactive sessions within the team build connections
                                and unity, ultimately creating a joyful experience and a story
                                of its own.
                            </p>
                        </CollapsibleContent>
                        <CollapsibleContent
                            name="design"
                            headerClassName={_cs(
                                styles.topic,
                                selectedTopic === 'design' ? styles.active : styles.inactive,
                                !selectedTopic && styles.neutral,
                            )}
                            onExpansionChange={handleExpansionChange}
                            isExpanded={selectedTopic === 'design'}
                            childrenClassName={styles.topicDescription}
                            header="design"
                        >
                            <p>
                                We pride ourselves on balancing the act of being active
                                listeners to our clients and being master mediators
                                between client needs, design philosophies, practical
                                knowledge, nouveau ideas, and multidisciplinary design
                                thinking.  We see opportunities in how design interacts
                                with time, people, and emotions, and how it holds the
                                power to affect its surrounding. We see design as a
                                critical dent in the fabric of space and time and thus
                                craft our practice with the utmost sensitivity, care,
                                and respect.
                            </p>
                            <p>
                                From the very first interaction to everything that comes
                                along the process, everyone has a story - be it the clients,
                                designers, field workers, or the site itself. Collecting and
                                expressing those experiences with us throughout the process,
                                along with theoretical and practical knowledge, combined with
                                the most abstract ideas, enhances the design and ultimately
                                adds to the experience. Moreover, the idea of multi-disciplinary
                                thinking helps the design evolve in terms of material,
                                aesthetics, functionality, and purpose.
                            </p>
                        </CollapsibleContent>
                        <CollapsibleContent
                            name="collaboration"
                            headerClassName={_cs(
                                styles.topic,
                                selectedTopic === 'collaboration' ? styles.active : styles.inactive,
                                !selectedTopic && styles.neutral,
                            )}
                            onExpansionChange={handleExpansionChange}
                            isExpanded={selectedTopic === 'collaboration'}
                            childrenClassName={styles.topicDescription}
                            header="collaboration"
                        >
                            <p>
                                We value our partnerships when collaborating with various
                                engineering professionals, architects, artists, academicians,
                                local communities, and stakeholders who aid in useful and
                                interactive problem-solving in the overall design and delivery
                                process. Constant interaction with multiple disciplines
                                inspires us to approach a subject from newer perspectives
                                while opening a window of opportunity for learning and growth.
                            </p>
                            <p>
                                For instance, getting to know the material and construction
                                techniques of natural building practices from the perspective
                                of site personnel allows our team to experiment further with
                                possibilities of design, ultimately opening up further
                                conversations for innovation in projects.
                            </p>
                        </CollapsibleContent>
                    </div>
                </div>
                <div className={styles.rightBackground}>
                    {!selectedTopic && (
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="/about_right.png"
                            placeholder="blur"
                            fill
                        />
                    )}
                    {selectedTopic === 'design' && (
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="https://images.unsplash.com/photo-1676808527792-2c6937102a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            placeholder="blur"
                            fill
                        />
                    )}
                    {selectedTopic === 'workspace' && (
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="https://images.unsplash.com/photo-1676909027980-4d01f76652e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                            placeholder="blur"
                            fill
                        />
                    )}
                    {selectedTopic === 'collaboration' && (
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="https://images.unsplash.com/photo-1676834173767-e77528eebbb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=721&q=80"
                            placeholder="blur"
                            fill
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default About;
