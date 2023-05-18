import 'styles/globals.css';
import 'styles/variables.css';

import type { AppProps } from 'next/app';

function MyApp(props: AppProps) {
    const {
        Component,
        pageProps,
    } = props;

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Component {...pageProps} />
    );
}

export default MyApp;
