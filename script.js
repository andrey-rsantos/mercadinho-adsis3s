function login(){
    const user = document.getElementById('usuario').value;
    const pass = document.getElementById('senha').value;


    if(user === 'admin' && pass === '123'){
        localStorage.setItem('logado', 'true');
        window.location.href = 'home.html';
    } else{
        document.getElementById('mensagem-erro').innerText = 'Usuário ou senha inválidos.';
    }
}

function verificarLogin(){
    if(localStorage.getItem('logado') !== 'true'){
        window.location.href = 'index.html';
    }
}



let carrinho = [];

function carregarProdutos(){
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos =>{
        const catalogo = document.getElementById('catalogo');
        produtos.forEach(p =>{
            catalogo.innerHTML += `
            <div class="produto">
            <img src="${p.image}" width="100">
            <h3>${p.title}</h3>
            <p>${p.description.substring(0, 100)}...</p>
            <p><strong>R$ ${p.price.toFixed(2)}</strong></p>
            <button onclick="adicionarAoCarrinho(${p.id}, '${p.title}', ${p.price})">Adicionar</button>
            </div>
            `;
        });
    });
}

function adicionarAoCarrinho(id, nome, preco){
    carrinho.push({ id, nome, preco});
    salvarCarrinho();
    carregarCarrinho();
}

function salvarCarrinho(){
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho(){
    carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const divCarrinho = document.getElementById('carrinho');
    const totalSpan = document.getElementById('total');
    let total = 0;
    divCarrinho.innerHTML = '';


    carrinho.forEach((item, index) => {
        divCarrinho.innerHTML += `
        <div class="item-carrinho">
         ${item.nome} - R$ ${item.preco.toFixed(2)}
         <button onclick="removerItem(${index})">Remover</button>
         </div>
        `;
    total += item.preco;
    });


    totalSpan.innerText = total.toFixed(2);
}


function removerItem(index){
    carrinho.splice(index, 1);
    salvarCarrinho();
    carregarCarrinho();
}


function finalizarCompra(){
    if(carrinho.length === 0){
        alert("Seu carrinho está vazio!");
        return;
    }

    
    let nome = prompt("Digite seu nome:");
    let endereco = prompt("Digite seu endereço:");
    let pagamento = prompt("Digite o método de pagamento:");

    alert(`Pedido confirmado!\nNome: ${nome}\nEndereço: ${endereco}\nPagamento: ${pagamento}\nTotal: R$ ${document.getElementById('total').innerText}`);

    localStorage.removeItem('carrinho');
    carrinho = [];
    carregarCarrinho();
}
