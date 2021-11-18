import Head from 'next/head'
import clientPromise from '../../lib/mongodb'
import {useEffect, useState} from "react";


export default function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const data = fetch("http://jsonplaceholder.typicode.com/posts?_limit=4")
            .then(r => r.json())
            .then(setPosts)
    }, [])

  return (
      <>
        <Head>
          <title>ProPython</title>
        </Head>
        <ul>
            {posts.map(post => <li>
                <h3>{post.title}</h3>
            </li>)}
        </ul>
      </>
  )
}



export async function getServerSideProps(context) {
  const client = await clientPromise

  // client.db() will be the default database passed in the MONGODB_URI
  // You can change the database by calling the client.db() function and specifying a database like:
  // const db = client.db("myDatabase");
  // Then you can execute queries against your database like so:
  // db.find({}) or any of the MongoDB Node Driver commands


  return {
    props: {  },
  }
}