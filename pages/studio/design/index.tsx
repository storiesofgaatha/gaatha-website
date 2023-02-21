import StudioNavbar from 'components/StudioNavbar';
import Image from 'next/image';

import StoriesBlock from 'components/StoriesBlock';

import styles from './styles.module.css';

function Design() {
    return (
        <div className={styles.studio}>
            <div className={styles.bgWrap}>
                <StudioNavbar
                    className={styles.navbar}
                    transparentMode
                />
                <div className={styles.content}>
                    <div className={styles.studioContent}>
                        <div className={styles.logoWrapper}>
                            <Image
                                src="/logo-dark.png"
                                alt="Gaatha"
                                width={145}
                                height={100}
                            />
                        </div>
                        <StoriesBlock
                            className={styles.storiesBlock}
                            semiTransparent
                        />
                        <div className={styles.studioRoutes}>
                            <h4>
                                design
                            </h4>
                            <p>
                                From the very first interaction to everything that comes
                                along the process, everyone has a story, be that the clients,
                                designers, field workers or the site itself. Collecting and
                                expressing those experiences with us in the process along with
                                theoretical and practical knowledge combined with the most
                                abstract ideas enhance the design, ultimately adding to the
                                experience. Moreover, the idea of multi-disciplinary thinking
                                helps the design evolve in sense of material, aesthetics,
                                functionality and purpose.
                            </p>
                        </div>
                    </div>
                    <div className={styles.rightBackground}>
                        {
                            // TODO: Add image after receiving it from clients
                        }
                        <Image
                            className={styles.image}
                            alt="Right Image"
                            src="https://images.unsplash.com/photo-1676808527792-2c6937102a99?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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

export default Design;
