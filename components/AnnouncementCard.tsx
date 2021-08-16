import Card from './Card'

type Props = {
    announcement: Announcement;
    style: object;
}

type Announcement = {
    id: number;
    fellowship: string;
    title: string;
    body: string;
}

export default function AnnouncementCard({announcement, style}: Props) {
    return (
        <Card style={style}>
            <h2>{announcement.title}</h2>
            <p>{announcement.body}</p>
        </Card>
    )
}
