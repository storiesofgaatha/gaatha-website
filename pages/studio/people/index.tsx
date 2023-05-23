import React from 'react';
import { GetStaticProps } from 'next';
import { gql } from 'graphql-request';

import PageWithSideBar from 'components/PageWithSideBar';
import PeopleItem from 'components/PeopleItem';
import {
    gaathaRequest,
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

    // const peopleBuckets = bucketify(3, people);

    return (
        <PageWithSideBar
            pageTitle="People"
            contentClassName={styles.page}
            navbar="studio"
            lightMode
        >
            <div className={styles.people}>
                {people.map((person) => (
                    <PeopleItem
                        className={styles.person}
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
