import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import {
    EffectFade,
    Pagination,
    Mousewheel,
    Autoplay,
} from 'swiper';
import { isDefined } from '@togglecorp/fujs';

import SideNavbar from 'components/PageWithSideBar/SideNav';
import TextOutput from 'components/TextOutput';
import GaathaLogo from 'components/GaathaLogo';
import HTMLOutput from 'components/HTMLOutput';
import { WorkItemQuery } from 'generated/types';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;
interface Props {
    work: WorkItemType;
}

function WorkDetail(props: Props) {
    const {
        work,
    } = props;

    const galleryImages = work.images;

    return (
        <div
            className={styles.page}
        >
            <SideNavbar
                className={styles.navbar}
                lightMode
                hideGaathaLogo
            />
            <div className={styles.workTitle}>
                {work.title}
            </div>
            <div className={styles.content}>
                <div className={styles.left}>
                    <div className={styles.artworkContainer}>
                        {isDefined(work.artWork) && isDefined(work.artWork.url) && (
                            <Image
                                className={styles.artwork}
                                src={work.artWork.url}
                                alt="artwork"
                                fill
                            />
                        )}
                    </div>
                    <div className={styles.description}>
                        <HTMLOutput
                            value={work.description}
                        />
                    </div>
                </div>
                <div className={styles.carouselWrapper}>
                    {(galleryImages.length > 0) && (
                        <Swiper
                            className={styles.carousel}
                            effect="fade"
                            modules={[EffectFade, Mousewheel, Pagination, Autoplay]}
                            pagination={{ clickable: true }}
                            direction="vertical"
                            autoplay={{ delay: 2500 }}
                            mousewheel
                            draggable
                        >
                            {galleryImages?.map((image) => (
                                isDefined(image.image) && isDefined(image.image.url) && (
                                    <SwiperSlide
                                        className={styles.imageWrapper}
                                    >
                                        <Image
                                            className={styles.image}
                                            src={image.image.url}
                                            alt="carousel image"
                                            fill
                                        />
                                    </SwiperSlide>
                                )
                            ))}
                        </Swiper>
                    )}
                    <div className={styles.rightPane}>
                        <GaathaLogo
                            variant="small"
                            className={styles.logo}
                            lightMode
                        />
                        <div className={styles.extraInfo}>
                            <TextOutput
                                label="Area"
                                value={work.area}
                                multiline
                            />
                            <TextOutput
                                label="Status"
                                value={work.status}
                                multiline
                            />
                            <TextOutput
                                label="Duration"
                                value={work.duration}
                                multiline
                            />
                            <TextOutput
                                label="Location"
                                value={work.location}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkDetail;
