import axios from "axios";
import type { IdentificationFormValues } from "../models/IdentificationModels/Identification.model";

const BASE_URL = "http://localhost:5258";

export const getTenants = async () => {
  const res = await axios.get(`${BASE_URL}/Tenants`);
  return res.data;
};

export const postTenant = async (tenant: {
  isil: string;
  name: string;
  description: string;
}) => {
  await axios.post(`${BASE_URL}/Tenants`, tenant);
};

export const postAdministrativeFile = async (
  administrativeFile,
  tenantId: string
) => {
  return await axios.post(
    `${BASE_URL}/ArchivoAdministrativo`,
    administrativeFile,
    {
      headers: { tenant: tenantId },
    }
  );
};

export const postIdentification = async (
  identification: IdentificationFormValues,
  tenantId: string
) => {
  return await axios.post(`${BASE_URL}/Identification`, identification, {
    headers: { tenant: tenantId },
  });
};

export const postGraphicDocumentation = async (
  graphicDocumentation,
  tenantId: string
) => {
  await axios.post(`${BASE_URL}/GraphicDocumentation`, graphicDocumentation, {
    headers: { tenant: tenantId },
  });
};

export const getCatalogList = async (
  pageNumber: number,
  size: number,
  tenantId: string,
  searchParam?: string,
  searchText?: string
) => {
  if (searchParam && searchText) {
    const res = await axios.get(
      `${BASE_URL}/Catalog/search?page=${pageNumber}&size=${size}&${searchParam}=${searchText}`,
      {
        headers: { tenant: tenantId },
      }
    );
    return res.data;
  }

  const res = await axios.get(
    `${BASE_URL}/Catalog/search?page=${pageNumber}&size=${size}`,
    {
      headers: { tenant: tenantId },
    }
  );
  return res.data;
};

export const getCatalogItemByRecord = async (record: number, tenantId: string) => {
  const res = await axios.get(
    `${BASE_URL}/Catalog/search?expediente=${record}`,
    {
      headers: { tenant: tenantId },
    }
  )

  return res.data
}

export const removeCatalogItem = async (record: number, tenantId: string) => {
  const res = await axios.delete(`${BASE_URL}/Catalog/${record}`, {
    headers: { tenant: tenantId },
  });

  return res;
};
