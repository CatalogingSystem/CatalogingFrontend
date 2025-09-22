import axios from "axios";
import type { IdentificationFormValues } from "../models/IdentificationModels/Identification.model";
import type { AdminFileFormValues } from "../models/AdministrativeFileModels/AdminFileForm.model";
import type { ImageRecordFormValues } from "../models/GraphicDocumentation/GraphicDocumentation.model";
import type { LoginFormData } from "../models/LoginModels/Login.model";
import type {
  UserFormValues,
  UserUpdatePasswordValues,
  UserUpdateValues,
} from "../models/UserModels/User.model";
import type { DatingFormValues } from "../models/DatingModels/Dating.model";
import type { AdministrativeData } from "../models/AdministrativeData/AdministrativeData.model";
import type { Conservation } from "../models/Conservation/Conservation.model";
import type { TemporalMovement } from "../models/TemporalMovement/TemporalMovement.model";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const getTenants = async (
  jwt: string,
  page: number,
  pageSize: number
) => {
  const res = await axios.get(`${BASE_URL}/Tenants`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      page: page,
      size: pageSize,
    },
  });
  return res.data;
};

export const postTenant = async (tenant: {
  isil: string;
  name: string;
  description: string;
  jwt: string;
}) => {
  await axios.post(`${BASE_URL}/Tenants`, tenant, {
    headers: {
      Authorization: `Bearer ${tenant.jwt}`,
    },
  });
};

export const getAdministrativeFile = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/ArchivoAdministrativo/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const postAdministrativeFile = async (
  administrativeFile: AdminFileFormValues,
  tenantId: string,
  jwt: string
) => {
  return await axios.post(
    `${BASE_URL}/ArchivoAdministrativo`,
    administrativeFile,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const putAdministrativeFile = async (
  administrativeFile: AdminFileFormValues,
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/ArchivoAdministrativo/${record}`,
    administrativeFile,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const getIdentification = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/Identification/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const postIdentification = async (
  identification: IdentificationFormValues,
  tenantId: string,
  jwt: string
) => {
  return await axios.post(`${BASE_URL}/Identification`, identification, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
};

export const putIdentification = async (
  identification: IdentificationFormValues,
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/Identification/${record}`,
    identification,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const getGraphicDocumentation = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/GraphicDocumentation/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const postGraphicDocumentation = async (
  graphicDocumentation: Omit<ImageRecordFormValues, "images"> & {
    imageUrls: string[];
  },
  tenantId: string,
  jwt: string
) => {
  await axios.post(`${BASE_URL}/GraphicDocumentation`, graphicDocumentation, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
};

export const putGraphicDocumentation = async (
  graphicDocumentation: Omit<ImageRecordFormValues, "images"> & {
    imageUrls: string[];
  },
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/GraphicDocumentation/${record}`,
    graphicDocumentation,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const getDating = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/Dating/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const postDating = async (
  datingFormValues: DatingFormValues,
  jwt: string,
  tenantId: string
) => {
  await axios.post(`${BASE_URL}/Dating`, datingFormValues, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const putDating = async (
  datingFormValues: DatingFormValues,
  record: number,
  jwt: string,
  tenantId: string
) => {
  await axios.put(`${BASE_URL}/Dating/${record}`, datingFormValues, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAdministrativeData = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/AdministrativeData/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const postAdministrativeData = async (
  administrativeData: AdministrativeData,
  tenantId: string,
  jwt: string
) => {
  return await axios.post(
    `${BASE_URL}/AdministrativeData`,
    administrativeData,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const putAdministrativeData = async (
  administrativeData: AdministrativeData,
  record: number,
  tenantId: string,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/AdministrativeData/${record}`,
    administrativeData,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const getConservation = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/Conservation/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const postConservation = async (
  conservationData: Conservation,
  tenantId: string,
  jwt: string
) => {
  return await axios.post(`${BASE_URL}/Conservation`, conservationData, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
};

export const putConservation = async (
  conservationData: Conservation,
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/Conservation/${record}`,
    conservationData,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const getCatalogList = async (
  pageNumber: number,
  size: number,
  tenantId: string,
  jwt: string,
  searchParam?: string,
  searchText?: string
) => {
  if (searchParam && searchText) {
    const res = await axios.get(
      `${BASE_URL}/Catalog/search?page=${pageNumber}&size=${size}&${searchParam}=${searchText}`,
      {
        headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
      }
    );
    return res.data;
  }

  const res = await axios.get(
    `${BASE_URL}/Catalog/search?page=${pageNumber}&size=${size}`,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
  return res.data;
};

export const getCatalogItemByRecord = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(
    `${BASE_URL}/Catalog/search?expediente=${record}`,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );

  return res.data;
};

export const removeCatalogItem = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.delete(`${BASE_URL}/Catalog/${record}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });

  return res;
};

export const updateAdministrativeFile = async (
  administrativeFile: AdminFileFormValues,
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/ArchivoAdministrativo/${record}`,
    administrativeFile,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const updateIdentification = async (
  identification: IdentificationFormValues,
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/Identification/${record}`,
    identification,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const updateGraphicDocumentation = async (
  graphicDocumentation: Omit<ImageRecordFormValues, "images"> & {
    imageUrls: string[];
  },
  tenantId: string,
  record: number,
  jwt: string
) => {
  return await axios.put(
    `${BASE_URL}/GraphicDocumentation/${record}`,
    graphicDocumentation,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    }
  );
};

export const getTemporalMovementsById = async (
  id: string,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/TemporalMovement/${id}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
  return res.data;
};

export const getTemporalMovements = async (
  record: number,
  tenantId: string,
  jwt: string,
  page?: number,
  size?: number
) => {
  const res = await axios.get(
    `${BASE_URL}/TemporalMovement/expediente/${record}`,
    {
      headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
      params: { page, size },
    }
  );
  return res.data;
};

export const postTemporalMovement = async (
  movementData: TemporalMovement,
  tenantId: string,
  jwt: string
) => {
  return await axios.post(`${BASE_URL}/TemporalMovement`, movementData, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
};

export const putTemporalMovement = async (
  movementData: TemporalMovement,
  tenantId: string,
  id: string,
  jwt: string
) => {
  return await axios.put(`${BASE_URL}/TemporalMovement/${id}`, movementData, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
};

export const removeTemporalMovement = async (
  id: string,
  tenantId: string,
  jwt: string
) => {
  return await axios.delete(`${BASE_URL}/TemporalMovement/${id}`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
  });
};

export const getAuditRecords = async (
  tenantId: string,
  jwt: string,
  expediente?: string,
  page?: number,
  size?: number,
  tableName?: string,
  username?: string,
  operation?: string
) => {
  const res = await axios.get(`${BASE_URL}/Audit`, {
    headers: { tenant: tenantId, Authorization: `Bearer ${jwt}` },
    params: { page, size, expediente, username, operation, tableName },
  });
  return res.data;
};

export const loginUser = async (
  loginData: LoginFormData,
  tenantId?: string
) => {
  let res;
  if (tenantId) {
    res = await axios.post(`${BASE_URL}/Auth/login`, loginData, {
      headers: { tenant: tenantId },
    });
  } else {
    res = await axios.post(`${BASE_URL}/Auth/super-login`, loginData);
  }
  return res.data;
};

export const getUsers = async (
  jwt: string,
  tenantId: string,
  pageNumber: number,
  size: number,
  searchParam?: string,
  searchText?: string
) => {
  const res = await axios.get(
    `${BASE_URL}/Users?page=${pageNumber}&size=${size}&${searchParam}=${searchText}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
        tenant: tenantId,
      },
    }
  );
  return res.data;
};

export const postUser = async (
  userFormValues: UserFormValues,
  jwt: string,
  tenantId: string
) => {
  await axios.post(`${BASE_URL}/Users`, userFormValues, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const putUser = async (
  userFormValues: UserUpdateValues,
  jwt: string,
  tenantId: string,
  userId: string
) => {
  await axios.put(`${BASE_URL}/Users/${userId}`, userFormValues, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const updateUserPassword = async (
  passwordData: UserUpdatePasswordValues,
  jwt: string,
  tenantId: string,
  userId: string
) => {
  await axios.put(`${BASE_URL}/Users/${userId}`, passwordData, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getTenantCustomization = async (tenantId: string, jwt: string) => {
  const res = await axios.get(`${BASE_URL}/TenantCustomization`, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};

export const postTenantCustomization = async (
  customizationData: any,
  tenantId: string,
  jwt: string
) => {
  await axios.post(`${BASE_URL}/TenantCustomization`, customizationData, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const putTenantCustomization = async (
  customizationData: any,
  tenantId: string,
  jwt: string
) => {
  await axios.put(`${BASE_URL}/TenantCustomization`, customizationData, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const importCatalog = async (
  file: File,
  tenantId: string,
  jwt: string,
  nuevoExpediente?: number
) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${BASE_URL}/Catalog/import`, formData, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
    params: {
      nuevoExpediente,
    },
  });
  return res.data;
};

export const exportCatalog = async (
  record: number,
  tenantId: string,
  jwt: string
) => {
  const res = await axios.get(`${BASE_URL}/Catalog/export/${record}`, {
    headers: {
      tenant: tenantId,
      Authorization: `Bearer ${jwt}`,
    },
  });
  return res.data;
};
