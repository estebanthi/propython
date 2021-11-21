import Head from "next/head";
import {Rectangle} from "react-shapes/lib/Shapes";
import Home from "../components/Home";
import DatabaseQueries from "../components/DatabaseQueries";


export default function HomePage() {


  return (
      <>
        <Head>
          <title>ProPython</title>
        </Head>

        <Home />
          </>
  )
}

export async function getStaticProps () {

    return {
        props:{

        }
    }
}

