export type InputType = 'Text' | 'Number' | 'Radio';
export type LayoutType = 'Normal' | 'Wide' | 'Compact';

export interface DisplayConfig {
  label: string;
  placeholder?: string;
}

export interface ValueConstraints {
  maximum?: number;
  minimum?: number;
  allow_decimal?: number;
}

export interface EnumOption {
  label: string;
  value: string;
}

export interface BuilderConfig {
  type: 'simple_input' | 'simple_choice';
}

export interface FormItem {
  name: string;
  display: DisplayConfig;
  type: InputType;
  rule?: string;
  props?: Record<string, any>;
  builder: BuilderConfig;
  layout: LayoutType;
  enum?: EnumOption[];
  prefill?: { value: any };
  value_constraints?: ValueConstraints;
  visible?: Record<string, string>;
}

export interface FormSchema {
  name: string;
  label: string;
  items: Record<string, FormItem>;
}
