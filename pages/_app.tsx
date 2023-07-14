import { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';
import { useRouter } from 'next/router';
import 'styles/globals.css';
import 'styles/variables.css';

import type { AppProps } from 'next/app';
// Check that PostHog is client-side (used to handle Next.js SSR)
if (
    typeof window !== 'undefined'
    && process.env.NEXT_PUBLIC_POSTHOG_KEY
    && process.env.NEXT_PUBLIC_POSTHOG_HOST_URL
) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST_URL,
        persistence: 'memory',
        // Enable debug mode in development
        loaded: (loadedPosthog) => {
            if (process.env.NODE_ENV === 'development') {
                loadedPosthog.debug();
            }
        },
    });
}

function MyApp(props: AppProps) {
    const {
        Component,
        pageProps,
    } = props;

    const router = useRouter();

    useEffect(() => {
        // Track page views
        const handleRouteChange = () => posthog?.capture('$pageview');
        router.events.on('routeChangeComplete', handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router]);

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
        <PostHogProvider client={posthog}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
        </PostHogProvider>
    );
}

export default MyApp;
