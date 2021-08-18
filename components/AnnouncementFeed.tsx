import React from 'react';
import AnnouncementCard from "./AnnouncementCard";
import Button from "./Button";

type Props = {
    value: string;
    announcements: Announcement[];
    endReached: boolean;
    onLoadMore: any;
}

type Announcement = {
    id: number;
    fellowship: string;
    title: string;
    body: string;
}

const handleScroll = ({currentTarget}: any, onLoadMore: any) => {
    if (
        currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight
    ) {
        onLoadMore();
    }
};

const AnnouncementFeed = ({value, announcements, onLoadMore, endReached}: Props) => (
    <div onScroll={e => handleScroll(e, onLoadMore)} style={{overflow: 'auto'}}>
        <h1 style={{marginTop: "1em"}}>Announcements (for {value}s)</h1>

        {announcements.map((announcement: Announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} style={announcementStyle}/>
        ))}

        {!endReached && (
            <div style={{textAlign: 'center', padding: '1em'}}>
                <Button onClick={e => handleScroll(e, onLoadMore)}>Load More</Button>
            </div>
        )}
    </div>
)

export default AnnouncementFeed;

const announcementStyle = {
    margin: "1em"
}
