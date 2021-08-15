import db, {ProjectRow} from '../../db'

export default async function projects(): Promise<ProjectRow[]> {
  return await db.getAll(
      'SELECT * FROM projects ORDER BY date(created_ts) DESC',
      []
  )
}
