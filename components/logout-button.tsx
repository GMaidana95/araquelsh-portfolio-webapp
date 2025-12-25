"use client"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      // Al cerrar sesión, el middleware detectará que no hay usuario
      // y bloqueará el acceso, pero nosotros redirigimos manualmente al login
      router.push("/admin/login")
      router.refresh()
    } else {
      console.error("Error al cerrar sesión:", error.message)
    }
  }

  return (
    <Button 
      onClick={handleLogout}
      variant="outline"
      className="w-full justify-start gap-3 border-violet-500/30 hover:bg-violet-600/20 bg-transparent"
    >
      <LogOut className="w-5 h-5" />
      Cerrar Sesion
    </Button>
  )
}
