import db, {AnnouncementRow} from '../../db'

type Args = {
  fellowship: string;
  offset: number;
  limit: number;
}

export default async function announcements(parent: unknown, {fellowship, offset, limit}: Args): Promise<AnnouncementRow[]> {
  return await db.getAll(
      'SELECT * FROM announcements WHERE fellowship = ? OR fellowship = ? ORDER BY date(created_ts) DESC LIMIT ? OFFSET ?',
      ['all', fellowship, limit, offset]
  )
}
