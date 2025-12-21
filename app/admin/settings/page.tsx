import AdminLayout from "@/components/admin-layout"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

export default function SettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-orbitron)] neon-text text-violet-300">
            Configuración
          </h1>
          <p className="text-muted-foreground mt-2">Administra la configuración de tu sitio</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="glass-card border-violet-500/30">
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-violet-300 font-[family-name:var(--font-orbitron)]">Perfil</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    defaultValue="Araquelsh"
                    className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roles">Roles</Label>
                  <Input
                    id="roles"
                    defaultValue="Cosplayer | Jurado | Anfitriona"
                    className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    defaultValue="Bahia Blanca, Argentina"
                    className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Biografía</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    defaultValue="Gamer desde los 15 años, encontré en el cosplay la forma perfecta de dar vida a mis personajes favoritos. Cada proyecto es una aventura donde combino mi pasión por los videojuegos y el anime con el arte de transformarme en quien siempre soñé ser."
                    className="bg-black/40 border-violet-500/30 focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Site Settings */}
          <Card className="glass-card border-violet-500/30">
            <div className="p-6 space-y-6">
              <h3 className="text-xl font-bold text-violet-300 font-[family-name:var(--font-orbitron)]">
                Configuración del Sitio
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Modo Mantenimiento</Label>
                    <p className="text-sm text-muted-foreground">Desactiva temporalmente el sitio público</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Mostrar Contacto</Label>
                    <p className="text-sm text-muted-foreground">Muestra el formulario de contacto</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Autoplay Videos</Label>
                    <p className="text-sm text-muted-foreground">Reproduce videos automáticamente en el portafolio</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="bg-violet-600 hover:bg-violet-700 text-white font-[family-name:var(--font-orbitron)]">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
