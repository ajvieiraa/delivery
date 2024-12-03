export enum Status {
  'A CAMINHO' = 'A CAMINHO',
  'ACEITO' = 'ACEITO',
  'CANCELADO' = 'CANCELADO',
  'ENTREGUE' = 'ENTREGUE',
  'FINALIZADO' = 'FINALIZADO',
  'PENDENTE' = 'PENDENTE',
  'RECUSADO' = 'RECUSADO',
}

export enum UsuarioTipo {
  'CLIENTE' = 'Cliente',
  'PONTO DE VENDA' = 'Ponto de Venda',
  'DISTRIBUIDOR' = 'Distribuidor',
  'ADMINISTRADOR' = 'Administrador',
}

export enum PagamentoTipo {
  'BOLETO' = 'Boleto',
  'DINHEIRO' = 'Dinheiro',
  'TED' = 'TED',
  'CREDITO' = 'Credito',
  'CARTAO' = 'Cartao',
}

// RESPONSES
export type Response<Data> = {
  message: string | null;
  data: Data;
  success: boolean;
};

export type UpdateUserResponse = Response<{
  email: string;
  name: string;
}>;

export type Pagination = {
  current_page: number;
  last_page: number;
  total_items: number;
  per_page: number;
};

export type LoginResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: number;
    name: string;
    tipo: UsuarioTipo;
  };
};

export type MeResponse = Response<{
  id: number;
  name: string;
  email: string;
  tipo: string;
  created_at: string;
  updated_at: string;
}>;

export type Categoria = {
  id: number;
  nome: string;
  image: string | null;
  // descricao: string | null;
  // preco: string | null;
};

export type Produto = {
  id: number;
  nome: string;
  preco: string;
  description: string | null;
  image: string | null;
  empresa_id: number;
  empresa_nome: string;
  prazo_entrega?: string;
};

export type PaymentType = {
  id: number;
  name: string;
};

export type Account = {
  id: number;
  agencia?: string;
  conta?: string;
  operacao?: string;
  tipo_conta?: string;
  chave_pix?: string;
};

export type EmpresaListItem = {
  id: number;
  nome: string;
  valor_minimo_pedido: number;
  prazo_entrega: string | null;
  taxa_entrega: number;
  aberto: boolean;
};

export type Empresa = {
  id: number;
  nome: string;
  valor_minimo_pedido: number;
  prazo_entrega: string | null;
  taxa_entrega: number;
  payment_types: PaymentType[];
  account?: Account;
  endereco: Endereco;
  telefone?: string;
  aberto: boolean;
  funcionamento: {
    [key: string]: number | string | undefined;
    segunda: number;
    abertura_segunda: string;
    fechamento_segunda: string;
    terca: number;
    abertura_terca: string;
    fechamento_terca: string;
    quarta: number;
    abertura_quarta: string;
    fechamento_quarta: string;
    quinta: number;
    abertura_quinta: string;
    fechamento_quinta: string;
    sexta: number;
    abertura_sexta: string;
    fechamento_sexta: string;
    sabado: number;
    abertura_sabado: string;
    fechamento_sabado: string;
    domingo: number;
    abertura_domingo: string;
    fechamento_domingo: string;
  };
};

export type Pedido = {
  id: number;
  status: Status;
  mensagem: string | null;
  total: number;
  taxa_entrega: number;
  fornecedor: {
    id: number;
    nome: string;
  };
  produtos: {
    id: number;
    nome: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
  }[];

  /** yyyy-MM-dd HH:mm:ss */
  created_at: string;

  /** yyyy-MM-dd HH:mm:ss */
  updated_at: string;
};

export type PedidosResponse = {
  pagination: Pagination;
  items: Pedido[];
};

export type Estado = {
  id: number;
  nome: string;
  uf: string;
  ddd: string;
};

export type Cidade = {
  id: number;
  nome: string;
  uf: string;
};

export type Endereco = {
  logradouro: string;
  bairro: string;
  numero: string;
  complemento?: string;
  cidade?: string;
};

export type Venda = {
  id: number;
  status: Status;
  status_lojista: Status;
  pagamento: PagamentoTipo | string;
  troco_para: number | null;
  responsavel: string;
  observacao: string | null;
  telefone: string | null;
  mensagem: string | null;
  endereco: string;
  taxa_entrega: number;
  total: number;
  comissao: number;
  data_entrega?: string;
  created_at: string;
  updated_at: string;
  produtos: {
    id: number;
    produto_id: number;
    nome: string;
    quantidade: number;
    valor_unitario: number;
    valor_total: number;
  }[];
};

export type VendasResponse = {
  pagination: Pagination;
  items: Venda[];
};

export type Banner = {
  id: number;
  name: string;
  imagem: string;
};

// POST
export interface UpdateUserData {
  email?: string;
  name?: string;
  current_password?: string;
  new_password?: string;
}

export interface StoreOrderData extends Endereco {
  fornecedor_id: number;
  tipo: UsuarioTipo;
  pagamento: string;
  troco: number;
  produtos: {
    id: number;
    quantidade: number;
    valor_unitario: number;
  }[];
  cidade: string;
  estado: string;
  observacao?: string;
  responsavel: string;
  telefone: string;
  delivery: Boolean;
}

interface UpdateOrderDataNegative {
  status: Status.CANCELADO | Status.RECUSADO;
  mensagem: string;
}

interface UpdateOrderDataPositive {
  status: Exclude<Status, Status.CANCELADO | Status.RECUSADO>;
  mensagem?: string;
}

type UpdateOrderDataPick = UpdateOrderDataNegative | UpdateOrderDataPositive;

interface UpdateOrderDataCommon {
  data_entrega?: string;
}

export type UpdateOrderData = UpdateOrderDataCommon & UpdateOrderDataPick;
