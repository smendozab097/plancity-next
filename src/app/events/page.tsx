import Link from "next/link";
import { events } from "../api/data";
import Card from "@/components/card";


export default function EventsPage() {
  return (
    <main className="p-12 flex justify-center flex-col items-center">
      <h1 className="text-4xl text-blue-300 font-bold my-4 text-center">Catalogo de eventos</h1>

      <div className=" grid grid-cols-2 gap-4 items-center">
        {events.map((event) => (
          <Card key={event.id} {...event} />
        ))}
      </div>
    </main>

  );
}