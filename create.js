// Criando Transção
export function createTransactionContainer(id) {
  const container = document.createElement("div");
  container.classList.add("transaction");
  container.id = `transaction-${id}`;
  return container;
}

// Criando Título da transação
export function createTransactionTitle(name) {
  const title = document.createElement("span");
  title.classList.add(`transaction-title`);
  title.textContent = name;
  return title;
}

// Criar Transação em $$ e convertendo números com uma API
export function createTransactionAmount(amount) {
  const span = document.createElement("span");
  span.classList.add(`transaction-amount`);
  const formater = Intl.NumberFormat("pt-BR", {
    compactDisplay: "long",
    currency: "BRL",
    style: "currency",
  });
  const formatedAmount = formater.format(amount);
  if (amount > 0) {
    span.textContent = `${formatedAmount} Crédito`;
    span.classList.add("credit");
  } else {
    span.textContent = `${formatedAmount} Débito`;
    span.classList.add("debit");
  }
  return span;
}

//Deletar transação DELETE
export function createDeleteTransactions(id) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Excluir";
  deleteBtn.addEventListener("click", async () => {
    await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "DELETE",
    });
    deleteBtn.parentElement.remove();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1);
    updateBalance();
  });
  return deleteBtn;
}

//Botão para editar transação
export function createEditTransactions(transaction) {
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit-btn");
  editBtn.textContent = "Editar";
  editBtn.addEventListener("click", () => {
    document.querySelector("#id").value = transaction.id;
    document.querySelector("#name").value = transaction.name;
    document.querySelector("#amount").value = transaction.amount;
  });
  return editBtn;
}
