import React from 'react';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import Page from 'components/Page';

import flowersData from 'data/flowers.json';

import styles from './styles.module.css';

interface Flower {
    id: string;
    name: string;
    description: string;
    image: string;
}

interface Props {
    flowers: Flower[];
}

function Home(props: Props) {
    const {
        flowers,
    } = props;

    return (
        <Page
            pageTitle="Home"
            className={styles.home}
            contentClassName={styles.mainContent}
        >
            {flowers.map((flower) => (
                <div
                    key={flower.id}
                    className={styles.card}
                >
                    <div className={styles.imageContainer}>
                        <Image
                            className={styles.flowerImage}
                            alt={flower.name}
                            src={flower.image}
                            fill
                        />
                    </div>
                    <h3>
                        {flower.name}
                    </h3>
                    <div className={styles.description}>
                        {flower.description}
                    </div>
                </div>
            ))}
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const flowers = flowersData as Flower[];
    return {
        props: {
            flowers,
        },
    };
};

export default Home;
