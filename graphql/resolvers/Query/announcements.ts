import db, {AnnouncementRow} from '../../db'

export default async function announcements(): Promise<AnnouncementRow[]> {
  return await db.getAll(
      'SELECT * FROM announcements ORDER BY date(created_ts) DESC',
      []
  )
}
