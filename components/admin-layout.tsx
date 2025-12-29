"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Plus, Edit, Menu, X, Home, Calendar } from "lucide-react"
import LogoutButton from "@/components/logout-button"
import { useInactivityLogout } from "@/hooks/use-inactivity-logout"
interface AdminLayoutProps {
  children: ReactNode
}

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Nuevo Cosplay", href: "/admin/new-cosplay", icon: Plus },
  { name: "Editar Portafolio", href: "/admin/edit-portfolio", icon: Edit },
  { name: "Participaciones", href: "/admin/participaciones", icon: Calendar }
]

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  useInactivityLogout(15 * 60 * 1000)

  return (
    <div className="min-h-screen bg-black">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(160, 80, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(160, 80, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-screen">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 glass-card border-r border-violet-500/30">
          <div className="flex items-center gap-3 p-6 border-b border-violet-500/30">
            <div className="w-10 h-10 rounded-lg bg-violet-600/20 flex items-center justify-center">
              <span className="text-2xl">🎭</span>
            </div>
            <div>
              <h2 className="text-lg font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
                Araquelsh
              </h2>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-3 font-[family-name:var(--font-orbitron)]",
                      isActive
                        ? "bg-violet-600/20 text-violet-300 neon-border-subtle"
                        : "text-muted-foreground hover:text-violet-300 hover:bg-violet-600/10",
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-violet-500/30 space-y-2">
            <Link href="/">
              <Button
                variant="outline"
                className="w-full justify-start gap-3 border-violet-500/30 hover:bg-violet-600/20 bg-transparent"
              >
                <Home className="w-5 h-5" />
                Volver al Sitio
              </Button>
            </Link>

            <div>
              <LogoutButton />
            </div>
          </div>
        </aside>

        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/80" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 bottom-0 w-64 glass-card border-r border-violet-500/30">
              <div className="flex items-center justify-between p-6 border-b border-violet-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-600/20 flex items-center justify-center">
                    <span className="text-2xl">🎭</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
                      Araquelsh
                    </h2>
                    <p className="text-xs text-muted-foreground">Admin Panel</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <nav className="flex-1 p-4 space-y-2">
                {navigation.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.name} href={item.href} onClick={() => setSidebarOpen(false)}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start gap-3 font-[family-name:var(--font-orbitron)]",
                          isActive
                            ? "bg-violet-600/20 text-violet-300 neon-border-subtle"
                            : "text-muted-foreground hover:text-violet-300 hover:bg-violet-600/10",
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </Button>
                    </Link>
                  )
                })}
              </nav>

              <div className="p-4 border-t border-violet-500/30 space-y-2">
                <Link href="/">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 border-violet-500/30 hover:bg-violet-600/20 bg-transparent"
                  >
                    <Home className="w-5 h-5" />
                    Volver al Sitio
                  </Button>
                </Link>

                <div>
                  <LogoutButton/>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-violet-500/30 glass-card">
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-lg font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
              Araquelsh Admin
            </h2>
            <div className="w-10" />
          </div>

          <div className="p-6 lg:p-12">{children}</div>
        </main>
      </div>
    </div>
  )
}
