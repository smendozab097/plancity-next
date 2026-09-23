import { CardProps } from "@/types/cardProps.interface";
import Link from "next/link";
import FavoriteButton from "./favorite-button";


export default function Card({ id, name, image, city, description, price, category }: CardProps) {
  return (
    <article className="flex flex-col px-4 py-2 gap-2 w-70 max-h-130 items-center border rounded-md ">
      <h2 className="font-bold text-xl">{name}</h2>
      <div className="relative">
        <img src={image} alt={name} className="w-full h-70 object-cover" />
        <FavoriteButton eventId={id} className="absolute top-2 right-2"/>
      </div>
      <div className="w-full flex flex-col gap-2 text-sm">
        <p className="">Ciudad: {city}</p>
        <p className="truncate">Descripcion: {description}</p>
        <p className="">Precio: ${price}</p>
        <p className="">Categoria: {category}</p>
      </div>
      <Link href={`/events/${id}`} className="text-blue-600 hover:underline mt-2 mb-3">
        Ver evento
      </Link>
    </article>
  );
}