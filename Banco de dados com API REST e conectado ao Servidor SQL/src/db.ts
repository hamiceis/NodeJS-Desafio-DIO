import { Pool } from 'pg'

const connectionString = 'postgres://qpmxtxil:Iwsu5AO7S3XjZ-Tb6ttUvVRFXVllSE6-@kesavan.db.elephantsql.com/qpmxtxil' 

const db = new Pool({ connectionString })  

export default db;