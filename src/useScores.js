import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export function useScores() {
  const [scores, setScores] = useState({ mode1: {}, mode2: {}, mode2holders: {}, mode2userscores: {}, mode3: {} })
  const [loading, setLoading] = useState(true)

  const fetchScores = async () => {
    const { data, error } = await supabase.from('scores').select('*')
    if (error) { console.error(error); return }

    const mode1 = {}, mode2 = {}, mode2holders = {}, mode2userscores = {}, mode3 = {}

    data.forEach(row => {
      if (row.mode === 'mode1') {
        if (!mode1[row.user_name] || row.value < mode1[row.user_name]) {
          mode1[row.user_name] = row.value
        }
      }
      if (row.mode === 'mode2') {
        if (!mode2userscores[row.user_name]) mode2userscores[row.user_name] = {}
        mode2userscores[row.user_name][row.letter] = row.value
        if (!mode2[row.letter] || row.value < mode2[row.letter]) {
          mode2[row.letter] = row.value
          mode2holders[row.letter] = row.user_name
        }
      }
      if (row.mode === 'mode3') {
        if (!mode3[row.user_name] || row.value > mode3[row.user_name]) {
          mode3[row.user_name] = row.value
        }
      }
    })

    setScores({ mode1, mode2, mode2holders, mode2userscores, mode3 })
    setLoading(false)
  }

  useEffect(() => {
    fetchScores()
    const sub = supabase.channel('scores-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'scores' }, fetchScores)
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  const updateMode1 = async (userName, timeSeconds) => {
    const current = scores.mode1[userName]
    if (current && timeSeconds >= current) return
    await supabase.from('scores').upsert(
      { user_name: userName, mode: 'mode1', letter: '', value: timeSeconds },
      { onConflict: 'user_name,mode,letter' }
    )
    fetchScores()
  }

  const updateMode2 = async (userName, letter, timeSeconds) => {
    const current = scores.mode2userscores?.[userName]?.[letter]
    if (current && timeSeconds >= current) return
    await supabase.from('scores').upsert(
      { user_name: userName, mode: 'mode2', letter: letter, value: timeSeconds },
      { onConflict: 'user_name,mode,letter' }
    )
    fetchScores()
  }

  const updateMode3 = async (userName, streak) => {
    const current = scores.mode3[userName]
    if (current && streak <= current) return
    await supabase.from('scores').upsert(
      { user_name: userName, mode: 'mode3', letter: '', value: streak },
      { onConflict: 'user_name,mode,letter' }
    )
    fetchScores()
  }

  return { scores, loading, updateMode1, updateMode2, updateMode3 }
}
