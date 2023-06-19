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
    const founders = people.filter(
        (person) => person.isFounder === true,
    );
    const currentMembers = people.filter(
        (person) => person.isFounder === false
        && person.isCurrentEmployee === true,
    );
    const pastMembers = people.filter(
        (person) => person.isFounder === false
        && person.isCurrentEmployee === false,
    );

    return (
        <PageWithSideBar
            pageTitle="People"
            contentClassName={styles.page}
            navbar="studio"
            lightMode
        >
            <div className={styles.people}>
                <div className={styles.founders}>
                    <span>Founding members</span>
                    {founders.map((person) => (
                        <PeopleItem
                            className={styles.person}
                            people={person}
                        />
                    ))}
                </div>
                <div className={styles.members}>
                    <span>Team members</span>
                    {currentMembers.length > 0 && currentMembers.map((person) => (
                        <PeopleItem
                            className={styles.person}
                            people={person}
                        />
                    ))}
                    {pastMembers.length > 0 && (
                        <>
                            <span>Past members</span>
                            <div className={styles.pastMembers}>
                                {pastMembers.map((person) => (
                                    person.name
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </PageWithSideBar>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const peopleList = gql`
        query People {
            people (order: {
                order: ASC,
            }) {
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
                isFounder
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
