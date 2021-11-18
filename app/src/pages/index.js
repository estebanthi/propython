import Head from "next/head";
import DatabaseQueries from "../components/DatabaseQueries";


export default function App() {


  return (
      <>
        <Head>
          <title>ProPython</title>
        </Head>

          <body>
          <DatabaseQueries />
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

