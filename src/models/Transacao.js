class Transacao {
  constructor(id, conta_id, valor, data) {
    this.id = id; // string (UUID)
    this.conta_id = conta_id; // string
    this.valor = valor; // number
    this.data = data; // Date
  }
}
export default Transacao;
