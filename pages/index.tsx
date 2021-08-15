import Head from 'next/head'
import Link from 'next/link'
import Layout from 'components/Layout'
import {useState} from "react"
import Card from "../components/Card";
import {gql, useQuery} from "@apollo/client";
import ProjectCard from "../components/ProjectCard";
import styled from "styled-components";

const PROJECTS_QUERY = gql`
  query projects {
    projects {
      id
      name
      description
      icon_url
      users {
        id
        name
        avatar_url
      }
    }
  }
`

const ANNOUNCEMENTS_QUERY = gql`
  query announcements {
    announcements {
      id
      fellowship
      title
      body
    }
  }
`

type QueryProjectData = {
    projects: [Project];
}

type QueryAnnouncementsData = {
    announcements: [Announcement];
}

type Project = {
    id: number;
    name: string;
    description: string;
    icon_url: string;
    users: User[];
}

type User = {
    id: number;
    name: string;
    avatar_url: string;
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

    const {data, error, loading} = useQuery<QueryProjectData, {}>(
        PROJECTS_QUERY,
        {}
    )
    const projects: Project[] = data?.projects || [];

    const queryAnnouncements = useQuery<QueryAnnouncementsData, {}>(
        ANNOUNCEMENTS_QUERY,
        {}
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
            </Card>
            <Columns>
                {['founder', 'angel'].includes(value) ?
                    <ColumnLeft>
                        <Card style={{marginTop: "2em"}}>
                            <h1>Projects (for {value}s)</h1>

                            {loading ? '' :
                                projects.map((project: Project) => (
                                    <ProjectCard key={project.id} project={project}/>
                                ))}
                        </Card>
                    </ColumnLeft>
                    : ''}
                <ColumnRight>
                    <Card style={{marginTop: "2em"}}>
                        <h1>Announcements (for {value}s)</h1>
                        {announcements.length}
                    </Card>
                </ColumnRight>
            </Columns>
        </Layout>
    )
}

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`
const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`