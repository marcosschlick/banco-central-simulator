class Conta {
  constructor(id, usuario_id, instituicao_id, saldo) {
    this.id = id; // string (UUID)
    this.usuario_id = usuario_id; // string
    this.instituicao_id = instituicao_id; // string
    this.saldo = saldo; // number
  }
}
export default Conta;
