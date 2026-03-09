import { useState, useEffect } from 'react'
import { supabase } from './supabase'

export function useScores() {
  const [scores, setScores] = useState({ mode1: {}, mode2: {}, mode2holders: {}, mode2userscores: {}, mode3: {}, mode4: {}, mode5duels: [] })
  const [loading, setLoading] = useState(true)

  const fetchScores = async () => {
    const { data, error } = await supabase.from('scores').select('*')
    if (error) { console.error(error); return }

    const mode1 = {}, mode2 = {}, mode2holders = {}, mode2userscores = {}, mode3 = {}, mode4 = {}

    data.forEach(row => {
      if (row.mode === 'mode1') {
        if (!mode1[row.user_name] || row.value < mode1[row.user_name]) mode1[row.user_name] = row.value
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
        if (!mode3[row.user_name] || row.value > mode3[row.user_name]) mode3[row.user_name] = row.value
      }
      if (row.mode === 'mode4') {
        if (!mode4[row.user_name]) mode4[row.user_name] = {}
        if (!mode4[row.user_name][row.letter] || row.value < mode4[row.user_name][row.letter]) {
          mode4[row.user_name][row.letter] = row.value
        }
      }
    })

    const { data: duels } = await supabase.from('duels').select('*').order('created_at', { ascending: false })
    setScores({ mode1, mode2, mode2holders, mode2userscores, mode3, mode4, mode5duels: duels || [] })
    setLoading(false)
  }

  useEffect(() => {
    fetchScores()
    const sub = supabase.channel('scores-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'scores' }, fetchScores)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'duels' }, fetchScores)
      .subscribe()
    return () => supabase.removeChannel(sub)
  }, [])

  const updateMode1 = async (userName, timeSeconds) => {
    const current = scores.mode1[userName]
    if (current && timeSeconds >= current) return
    await supabase.from('scores').upsert({ user_name: userName, mode: 'mode1', letter: '', value: timeSeconds }, { onConflict: 'user_name,mode,letter' })
    fetchScores()
  }

  const updateMode2 = async (userName, letter, timeSeconds) => {
    const current = scores.mode2userscores?.[userName]?.[letter]
    if (current && timeSeconds >= current) return
    await supabase.from('scores').upsert({ user_name: userName, mode: 'mode2', letter: letter, value: timeSeconds }, { onConflict: 'user_name,mode,letter' })
    fetchScores()
  }

  const updateMode3 = async (userName, streak) => {
    const current = scores.mode3[userName]
    if (current && streak <= current) return
    await supabase.from('scores').upsert({ user_name: userName, mode: 'mode3', letter: '', value: streak }, { onConflict: 'user_name,mode,letter' })
    fetchScores()
  }

  const updateMode4 = async (userName, continent, timeSeconds) => {
    const current = scores.mode4?.[userName]?.[continent]
    if (current && timeSeconds >= current) return
    await supabase.from('scores').upsert({ user_name: userName, mode: 'mode4', letter: continent, value: timeSeconds }, { onConflict: 'user_name,mode,letter' })
    fetchScores()
  }

  const updateMode5 = async (action, payload) => {
    if (action === 'send') {
      await supabase.from('duels').insert({ challenger: payload.challenger, target: payload.target, country: payload.country, country_code: payload.country_code, status: 'pending' })
    }
    if (action === 'respond') {
      await supabase.from('duels').update({ status: payload.success ? 'pending_counter' : 'target_lost', target_result: payload.success ? 'survived' : 'failed' }).eq('id', payload.id)
    }
    if (action === 'counter') {
      await supabase.from('duels').update({ counter_country: payload.country, counter_code: payload.country_code, status: 'pending_challenger' }).eq('id', payload.id)
    }
    if (action === 'resolve') {
      await supabase.from('duels').update({ status: payload.success ? 'pending' : 'challenger_lost', challenger_result: payload.success ? 'survived' : 'failed' }).eq('id', payload.id)
      if (payload.success && payload.newCountry) {
        await supabase.from('duels').update({ country: payload.newCountry, country_code: payload.newCode, counter_country: null, counter_code: null, status: 'pending' }).eq('id', payload.id)
      }
    }
    fetchScores()
  }

  return { scores, loading, updateMode1, updateMode2, updateMode3, updateMode4, updateMode5 }
}
