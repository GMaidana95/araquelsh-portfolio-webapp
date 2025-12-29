"use client"

import { useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export const useInactivityLogout = (timeoutMs: number = 15 * 60 * 1000) => { // 15 minutos por defecto
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }, [router])

  useEffect(() => {
    let timer: NodeJS.Timeout

    const resetTimer = () => {
      if (timer) clearTimeout(timer)
      timer = setTimeout(handleLogout, timeoutMs)
    }

    // Eventos que consideraremos como "actividad"
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']

    // Inicializamos el timer y los listeners
    resetTimer()
    events.forEach(event => document.addEventListener(event, resetTimer))

    return () => {
      // Limpieza al desmontar el componente
      if (timer) clearTimeout(timer)
      events.forEach(event => document.removeEventListener(event, resetTimer))
    }
  }, [handleLogout, timeoutMs])
}