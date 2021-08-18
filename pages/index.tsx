import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import {useState} from "react"
import Card from "../components/Card";
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import AnnouncementFeed from "../components/AnnouncementFeed";


const ANNOUNCEMENTS_QUERY = gql`
  query announcements($fellowship: String!, $offset: Int, $limit: Int) {
    announcements(fellowship: $fellowship, offset: $offset, limit: $limit) {
      id
      fellowship
      title
      body
    }
  }
`

type QueryAnnouncementsData = {
    announcements: [Announcement];
}

type QueryAnnouncementsVars = {
    fellowship: string;
    offset: number;
    limit: number;
}

type Announcement = {
    id: number;
    fellowship: string;
    title: string;
    body: string;
}

export default function Home() {
    const [fellowships] = useState([
        {label: "Founder", value: "founder"},
        {label: "Angel", value: "angel"},
        {label: "Writer", value: "writer"}
    ]);
    const [value, setValue] = useState<string>("founder");
    const [endReached, setEndReached] = useState<boolean>(false)

    const {data, fetchMore} = useQuery<QueryAnnouncementsData, QueryAnnouncementsVars>(
        ANNOUNCEMENTS_QUERY,
        {
            variables: {fellowship: value, offset: 0, limit: 1},
            fetchPolicy: "cache-and-network"
        }
    )

    function handleSetValue(value: string) {
        setValue(value);
        setEndReached(false);
    }

    return (
        <Layout>
            <Head>
                <title>On Deck Newsfeed</title>
            </Head>
            {/*
            <h1>Hello there!</h1>
            <p>Your future newsfeed goes to this page. Or not, you decide 🤷</p>
            <span>Check out these pages:</span>
            <ul>
                <li>Project <Link href="/projects/10">Blue Onion Labs</Link></li>
                <li>User <Link href="/users/11">Cai Burris</Link></li>
            </ul>*/}

            <Card>
                <h1>Newsfeed by On Deck</h1>
                <label htmlFor="fellowship">Choose your role: </label>
                <select id="fellowship" value={value} onChange={e => handleSetValue(e.currentTarget.value)}>
                    {fellowships.map(({label, value}) => (
                        <option key={value} value={value}>{label}</option>
                    ))}
                </select>
                {['founder', 'angel'].includes(value) &&
                <div>
                    <Hr/>
                    Check out the <Link href="/projects">projects</Link>!
                </div>}
            </Card>

            <AnnouncementFeed
                value={value}
                announcements={data?.announcements || []}
                endReached={endReached}
                onLoadMore={() =>
                    fetchMore({
                        variables: {
                            offset: data?.announcements.length
                        },
                        updateQuery: (prev: any, {fetchMoreResult}: any) => {
                            if (!fetchMoreResult || fetchMoreResult.announcements.length === 0) {
                                setEndReached(true)
                                return prev;
                            }
                            return Object.assign({}, prev, {
                                announcements: [...prev.announcements, ...fetchMoreResult.announcements]
                            });
                        }
                    })
                }
            />
        </Layout>
    )
}

const Hr = styled.div`
  margin: 1em 0;
  border: 0;
  border-top: 1px solid #cecece;
`