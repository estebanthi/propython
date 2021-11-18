import Head from "next/head";
const axios = require("axios")


export default function App() {


  return (
      <>
        <Head>
          <title>ProPython</title>
        </Head>

          <body>
          </body>
      </>
  )
}

export async function getStaticProps () {

    return {
        props:{

        }
    }
}

