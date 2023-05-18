import React from 'react';
import { GetStaticProps } from 'next';
import { gql } from 'graphql-request';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/mousewheel';
import {
    Mousewheel,
} from 'swiper';

import PageWithSideBar from 'components/PageWithSideBar';
import PeopleItem from 'components/PeopleItem';
import {
    gaathaRequest,
    bucketify,
} from 'utils/common';
import { PeopleQuery } from 'generated/types';

import styles from './styles.module.css';

type PeopleType = NonNullable<NonNullable<PeopleQuery['people']>[number]>;

interface Props {
    people: PeopleType[];
}

function People(props: Props) {
    const {
        people,
    } = props;

    const peopleBuckets = bucketify(3, people);

    return (
        <PageWithSideBar
            pageTitle="People"
            contentClassName={styles.page}
            navbar="studio"
            lightMode
        >
            <div className={styles.people}>
                <Swiper
                    className={styles.listingContainer}
                    modules={[Mousewheel]}
                    mousewheel
                >
                    {peopleBuckets.map((bucket, index) => (
                        <SwiperSlide
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            className={styles.slide}
                        >
                            {bucket.map((person) => (
                                <PeopleItem
                                    people={person}
                                />
                            ))}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className={styles.responsiveContent}>
                {people.map((person) => (
                    <PeopleItem
                        people={person}
                    />
                ))}
            </div>
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const peopleList = gql`
        query People {
            people {
                id
                name
                profilePicture {
                    name
                    url
                }
                artWork {
                    name
                    url
                }
                email
                designation
                qualification
                isCurrentEmployee
                instagramUrl
                linkedinUrl
            }
        }
    `;

    const value = await gaathaRequest(peopleList);

    return ({
        props: {
            people: value.people,
        },
    });
};

export default People;
