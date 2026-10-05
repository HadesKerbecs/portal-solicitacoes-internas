export const CATEGORIAS = [
  { value: 'TI', label: 'TI' },
  { value: 'RH', label: 'RH' },
  { value: 'COMPRAS', label: 'Compras' },
  { value: 'FINANCEIRO', label: 'Financeiro' },
  { value: 'INFRAESTRUTURA', label: 'Infraestrutura' },
];

export function getCategoriaLabel(value: string): string {
  return CATEGORIAS.find(categoria => categoria.value === value)?.label ?? value;
}