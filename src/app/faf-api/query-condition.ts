export interface QueryCondition {
  nameKey: string;
  buildFilterExpression: (field: string, value: string) => string;
}

const Contains: QueryCondition = {
  nameKey: 'contains',
  buildFilterExpression(field: string, value: string) {
    return `${field}==*${value}*`;
  }
};

const Is: QueryCondition = {
  nameKey: 'is',
  buildFilterExpression(field: string, value: string) {
    return `${field}==${value}`;
  }
};

export const StringConditions = [
  Contains, Is
];

export const NumberConditions = [
  Is
];
