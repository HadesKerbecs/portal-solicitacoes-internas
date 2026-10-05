export const STATUS = [
  { value: 'ABERTO', label: 'Aberto' },
  { value: 'EM_ATENDIMENTO', label: 'Em Atendimento' },
  { value: 'CONCLUIDO', label: 'Concluído' },
];

export function getStatusLabel(value: string): string {
  return STATUS.find(status => status.value === value)?.label ?? value;
}