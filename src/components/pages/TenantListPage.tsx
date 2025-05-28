import { useEffect, useState } from "react";
import { getTenants } from "../../utils/connections";
import TenantList from "../organinsms/TenantList";
import { useNavigate } from "react-router-dom";
import EmptyList from "../atoms/EmptyList";

export default function TenantListPage() {
  const navigate = useNavigate();

  const [tenantList, setTenantList] = useState([]);
  const [tenantNumber, setTenantNumber] = useState<number>(0);

  const handleOnClick = () => navigate("/create/institution");

  useEffect(() => {
    const fetchData = async () => {
      setTenantList(await getTenants());
      setTenantNumber(tenantList.length);
    };
    fetchData();
  }, [tenantList.length]);

  return (
    <section className="grid p-8 gap-6 ">
      <header className="flex justify-between font-semibold">
        <h2 className="text-xl">Lista de instituciones ({tenantNumber})</h2>
        <button className="btn btn-primary" onClick={handleOnClick}>
          Nueva Institucion
        </button>
      </header>
      {tenantList.length > 0 ? (

      <TenantList items={tenantList} />
      ):
      <EmptyList title="No hay instituciones registradas todavia" description="Crea una para empezar!"/>
      }
    </section>
  );
}
