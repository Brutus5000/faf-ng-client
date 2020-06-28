import {QueryCondition} from './query-condition';

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

  let expression = list
    .filter(it => it != null && it.criterion != null && it.operator != null && it.value != null)
    .map(it => it.operator.buildFilterExpression(it.criterion.apiField, it.value))
    // semicolon is AND operator in RSql
    .join(';');

  if (expression.length === 0) {
    expression = null;
  }

  console.log('Created filter expression: ' + expression);

  return expression;
}


