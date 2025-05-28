import emptyLogo from "../../assets/empty_vault.svg";

interface Props {
  title: string;
  description: string;
}

export default function EmptyList({ title, description }: Props) {
  return (
    <div className="flex items-center justify-center h-fit">
      <div className="flex flex-col items-center text-center">
        <img src={emptyLogo} alt="" />
        <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
