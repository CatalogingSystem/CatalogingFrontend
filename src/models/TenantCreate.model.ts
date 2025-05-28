import {z} from 'zod'

const abreviationsRegex = new RegExp(/^(?=(?:[A-Z0-9]*-)*[A-Z0-9]*$)(?:[A-Z0-9]-?){1,10}$/)
const countryRegex = new RegExp(/^[A-Z]{2}$/)

export const TenantSchema = z.object({
  country: z.string().regex(countryRegex),
  abrevations: z.string().trim().regex(abreviationsRegex),
  name: z.string().min(1).max(100).trim(),
  description: z.string().min(1).trim()
})

export type TenantFormValues = z.infer<typeof TenantSchema>
