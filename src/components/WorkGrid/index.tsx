import {
    useState,
    useRef,
    useCallback,
    useEffect,
} from 'react';
import { _cs, isDefined } from '@togglecorp/fujs';
import Link from 'next/link';
import Image from 'next/legacy/image';
import {
    AiFillCaretUp,
    AiFillCaretDown,
} from 'react-icons/ai';

import {
    bucketify,
} from 'utils/common';
import { WorkListQuery } from 'generated/types';
import ProjectTitle from 'components/ProjectTitle';

import styles from './styles.module.css';

const BUCKET_SIZE = 12;

export type WorkItemType = NonNullable<NonNullable<WorkListQuery['works']>[number]>;

interface Props {
    works: WorkItemType[];
}

function WorkGrid(props: Props) {
    const {
        works,
    } = props;

    const workBuckets = bucketify(BUCKET_SIZE, works);

    const [activeElementIndex, setActiveElementIndex] = useState(0);
    const childRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        if (!childRef.current || !parentRef.current) {
            return;
        }
        const parentHeight = parentRef.current.offsetHeight;
        const scrollPosition = childRef.current.scrollTop;

        const elementPosition = Math.floor(scrollPosition / parentHeight);
        setActiveElementIndex(elementPosition);
    }, []);

    const handlePreviousClick = useCallback(() => {
        if (!parentRef.current || !childRef.current) {
            return;
        }
        const parentHeight = parentRef.current.offsetHeight;
        childRef.current.scrollTop = parentHeight * (activeElementIndex - 1);
        setActiveElementIndex(activeElementIndex - 1);
    }, [activeElementIndex]);

    const handleNextClick = useCallback(() => {
        if (!parentRef.current || !childRef.current) {
            return;
        }
        const parentHeight = parentRef.current.offsetHeight;
        childRef.current.scrollTop = parentHeight * (activeElementIndex + 1);
        setActiveElementIndex(activeElementIndex + 1);
    }, [activeElementIndex]);

    useEffect(() => {
        const child = childRef.current;
        child?.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            child?.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <div
                className={styles.buckets}
                ref={parentRef}
            >
                <div
                    className={styles.gridsContainer}
                    ref={childRef}
                >
                    {workBuckets.map((bucket, index) => (
                        <div
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className={styles.grid}
                        >
                            {bucket.map((work) => (
                                isDefined(work.coverImage) && isDefined(work.coverImage.url) && (
                                    <Link
                                        key={work.id}
                                        href={`/work/${work.id}`}
                                        className={styles.imageContainer}
                                    >
                                        <Image
                                            className={styles.coverImage}
                                            src={work.coverImage.url}
                                            alt="cover image"
                                            placeholder="blur"
                                            layout="fill"
                                        />
                                        <ProjectTitle
                                            className={styles.title}
                                            title={work.title}
                                            subtitle={work.subTitle}
                                        />
                                    </Link>
                                )
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    className={_cs(
                        styles.button,
                        (activeElementIndex - 1) < 0 && styles.disabled,
                    )}
                    onClick={handlePreviousClick}
                    type="button"
                >
                    <AiFillCaretUp />
                </button>
                <button
                    className={_cs(
                        styles.button,
                        (activeElementIndex + 1) === workBuckets?.length && styles.disabled,
                    )}
                    onClick={handleNextClick}
                    type="button"
                >
                    <AiFillCaretDown />
                </button>
            </div>
        </>
    );
}

export default WorkGrid;
