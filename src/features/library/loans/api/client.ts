import { mockLoans } from "../../../../mock/loans";

import { toLoan } from "./mappers";
import type { Loan } from "../model/types";

export function getLoans(): Loan[] {
  return mockLoans.map(toLoan);
}