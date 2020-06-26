import {QueryCondition} from './query-condition';
import {SortOrder} from './sort-criterion';

export interface FilterCriterion {
  nameKey: string;
  apiField: string;
  operators: QueryCondition[];
  defaultOperator: QueryCondition;
  availableValues: any[];
}

export interface FilterSelection {
  criterion: FilterCriterion;
  operator: QueryCondition;
  value: string;
}

export function buildFilterExpression(selection: FilterSelection | FilterSelection[]): string {
  const list = [].concat(selection);

  return list
    .map(it => it.operator.buildFilterExpression(it.criterion.apiField, it.value))
    // semicolon is AND operator in RSql
    .join(';');
}


