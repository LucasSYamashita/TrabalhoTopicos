async function carregarClientes() {
    const res = await fetch("/api/clientes");
    const clientes = await res.json();
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    clientes.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.nome} - ${c.email}`;
      lista.appendChild(li);
    });
  }
  
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
  
    await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email })
    });
  
    document.getElementById("form").reset();
    carregarClientes();
  });
  
  carregarClientes();
  