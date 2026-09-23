export default function Loading() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center p-6">
      <div className="relative flex flex-col items-center gap-4">
        {/* Spinner animado con gradiente y pulso */}
        <div className="relative flex items-center justify-center">
          <div className="h-14 w-14 rounded-full border-4 border-zinc-200 border-t-zinc-900 animate-spin dark:border-zinc-800 dark:border-t-zinc-100" />
          <div className="absolute h-6 w-6 rounded-full bg-zinc-900/10 blur-xs dark:bg-zinc-100/10 animate-pulse" />
        </div>

        {/* Texto de estado accesible */}
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="text-sm font-medium tracking-wide text-zinc-900 dark:text-zinc-100">
            Cargando contenido...
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Por favor, espera un momento
          </p>
        </div>
      </div>
    </div>
  );
}
