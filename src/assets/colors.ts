import { Status } from "../services/api";

const colors = {
  primary: '#6FA5D7',
  primary_transparent: '#6FA5D744',
  secondary: '#F9B146',

  line: '#F5F5F5',
  line_strong: '#CCCCCC',
  background: '#FFFFFF',
  overlay: '#00000066',

  regular: '#3E3E3E',
  dark: '#222222',
  muted: '#848484',
  in_primary: '#FFFFFF',

  danger: '#F3960B',
  error: '#CE0A0A',

  in_progress: '#F3960B',
  finished: '#2B9B03',

  open: '#2B9B03',
  closed: '#CE0A0A',

  [Status["ACEITO"]]: '#6FA5D7',
  [Status["A CAMINHO"]]: '#6FA5D7',
  [Status["PENDENTE"]]: '#F9B146',
  [Status["RECUSADO"]]: '#CE0A0A',
  [Status["CANCELADO"]]: '#CE0A0A',
  [Status["ENTREGUE"]]: '#2B9B03',
  [Status["FINALIZADO"]]: '#2B9B03',
};

export default colors;
