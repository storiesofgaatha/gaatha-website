import {
    Html,
    Head,
    Main,
    NextScript,
} from 'next/document';

function Document() {
    return (
        <Html lang="en">
            <Head>
                <link
                    rel="shortcut icon"
                    href="/favicon.ico"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}

export default Document;
