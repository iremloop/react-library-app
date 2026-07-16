import { loanDtos } from "../../../../mock/loans";
import { toLoan } from "./mappers";
import type { Loan } from "../model/types";

export function getLoans(): Loan[] {
  return loanDtos.map(toLoan);
}