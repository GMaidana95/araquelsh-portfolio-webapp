import AdminLayout from "@/components/admin-layout"
import CosplayForm from "@/components/cosplay-form"

export default function NewCosplayPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-orbitron neon-text text-violet-300">
            Nuevo Cosplay
          </h1>
          <p className="text-muted-foreground mt-2">Agrega un nuevo proyecto a tu portafolio</p>
        </div>

        <CosplayForm />
      </div>
    </AdminLayout>
  )
}
