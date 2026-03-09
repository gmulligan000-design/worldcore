import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'

// scores shape: { mode1: {Mi: secs, Gary: secs}, mode2: {Mi: {A: secs}}, mode3: {Mi: streak} }
export function useScores() {
  const [scores, setScores] = useState({ mode1: {}, mode2: {}, mode3: {} })
  const [loading, setLoading] = useState(true)

  const fetchScores = useCallback(async () => {
    const { data, error } = await supabase.from('scores').select('*')
    if (error) { console.error(error); return }
    const s = { mode1: {}, mode2: {}, mode3: {} }
    data.forEach(row => {
      if (row.mode === 'mode1') s.mode1[row.user_name] = row.value
      else if (row.mode === 'mode2' && row.letter) {
        if (!s.mode2[row.user_name]) s.mode2[row.user_name] = {}
        s.mode2[row.user_name][row.letter] = row.value
      } else if (row.mode === 'mode3') s.mode3[row.user_name] = row.value
    })
    setScores(s)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchScores()
    // Real-time subscription
    const channel = supabase
      .channel('scores-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'scores' }, () => {
        fetchScores()
      })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }, [fetchScores])

  const updateMode1 = useCallback(async (user, timeSeconds) => {
    const current = scores.mode1[user]
    if (current && current <= timeSeconds) return // not a new record
    await supabase.from('scores').upsert(
      { user_name: user, mode: 'mode1', letter: null, value: timeSeconds, updated_at: new Date().toISOString() },
      { onConflict: 'user_name,mode,letter' }
    )
  }, [scores])

  const updateMode2 = useCallback(async (user, letter, timeSeconds) => {
    const current = (scores.mode2[user] || {})[letter]
    if (current && current <= timeSeconds) return
    await supabase.from('scores').upsert(
      { user_name: user, mode: 'mode2', letter, value: timeSeconds, updated_at: new Date().toISOString() },
      { onConflict: 'user_name,mode,letter' }
    )
  }, [scores])

  const updateMode3 = useCallback(async (user, streak) => {
    const current = scores.mode3[user] || 0
    if (streak <= current) return
    await supabase.from('scores').upsert(
      { user_name: user, mode: 'mode3', letter: null, value: streak, updated_at: new Date().toISOString() },
      { onConflict: 'user_name,mode,letter' }
    )
  }, [scores])

  return { scores, loading, updateMode1, updateMode2, updateMode3 }
}
