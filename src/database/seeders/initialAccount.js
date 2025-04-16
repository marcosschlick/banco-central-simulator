import Account from "../../app/models/Account.js";

export default async function seedAccounts() {
  const accounts = [
    {
      id: 1,
      user_id: 1,
      institution_id: 1,
      balance: 1500.0,
      credit_limit: 1000.0,
      credit_available: 500.0,
    },
    {
      id: 2,
      user_id: 2,
      institution_id: 1,
      balance: 3000.0,
      credit_limit: 2000.0,
      credit_available: 1000.0,
    },
    {
      id: 3,
      user_id: 3,
      institution_id: 1,
      balance: 750.5,
      credit_limit: 500.0,
      credit_available: 250.0,
    },
    {
      id: 4,
      user_id: 4,
      institution_id: 2,
      balance: 4200.0,
      credit_limit: 3000.0,
      credit_available: 1500.0,
    },
    {
      id: 5,
      user_id: 5,
      institution_id: 3,
      balance: 12500.0,
      credit_limit: 5000.0,
      credit_available: 2500.0,
    },
    {
      id: 6,
      user_id: 6,
      institution_id: 4,
      balance: 800.0,
      credit_limit: 1000.0,
      credit_available: 500.0,
    },
    {
      id: 7,
      user_id: 7,
      institution_id: 5,
      balance: 3500.75,
      credit_limit: 2000.0,
      credit_available: 1000.0,
    },
    {
      id: 8,
      user_id: 8,
      institution_id: 6,
      balance: 9200.0,
      credit_limit: 4000.0,
      credit_available: 2000.0,
    },
    {
      id: 9,
      user_id: 9,
      institution_id: 7,
      balance: 1500.0,
      credit_limit: 1000.0,
      credit_available: 500.0,
    },
    {
      id: 10,
      user_id: 10,
      institution_id: 8,
      balance: 600.25,
      credit_limit: 500.0,
      credit_available: 250.0,
    },
    {
      id: 11,
      user_id: 1,
      institution_id: 9,
      balance: 2000.0,
      credit_limit: 1500.0,
      credit_available: 750.0,
    },
    {
      id: 12,
      user_id: 2,
      institution_id: 10,
      balance: 4500.0,
      credit_limit: 3000.0,
      credit_available: 1500.0,
    },
    {
      id: 13,
      user_id: 11,
      institution_id: 1,
      balance: 10000.0,
      credit_limit: 5000.0,
      credit_available: 2500.0,
    },
    {
      id: 14,
      user_id: 12,
      institution_id: 2,
      balance: 800.0,
      credit_limit: 400.0,
      credit_available: 200.0,
    },
    {
      id: 15,
      user_id: 21,
      institution_id: 1,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 16,
      user_id: 21,
      institution_id: 2,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 17,
      user_id: 21,
      institution_id: 3,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 18,
      user_id: 21,
      institution_id: 4,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 19,
      user_id: 21,
      institution_id: 5,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 20,
      user_id: 21,
      institution_id: 6,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 21,
      user_id: 21,
      institution_id: 7,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 22,
      user_id: 21,
      institution_id: 8,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 23,
      user_id: 21,
      institution_id: 9,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
    {
      id: 24,
      user_id: 21,
      institution_id: 10,
      balance: 1000.0,
      credit_limit: 500.0,
      credit_available: 500.0,
    },
  ];

  await Account.bulkCreate(accounts);
  console.log("Account seed created!");
}
