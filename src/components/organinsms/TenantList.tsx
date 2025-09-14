// import { useNavigate } from "react-router-dom";
import type { TenantModel } from "../../models/Tenant.model";
import default_image from "../../assets/museum.jpg";
// import { useSideBarStore } from "../../Zustand/stores/SidebarStore";

interface Props {
  items: TenantModel[];
}

function TenantList({ items }: Props) {
  // const navigate = useNavigate();
  // const { setTenantId } = useSideBarStore();
  // const changePage = (isil: string) => {
  //   setTenantId(`tenant_${isil}`);
  //   navigate(`tenant_${isil}/catalog/1`);
  // };

  return (
    <ul className="flex flex-col gap-2 p-2">
      {items.map((item) => (
        <li
          className="flex items-start gap-6 rounded-md bg-base-100 p-4"
          key={item.id}
        >
          <figure className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
            <img
              className="w-full h-full object-cover"
              src={item.imageUrl ? item.imageUrl : default_image}
              alt="Something"
            />
          </figure>
          <article className="flex-1 grid grid-rows-2 gap-2">
            <header>
              <h3>{item.name}</h3>
              <h4 className="text-xs uppercase font-semibold opacity-60">
                ISIL: {item.isil}
              </h4>
            </header>
            <p className="text-xs whitespace-pre-wrap break-words overflow-hidden">
              {item.description}
            </p>
          </article>
          {/* <nav className="flex-shrink-0">
            <button
              className="btn btn-square btn-ghost"
              onClick={() => changePage(item.isil)}
            >
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </button> */}
          {/* </nav> */}
        </li>
      ))}
    </ul>
  );
}

export default TenantList;
