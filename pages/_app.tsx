import { useEffect } from 'react';
import 'styles/globals.css';
import 'styles/variables.css';

import type { AppProps } from 'next/app';

function MyApp(props: AppProps) {
    const {
        Component,
        pageProps,
    } = props;

    useEffect(() => {
        const documentHeight = () => {
            const doc = document.documentElement;
            doc.style.setProperty('--doc-height', `${window.innerHeight}px`);
        };
        window.addEventListener('resize', documentHeight);
        documentHeight();
        return () => window.removeEventListener('resize', documentHeight);
    }, []);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...pageProps} />
    );
}

export default MyApp;
