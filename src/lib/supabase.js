import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function getArticleByKeyword(keyword) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('keyword', keyword.trim())
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching article:', error)
    return null
  }
}