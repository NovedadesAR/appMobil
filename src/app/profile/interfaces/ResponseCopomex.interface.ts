export interface RespCopomex {
  error:         boolean;
  code_error:    number;
  error_message: null;
  response:      Response;
}

export interface Response {
  cp:                string;
  asentamiento:      string[];
  tipo_asentamiento: string;
  municipio:         string;
  estado:            string;
  ciudad:            string;
  pais:              string;
}
