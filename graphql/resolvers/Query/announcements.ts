import db, {AnnouncementRow} from '../../db'

type Args = {
  fellowship: string;
}

export default async function announcements(parent: unknown, {fellowship}: Args): Promise<AnnouncementRow[]> {
  return await db.getAll(
      'SELECT * FROM announcements WHERE fellowship = ? OR fellowship = ? ORDER BY date(created_ts) DESC',
      ['all', fellowship]
  )
}
