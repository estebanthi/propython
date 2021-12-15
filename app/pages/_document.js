import Document, { Html, Head, Main, NextScript } from 'next/document'

import * as snippet from '@segment/snippet';

class MyDocument extends Document {


    renderSnippet() {
        const opts = {
            apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY,
            // note: the page option only covers SSR tracking.
            // Page.js is used to track other events using `window.analytics.page()`
            page: true,
        }

        if (process.env.NODE_ENV === 'development') {
            return snippet.max(opts)
        }

        return snippet.min(opts)
    }

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <script dangerouslySetInnerHTML={{__html: this.renderSnippet()}} />
                </Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument