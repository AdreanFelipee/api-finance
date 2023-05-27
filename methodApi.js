//Requisição GET
export async function fetchTransactions() {
  return await fetch(`http://localhost:3000/transactions`).then((res) =>
    res.json()
  );
}

// Criando POST para criar nova transação
// e PUT para atualizar uma transação existente
export async function saveTransaction(ev) {
  ev.preventDefault();
  const id = document.querySelector(`#id`).value;
  const name = document.querySelector(`#name`).value;
  const amount = parseFloat(document.querySelector(`#amount`).value);

  if (id) {
    const response = await fetch(`http://localhost:3000/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, amount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const transaction = await response.json();
    const indexToRemove = transactions.findIndex((t) => t.id === id);
    transactions.splice(indexToRemove, 1, transaction);
    document.querySelector(`#transaction-${id}`).remove();
    renderTransaction(transaction);
  } else {
    const response = await fetch(`http://localhost:3000/transactions`, {
      method: "POST",
      body: JSON.stringify({ name, amount }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const transaction = await response.json();
    transactions.push(transaction);
    renderTransaction(transaction);
  }

  ev.target.reset();
  updateBalance();
}
