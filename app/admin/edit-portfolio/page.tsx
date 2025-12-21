import AdminLayout from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"

// Mock data - replace with actual data fetching
const cosplays = [
  {
    id: 1,
    character: "2B",
    series: "NieR: Automata",
    category: "Videojuegos",
    orderIndex: 1,
    mediaCount: 4,
  },
  {
    id: 2,
    character: "Kuromi",
    series: "Sanrio",
    category: "Anime",
    orderIndex: 2,
    mediaCount: 3,
  },
  {
    id: 3,
    character: "Jinx",
    series: "League of Legends / Arcane",
    category: "Videojuegos",
    orderIndex: 3,
    mediaCount: 5,
  },
]

export default function EditPortfolioPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
              Editar Portafolio
            </h1>
            <p className="text-muted-foreground mt-2">Gestiona tus proyectos existentes</p>
          </div>
        </div>

        <div className="space-y-4">
          {cosplays.map((cosplay) => (
            <Card key={cosplay.id} className="glass-card border-violet-500/30">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-violet-300">{cosplay.character}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{cosplay.series}</p>
                    <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                      <span>Categoría: {cosplay.category}</span>
                      <span>•</span>
                      <span>Orden: {cosplay.orderIndex}</span>
                      <span>•</span>
                      <span>{cosplay.mediaCount} medios</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-violet-500/30 hover:bg-violet-600/20 bg-transparent"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-red-500/30 hover:bg-red-600/20 text-red-400 bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
