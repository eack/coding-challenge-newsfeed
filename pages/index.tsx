import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import {useState} from "react"
import Card from "../components/Card";
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import AnnouncementCard from "../components/AnnouncementCard";


const ANNOUNCEMENTS_QUERY = gql`
  query announcements($fellowship: String!) {
    announcements(fellowship: $fellowship) {
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

    const queryAnnouncements = useQuery<QueryAnnouncementsData, QueryAnnouncementsVars>(
        ANNOUNCEMENTS_QUERY,
        {
            variables: {fellowship: value},
        }
    )
    const announcements: Announcement[] = queryAnnouncements.data?.announcements || [];


    function handleSetValue(value: string) {
        setValue(value);
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
            <h1 style={{marginTop: "1em"}}>Announcements (for {value}s)</h1>
            {announcements.map((announcement: Announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} style={announcementStyle} />
            ))}
        </Layout>
    )
}

const Hr = styled.div`
  margin: 1em 0;
  border: 0;
  border-top: 1px solid #cecece;
`

const announcementStyle = {
    margin: "1em"
}