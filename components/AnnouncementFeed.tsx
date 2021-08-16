import React from 'react';
import AnnouncementCard from "./AnnouncementCard";

type Props = {
    value: string;
    announcements: Announcement[];
    onLoadMore: any;
}

type Announcement = {
    id: number;
    fellowship: string;
    title: string;
    body: string;
}

const handleScroll = ({currentTarget}: any, onLoadMore: any) => {
    console.log('a')
    if (
        currentTarget.scrollTop + currentTarget.clientHeight >=
        currentTarget.scrollHeight
    ) {
        onLoadMore();
    }
};

const AnnouncementFeed = ({value, announcements, onLoadMore}: Props) => (
    <div onScroll={e => handleScroll(e, onLoadMore)}>
        <h1 style={{marginTop: "1em"}}>Announcements (for {value}s)</h1>

        {announcements.map((announcement: Announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} style={announcementStyle}/>
        ))}
    </div>
)

export default AnnouncementFeed;

const announcementStyle = {
    margin: "1em"
}
