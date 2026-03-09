import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yoghkjfpeqazmonwhnrn.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlvZ2hramZwZXFhem1vbndobnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNjU2MTcsImV4cCI6MjA4ODY0MTYxN30.AsQr7IgB295br350fR6nROAGqOJCeniVqfvyuj4Wmog'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
