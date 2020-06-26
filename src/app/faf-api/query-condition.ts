export interface QueryCondition {
  nameKey: string;
  buildFilterExpression: (field: string, value: string) => string;
}

export const Contains: QueryCondition = {
  nameKey: 'contains',
  buildFilterExpression(field: string, value: string) {
    return `${field}==*${value}*`;
  }
};

export const Is: QueryCondition = {
  nameKey: '=',
  buildFilterExpression(field: string, value: string) {
    return `${field}==${value}`;
  }
};

export const GreaterThan: QueryCondition = {
  nameKey: '>',
  buildFilterExpression(field: string, value: string) {
    return `${field}=gt=${value}`;
  }
};

export const LesserThan: QueryCondition = {
  nameKey: '<',
  buildFilterExpression(field: string, value: string) {
    return `${field}=lt=${value}`;
  }
};

export const GreaterEquals: QueryCondition = {
  nameKey: '>=',
  buildFilterExpression(field: string, value: string) {
    return `${field}=ge=${value}`;
  }
};

export const LesserEquals: QueryCondition = {
  nameKey: '>=',
  buildFilterExpression(field: string, value: string) {
    return `${field}=le=${value}`;
  }
};

export const BooleanCondition = [ Is ];

export const StringConditions = [
  Contains, Is
];

export const NumberConditions = [
  Is, GreaterThan, LesserThan, GreaterEquals, LesserEquals
];
