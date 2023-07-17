import React from 'react';
import { isDefined, _cs } from '@togglecorp/fujs';
import Image from 'next/legacy/image';
import {
    IoMailOutline,
    IoLogoLinkedin,
    IoLogoInstagram,
} from 'react-icons/io5';

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
                            placeholder="blur"
                            layout="fill"
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
                <div className={styles.socials}>
                    {people.email && (
                        <a
                            href={`mailto:${people.email}`}
                            rel="noreferrer"
                            target="_blank"
                            title="Gmail"
                        >
                            <IoMailOutline title={people.email} />
                        </a>
                    )}
                    {people.linkedinUrl && (
                        <a
                            href={people.linkedinUrl}
                            rel="noreferrer"
                            target="_blank"
                            title="LinkedIn"
                        >
                            <IoLogoLinkedin />
                        </a>
                    )}
                    {people.instagramUrl && (
                        <a
                            href={people.instagramUrl}
                            rel="noreferrer"
                            target="_blank"
                            title="Instagram"
                        >
                            <IoLogoInstagram />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PeopleItem;
