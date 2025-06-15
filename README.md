# 🛒 Mercadinho Digital - Projeto de Estudo

Este é um projeto de estudo e prática de **JavaScript**, focado na criação de um sistema simples de e-commerce com tela de login, catálogo de produtos, carrinho de compras e integração com API externa.

---

## 📌 Funcionalidades

- Tela de login com validação simples
- Catálogo de produtos carregado via API
- Adição e remoção de itens no carrinho
- Cálculo do total de compras
- Finalização de pedido simulada com prompts
- Persistência de dados no navegador com `localStorage`

---

## 🚀 Como funciona cada parte

### ✅ Login

Validação simples com dados fixos:

```javascript
if(user === 'admin' && pass === '123'){
    localStorage.setItem('logado', 'true');
    window.location.href = 'home.html';
}
```

> Se o usuário for "admin" e a senha "123", redireciona para o catálogo.

---

### ✅ Catálogo de produtos com API

Os produtos são carregados da [Fake Store API](https://fakestoreapi.com/products):

```javascript
fetch('https://fakestoreapi.com/products')
  .then(res => res.json())
  .then(produtos => {
    produtos.forEach(p => {
      catalogo.innerHTML += `
        <div class="produto">
          <img src="\${p.image}" width="100">
          <h3>\${p.title}</h3>
          <p>\${p.description.substring(0, 100)}...</p>
          <p><strong>R$ \${p.price.toFixed(2)}</strong></p>
          <button onclick="adicionarAoCarrinho(\${p.id}, '\${p.title}', \${p.price})">Adicionar</button>
        </div>
      `;
    });
  });
```

> A API retorna os produtos em JSON e o front-end monta o catálogo dinamicamente.

---

### ✅ Carrinho de compras

Itens são armazenados no array `carrinho` e persistidos no `localStorage`:

```javascript
function adicionarAoCarrinho(id, nome, preco){
    carrinho.push({ id, nome, preco });
    salvarCarrinho();
    carregarCarrinho();
}
```

> Também é possível **remover** e ver o **total acumulado**.

---

### ✅ Finalização de pedido

O usuário é solicitado a informar dados via `prompt` e o pedido é confirmado:

```javascript
let nome = prompt("Digite seu nome:");
let endereco = prompt("Digite seu endereço:");
let pagamento = prompt("Digite o método de pagamento:");
```

---

## 📁 Estrutura de arquivos

```
├── index.html        # Tela de login
├── home.html         # Página com catálogo e carrinho
├── script.js         # Lógica de login, carrinho e integração com API
├── style.css         # Estilização básica
```

---

📚 **Projeto em desenvolvimento, com objetivo de evoluir para um sistema completo de CRUD e compras com melhor estilização e estrutura.**
