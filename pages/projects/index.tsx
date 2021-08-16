import {useRouter} from 'next/router'
import {useQuery, gql} from '@apollo/client'
import Layout from 'components/Layout'
import ProjectCard from 'components/ProjectCard'
import Head from "next/head";
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

type QueryData = {
    projects: [Project];
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

export default function ProjectPage() {
    const {query} = useRouter()

    const {data, error, loading} = useQuery<QueryData, {}>(
        PROJECTS_QUERY,
        {}
    )
    const projects: Project[] = data?.projects || [];

    if (!projects || loading || error) {
        return null
    }

    return (
        <Layout>
            <Head>
                <title>Projects @On Deck</title>
            </Head>
            <h1>Projects</h1>
            {projects.map((project: Project) => (
                <ProjectCard key={project.id} project={project} style={style} />
            ))}
        </Layout>
    )
}

const style = {
    marginTop: '1em'
}
