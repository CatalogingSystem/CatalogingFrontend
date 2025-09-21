export interface CatalogModel {
  expediente: number;
  archivoAdministrativo: ArchivoAdministrativo;
  identification?: Identification;
  administrativeData: AdministrativeData;
  conservation: Conservation;
  graphicDocumentation?: GraphicDocumentation;
  dating: Dating;
  temporalMovements: TemporalMovement[];
}

export interface ArchivoAdministrativo {
  institucion: string;
  unidad: string;
  expediente: number;
  serie: string;
  documentoOrigen: string;
  fechaInicial: string;
  fechaFinal?: string;
  expedienteAnterior: string;
  asunto: string;
  peticionTransferencia: boolean;
  historial: string;
  archivoDocumental: string;
  observaciones: string;
}

export interface Identification {
  section: Section;
  inventory: number;
  numberOfObjects: number;
  genericClassification: string;
  objectName: string;
  typology: Typology;
  specificName: SpecificName;
  author: Author;
  title: Title;
  material: Material;
  techniques: Techniques;
  observations: string;
  expediente: number;
  unit: string;
}

export interface Section {
  room: string;
  panel: string;
  displayCase: string;
  easel: string;
  storage: string;
  courtyard: string | null;
  pillar: string;
  others: string;
}

export interface Typology {
  type: string;
  subtype: string;
  class: string;
  subclass: string;
  order: string;
  suborder: string;
}

export interface SpecificName {
  genericName: string;
  relatedTerms: string;
  specificTerms: string;
  usedBy: string;
  notes: string;
}

export interface Author {
  name: string;
  birthPlace: string;
  birthDate: string;
  deathPlace: string;
  deathDate: string;
}

export interface Title {
  name: string;
  attribution: string;
  translation: string;
}

export interface Material {
  describedPart: string;
  materialName: string;
  colors: string;
}

export interface Techniques {
  describedPart: string;
  techniqueName: string;
}

export interface GraphicDocumentation {
  expediente: number;
  genericControlNumber: string;
  specificControlNumber: string;
  date: string | null;
  supportTypes: string[];
  dimensions: Dimensions;
  imageAuthor: ImageAuthor;
  description: string;
  technicalData: string;
  generalObservations: string;
  imageUrls: string[];
}

export interface Dimensions {
  width: number;
  height: number;
}

export interface ImageAuthor {
  firstName: string;
  lastName: string;
  identityCard: string;
  institutionalId: string;
  institution: string;
  address: string;
  locality: string;
  province: string;
  department: string;
  country: string;
  phoneNumber: string;
  email: string;
  references: string;
}

export interface AdministrativeData {
  fileNumber: number;
  entryDate: string;
  entryForm: string;
  entrySource: string;
  collectionType: string;
  copiesReproductions: CopiesReproductions;
  valuation: Valuation;
  cataloger: Cataloger;
  catalogingDate: string;
  observations: string;
}

export interface CopiesReproductions {
  author: string;
  originalTitle: string;
  method: string;
  format: string;
  originalDestination: string;
  location: string;
  date: string;
  notes: string;
}

export interface Valuation {
  value: string;
  appraiser: string;
  date: string;
  notes: string;
}

export interface Cataloger {
  firstName: string;
  lastName: string;
  identityCard: string;
  institution: string;
  address: string;
  locality: string;
  province: string;
  department: string;
  country: string;
  phoneNumber: string;
  email: string;
  references: string;
  observations: string;
}

export interface Conservation {
  expediente: number;
  affectedArea: string;
  length: string;
  width: string;
  depth: string;
  reports: string;
  analysisTypes: string;
  results: string;
  treatmentType: string;
  description: string;
  specialConditions: string;
  observations: string;
  notes: string;
}

export interface Dating {
  expediente: number;
  simpleDate: SimpleDate;
  dateRange: DateRange;
  approximateDating: ApproximateDating;
  notes: Notes;
}

export interface SimpleDate {
  exact: string;
  approximate: string;
  probable: string;
  bc: number;
  year: number;
  month: number;
  day: number;
}

export interface DateRange {
  from: From;
  to: To;
}

export interface From {
  exact: string;
  approximate: string;
  probable: string;
  bc: number;
  year: number;
  month: number;
  day: number;
}

export interface To {
  exact: string;
  approximate: string;
  probable: string;
  bc: number;
  year: number;
  month: number;
  day: number;
}

export interface ApproximateDating {
  fromCentury: string;
  toCentury: string;
}

export interface Notes {
  textualDate: string;
  initialDateNotes: string;
  finalDateNotes: string;
  observations: string;
}

export interface TemporalMovement {
  id: string;
  movementType: string;
  expediente: number;
  applicant: Applicant;
  representative: Representative;
  entity: string;
  transferLocation: string;
  departureDate: string;
  returnDate: string;
  document: string;
  code: string;
  date: string;
  insurer: string;
  policy: string;
  notes: string;
  departure: Departure;
  return: Return;
  observations: string;
}

export interface Applicant {
  firstName: string;
  lastName: string;
  identityCard: string;
  institutionalId: string;
  institution: string;
  address: string;
  locality: string;
  province: string;
  department: string;
  country: string;
  phoneNumber: string;
  email: string;
  references: string;
  observations: string;
}

export interface Representative {
  firstName: string;
  lastName: string;
  identityCard: string;
  institutionalId: string;
  institution: string;
  address: string;
  locality: string;
  province: string;
  department: string;
  country: string;
  phoneNumber: string;
  email: string;
  references: string;
  observations: string;
}

export interface Departure {
  company: string;
  location: string;
  date: string;
  time: string;
  notes: string;
}

export interface Return {
  company: string;
  location: string;
  date: string;
  time: string;
  notes: string;
}
