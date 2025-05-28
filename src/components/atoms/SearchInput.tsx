import SearchIcon from "@mui/icons-material/Search";

interface Props {
  items: {
    value: string;
    label: string;
  }[];
  onChangeSelect: (seachText: string) => void;
  onChangeValue: (seachParam: string) => void;
}

export default function SearchInput({
  items,
  onChangeSelect,
  onChangeValue,
}: Props) {

  return (
    <nav className="flex gap-4 p-4 bg-base-100 items-center rounded-md">
      <SearchIcon />
      <input
        placeholder="Buscar"
        className="input w-full"
        onChange={(e) => onChangeValue(e.target.value)}
      />
      <select
        className="select w-56"
        defaultValue="expediente"
        onChange={(e) => onChangeSelect(e.target.value)}
      >
        {items.map((item, i) => (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </nav>
  );
}
