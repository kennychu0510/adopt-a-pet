import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'
import { ENV } from '../../env'

export default createClient<Database>(
  ENV.NEXT_PUBLIC_SUPABASE_URL,
  ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY
)