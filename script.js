let transactions = []; //Array para melhorar desempenho da aplicação

import {
  createTransactionContainer,
  createTransactionTitle,
  createTransactionAmount,
  createEditTransactions,
  createDeleteTransactions,
} from "./create.js";

import { fetchTransactions, saveTransaction } from "./methodApi.js";

//Renderizar a página
function renderTransaction(transaction) {
  const container = createTransactionContainer(transaction.id);
  const title = createTransactionTitle(transaction.name);
  const amount = createTransactionAmount(transaction.amount);
  const editBtn = createEditTransactions(transaction);
  const deleteBtn = createDeleteTransactions(transaction.id);

  container.append(title, amount, editBtn, deleteBtn);
  document.querySelector(`#transactions`).append(container);
}

//Exibir saldo atualizado na tela
function updateBalance() {
  const balanceSpan = document.querySelector("#balance");
  const balance = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );
  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });
  balanceSpan.textContent = formater.format(balance);
}

//Carregamento inicial da página
async function setup() {
  const results = await fetchTransactions();
  transactions.push(...results);
  transactions.forEach(renderTransaction);
  updateBalance();
}

document.addEventListener(`DOMContentLoaded`, setup);
document.querySelector("form").addEventListener("submit", saveTransaction);
document
  .querySelector("form")
  .addEventListener("submit", createDeleteTransactions);
