import React from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import Image from 'next/image';

import { PeopleQuery } from 'generated/types';

import styles from './styles.module.css';

type PeopleType = NonNullable<NonNullable<PeopleQuery['people']>[number]>;

interface Props {
    people: PeopleType;
    className?: string;
}

function PeopleItem(props: Props) {
    const {
        className,
        people,
    } = props;

    return (
        <div className={_cs(className, styles.item)}>
            <div className={styles.top}>
                <div className={styles.profilePicture}>
                    {isDefined(people.profilePicture)
                        && isDefined(people.profilePicture.url) && (
                        <Image
                            className={styles.picture}
                            src={people?.profilePicture?.url}
                            alt="profile picture"
                            fill
                        />
                    )}
                </div>
                <div className={styles.name}>
                    {people.name}
                </div>
            </div>
            <div className={styles.personalInfo}>
                <div className={styles.designation}>
                    {people?.designation}
                </div>
                <div>
                    {people?.qualification}
                </div>
                <div>
                    {people?.email}
                </div>
            </div>
        </div>
    );
}

export default PeopleItem;
