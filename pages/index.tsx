import React from 'react';
import { _cs } from '@togglecorp/fujs';
import { GetStaticProps } from 'next';

import Page from 'components/Page';
import Link from 'next/link';
import Image from 'next/image';
import { gql } from 'graphql-request';

import { gaathaRequest } from 'utils/common';
// NOTE: This import will be fixed when generated folder is moved inside src folder
import { WorksQuery } from 'generated/types';
import styles from './styles.module.css';

interface Props {
    className?: string;
    works?: WorksQuery;
}

function Home(props: Props) {
    const {
        className,
        works,
    } = props;

    // eslint-disable-next-line no-console
    console.warn(works);

    return (
        <Page
            pageTitle="Home"
            className={_cs(styles.home, className)}
            contentClassName={styles.mainContent}
        >
            <Image
                className={styles.logo}
                src="logo.jpg"
                alt="Gaatha"
                width={700}
                height={500}
            />
            <div className={styles.routes}>
                <Link
                    href="/works"
                    passHref
                >
                    Works
                </Link>
                <Link
                    href="/studio"
                    passHref
                >
                    Studio
                </Link>
                <Link
                    href="/contact"
                    passHref
                >
                    Contact
                </Link>
                <Link
                    href="/search"
                    passHref
                >
                    Search
                </Link>
            </div>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const query = gql`
        query Works{
            works {
                id
                title
                duration
                description
            }
        }
    `;

    const value = await gaathaRequest(query);

    return ({
        props: {
            className: 'home',
            works: value.works,
        },
    });
};

export default Home;
