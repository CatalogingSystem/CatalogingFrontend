export function formatDate(dateStr?: string | null): string {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "" : date.toLocaleDateString("es-BO");
}
