export type FieldType =
  | 'text'
  | 'image'
  | 'number'
  | 'boolean'
  | 'richtext'
  | 'string_array'
  | 'object'
  | 'object_array';

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  fields?: FieldDef[];
}
