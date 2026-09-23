import { events } from "@/app/api/data"
import Link from "next/link"


export default async function EventItem({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Aquí fetcheas los datos del post con `id`
  //const post = await fetch(`https://api.example.com/posts/${id}`).then(r => r.json())

  const event = events.find(e => e.id === id)

  // Opcional: manejar caso “no encontrado”
  if (!event) {
    return (
      <main>
        <h1>Evento no encontrado</h1>
        <p>No existe un evento con el id {id}.</p>
      </main>
    )
  }

  return (
    <main>
      <Link href="/events">volver</Link>
      <div>
        
      </div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.price}</p>
      <img src={event.image} alt={event.name} />
    </main>
  )
}
