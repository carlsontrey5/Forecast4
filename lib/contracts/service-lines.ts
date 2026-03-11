export const bpoServiceLines = [
  "Banking Operations Transformation",
  "Customer Experience Transformation",
  "F&A",
  "Supply Chain Transformation",
  "HR & Talent Transformation",
  "Healthcare & Insurance Transformation",
  "Procurement",
  "RPO and Total Talent Acquisition",
  "Payroll Services",
  "Cloud and Infrastructure Management",
  "Customer experience Services by Industry",
  "Mortgage and Loan services",
  "Wealth and Asset Management",
  "Life & Annuities",
  "Healthcare Payer",
  "Property & Casualty",
  "HR Transformation",
  "Learning Tech & Services",
  "Benefits Administration",
] as const;

export type BpoServiceLine = (typeof bpoServiceLines)[number];
