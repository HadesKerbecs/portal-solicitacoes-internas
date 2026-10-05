export interface Solicitacao {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  status: string;
  solicitante: {
    id: number;
    username: string;
  };
  created_at: string;
  updated_at: string;
}