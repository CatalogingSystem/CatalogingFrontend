interface Props {
  title: string;
  panels: {
    title: string;
    items: { title: string; value?: string }[];
  }[];
}

export default function DetailCard({ title, panels }: Props) {
  return (
    <main className="gap-4">
      <header>
        <h2 className="text-lg font-semibold">{title}</h2>
      </header>
      {panels.map((panel, i) => (
        <div key={i} className="m-2">
          <article className="grid grid-cols-2 bg-base-100 rounded-md p-4 gap-2">
            <h3 className="col-span-2 font-semibold">{panel.title}</h3>
            {panel.items.map((item, i) => (
              <div key={i} className="flex flex-col text-sm">
                <h4 className="font-semibold opacity-60">{item.title}</h4>
                <p className="break-words">{item.value || "Sin Especificar"}</p>
              </div>
            ))}
          </article>
        </div>
      ))}
    </main>
  );
}
