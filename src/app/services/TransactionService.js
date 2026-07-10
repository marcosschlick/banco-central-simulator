import TransactionRepository from "../repositories/TransactionRepository.js";

export default class TransactionService {
  constructor() {
    this.transactionRepository = new TransactionRepository();
  }

  async create(transactionData) {
    return this.transactionRepository.create(transactionData);
  }

  async findById(id) {
    const transaction = await this.transactionRepository.findById(id);
    if (!transaction) throw new Error("Transaction not found");
    return transaction;
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async update(id, updateData) {
    const updatedTransaction = await this.transactionRepository.update(
      id,
      updateData,
    );
    if (!updatedTransaction) throw new Error("Transaction not found");
    return updatedTransaction;
  }

  async delete(id) {
    const isDeleted = await this.transactionRepository.delete(id);
    if (!isDeleted) throw new Error("Transaction not found");
    return true;
  }
}
