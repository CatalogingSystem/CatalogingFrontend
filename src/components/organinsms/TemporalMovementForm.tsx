import { FormProvider, useForm, type Resolver } from "react-hook-form";
import {
  TemporalMovementSchema,
  type TemporalMovement,
} from "../../models/TemporalMovement/TemporalMovement.model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStore } from "../../Zustand/stores/FormStore";
import { useCallback, useEffect } from "react";
import FormTemplate from "../templates/FormTemplate";
import TabForm from "./TabForm";
import { temporalMovementSteps } from "../../constants/TemporalMovementsTabs";
import {
  getTemporalMovementsById,
  postTemporalMovement,
  putTemporalMovement,
} from "../../utils/connections";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../../Zustand/stores/AuthStore";

export default function TemporalMovementForm() {
  const { tenantId, id } = useParams<{ tenantId: string; id?: string }>();
  const { jwt } = useAuthStore();
  const navigate = useNavigate();

  const methods = useForm<TemporalMovement>({
    mode: "onBlur",
    resolver: zodResolver(
      TemporalMovementSchema
    ) as unknown as Resolver<TemporalMovement>,
  });

  const { setTitle, reset } = useFormStore();

  const onSubmit = methods.handleSubmit(async (data: TemporalMovement) => {
    if (!tenantId || !jwt) return;

    try {
      if (id) {
        await putTemporalMovement(data, tenantId, id, jwt);
      } else {
        await postTemporalMovement(data, tenantId, jwt);
      }
      navigate(-1);
    } catch (error) {
      console.error("Error al crear el movimiento temporal:", error);
    }
  });

  const fetchData = useCallback(async () => {
    if (!id || !tenantId || !jwt) return;

    try {
      const data = await getTemporalMovementsById(id, tenantId, jwt);
      const formattedData: TemporalMovement = {
        ...data,
        expediente: String(data.expediente),
        date: data?.date
          ? new Date(data.date).toISOString().split("T")[0]
          : null,
        departureDate: data?.departureDate
          ? new Date(data.departureDate).toISOString().split("T")[0]
          : null,
        returnDate: data?.returnDate
          ? new Date(data.returnDate).toISOString().split("T")[0]
          : null,
        departure: {
          ...data.departure,
          date: data?.departure.date
            ? new Date(data.departure.date).toISOString().split("T")[0]
            : null,
        },
        return: {
          ...data.return,
          date: data?.return.date
            ? new Date(data.return.date).toISOString().split("T")[0]
            : null,
        },
      };
      methods.reset(formattedData);
    } catch (error) {
      console.error("Error fetching temporal movement data:", error);
    }
  }, [id, jwt, methods, tenantId]);

  useEffect(() => {
    if (!id) setTitle("Crear Nuevo Movimiento Temporal");
    else setTitle("Editar Movimiento Temporal");

    return () => reset();
  }, [id, reset, setTitle]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);

  return (
    <FormTemplate>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <TabForm items={temporalMovementSteps} submitButtonLabel="Guardar" />
        </form>
      </FormProvider>
    </FormTemplate>
  );
}
