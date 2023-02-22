import React from 'react';
import { isDefined } from '@togglecorp/fujs';
import { GetStaticProps } from 'next';
import { gql } from 'graphql-request';
import Image from 'next/image';

import PageWithSideBar from 'components/PageWithSideBar';
import PeopleItem from 'components/PeopleItem';
import { gaathaRequest } from 'utils/common';
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

    return (
        <PageWithSideBar
            pageTitle="People"
            contentClassName={styles.page}
            navbar="studio"
            lightMode
        >
            <div className={styles.people}>
                <div className={styles.listingContainer}>
                    {people?.map((item) => (
                        <PeopleItem
                            people={item}
                        />
                    ))}
                </div>
                <div className={styles.artworkContainer}>
                    {people?.map((item) => (
                        isDefined(item.artWork) && (
                            <div className={styles.artworkWrapper}>
                                <Image
                                    className={styles.artwork}
                                    src={item.artWork.url}
                                    alt="artwork"
                                    layout="fill"
                                />
                            </div>
                        )
                    ))}
                </div>
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
