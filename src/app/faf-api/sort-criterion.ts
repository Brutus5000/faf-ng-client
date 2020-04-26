export enum SortOrder {
  ASCENDING,
  DESCENDING,
}

export interface SortCriterion {
  nameKey: string;
  apiField: string;
}

export function buildSortExpression(criterion: SortCriterion,
                                    order: SortOrder = SortOrder.ASCENDING): string {
  return (order === SortOrder.DESCENDING ? '-' : '') + criterion.apiField;
}
