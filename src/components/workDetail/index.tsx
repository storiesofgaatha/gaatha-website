import {
    useCallback,
    useEffect,
    useRef,
    useMemo,
    useState,
} from 'react';
import type { LegacyRef } from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import Image from 'next/image';
import {
    IoEllipse,
} from 'react-icons/io5';

import SideNavbar from 'components/PageWithSideBar/SideNav';
import TextOutput from 'components/TextOutput';
import GaathaLogo from 'components/GaathaLogo';
import HTMLOutput from 'components/HTMLOutput';
import ProjectTitle from 'components/ProjectTitle';
import { WorkItemQuery } from 'generated/types';

import styles from './styles.module.css';

type WorkItemType = NonNullable<WorkItemQuery['work']>;

interface GalleryItem {
    order: number;
    orientation: 'landscape' | 'portrait';
    images: {
        id: string;
        image: {
            url: string;
        };
        orientation: 'landscape' | 'portrait';
    }[];
}

interface Props {
    work: WorkItemType;
    className?: string;
    elementRef?: LegacyRef<HTMLDivElement>;
}

function WorkDetail(props: Props) {
    const {
        work,
        className,
        elementRef,
    } = props;

    const galleryImages = useMemo(() => (
        work.images.map((workImage) => (
            isDefined(workImage.image)
                ? ({
                    id: workImage.id,
                    image: workImage.image,
                    orientation: workImage.image.width > workImage.image.height ? 'landscape' as const : 'portrait' as const,
                })
                : undefined
        ))
            .filter(isDefined)
            .reduce((acc, workImage) => {
                if (workImage.orientation === 'portrait') {
                    return [
                        ...acc,
                        {
                            order: acc.length + 1,
                            orientation: 'portrait' as const,
                            images: [workImage],
                        },
                    ];
                }
                if (workImage.orientation === 'landscape') {
                    const itemWithOnlyOneLandscape = acc.findIndex(
                        (item) => {
                            if (item.orientation === 'portrait') {
                                return false;
                            }
                            return item.images.length === 1;
                        },
                    );
                    if (itemWithOnlyOneLandscape === -1) {
                        return [
                            ...acc,
                            {
                                order: acc.length + 1,
                                orientation: 'landscape' as const,
                                images: [workImage],
                            },
                        ];
                    }
                    const newAcc = [...acc];
                    newAcc.splice(
                        itemWithOnlyOneLandscape,
                        1,
                        {
                            order: acc[itemWithOnlyOneLandscape].order,
                            orientation: 'landscape' as const,
                            images: [
                                acc[itemWithOnlyOneLandscape].images[0],
                                workImage,
                            ],
                        },
                    );
                    return newAcc;
                }
                return acc;
            }, [] as GalleryItem[])
    ), [work.images]);

    const [activeElementIndex, setActiveElementIndex] = useState(0);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageContainerParentRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (!imageContainerRef.current || !imageContainerParentRef.current) {
            return;
        }
        if (window.innerWidth > 900) {
            const parentHeight = imageContainerParentRef.current.offsetHeight;
            const scrollPosition = imageContainerRef.current.scrollTop;

            const elementPosition = Math.floor(scrollPosition / parentHeight);
            setActiveElementIndex(elementPosition);
        }
        if (window.innerWidth <= 900) {
            const parentWidth = imageContainerParentRef.current.offsetWidth;
            const scrollPosition = imageContainerRef.current.scrollLeft;

            const elementPosition = Math.floor(scrollPosition / parentWidth);
            setActiveElementIndex(elementPosition);
        }
    }, []);

    const handleSliderDotClick = useCallback((elementIndex: number) => {
        if (!imageContainerRef.current || !imageContainerParentRef.current) {
            return;
        }
        if (window.innerWidth > 900) {
            const parentHeight = imageContainerParentRef.current.offsetHeight;
            imageContainerRef.current.scrollTop = parentHeight * elementIndex;
        }
        if (window.innerWidth <= 900) {
            const parentWidth = imageContainerParentRef.current.offsetWidth;
            imageContainerRef.current.scrollLeft = parentWidth * elementIndex;
        }
    }, []);

    useEffect(() => {
        const parent = imageContainerRef.current;
        parent?.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            parent?.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div
            ref={elementRef}
            className={_cs(styles.page, className)}
        >
            <SideNavbar
                className={styles.navbar}
                lightMode
                hideGaathaLogo
            />
            <div className={styles.workTitleContainer}>
                <GaathaLogo
                    className={styles.logo}
                    variant="small"
                    lightMode
                />
                <ProjectTitle
                    title={work.title}
                    subtitle={work.subTitle}
                    size="medium"
                />
            </div>
            <div className={styles.content}>
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
                <div
                    className={styles.carouselWrapper}
                    ref={imageContainerParentRef}
                >
                    <div
                        className={styles.imageContainer}
                        ref={imageContainerRef}
                    >
                        {(galleryImages?.map((gallery) => (
                            <div
                                key={gallery.order}
                                className={_cs(
                                    styles.imageContent,
                                    gallery.orientation === 'landscape' && styles.landscape,
                                )}
                            >
                                {gallery.images.map((image) => (
                                    <div className={styles.imageWrapper}>
                                        <Image
                                            className={styles.image}
                                            src={image.image.url}
                                            alt="carousel image"
                                            fill
                                        />
                                    </div>
                                ))}
                            </div>
                        )))}
                    </div>
                    <div className={styles.sliderDots}>
                        {galleryImages?.map((image, index) => (
                            <button
                                key={image.order}
                                className={_cs(
                                    styles.sliderButton,
                                    activeElementIndex === index && styles.activeSliderButton,
                                )}
                                onClick={() => {
                                    handleSliderDotClick(index);
                                }}
                                type="button"
                            >
                                <IoEllipse />
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.descriptionContainer}>
                    <HTMLOutput
                        className={styles.description}
                        value={work.description}
                    />
                </div>
            </div>
            <div className={styles.rightPane}>
                <TextOutput
                    className={styles.info}
                    label="Area"
                    value={work.area}
                    multiline
                />
                <TextOutput
                    className={styles.info}
                    label="Status"
                    value={work.status}
                    multiline
                />
                <TextOutput
                    className={styles.info}
                    label="Duration"
                    value={work.duration}
                    multiline
                />
                <TextOutput
                    className={styles.info}
                    label="Location"
                    value={work.location}
                />
            </div>
        </div>
    );
}

export default WorkDetail;
