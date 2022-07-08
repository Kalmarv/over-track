import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    }
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          <title>OverTrack</title>
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
