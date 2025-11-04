import type { PatientDetails, PreviousInvestigation } from '../types'

export interface CaseData {
  caseId: string
  date: string
  patientDetails: PatientDetails | null
  labDetails: any
  clinicalDetails: any
  coulterData: any
  peripheralSmearData: any
  dlcData: any
  ironStudies: any
  hplc: any
  lapScore: any
  specialStains: any
  additionalTests: any
  previousInvestigations: PreviousInvestigation[]
  conclusion: any
}

export const saveCase = (caseData: CaseData) => {
  const cases = getAllCases()
  const existingCaseIndex = cases.findIndex((c) => c.caseId === caseData.caseId)

  if (existingCaseIndex > -1) {
    cases[existingCaseIndex] = caseData
  } else {
    cases.push(caseData)
  }

  localStorage.setItem('cases', JSON.stringify(cases))
}

export const getAllCases = (): CaseData[] => {
  const casesJson = localStorage.getItem('cases')
  return casesJson ? JSON.parse(casesJson) : []
}

export const getCase = (caseId: string): CaseData | undefined => {
  const cases = getAllCases()
  return cases.find((c) => c.caseId === caseId)
}
