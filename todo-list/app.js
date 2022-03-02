const todoList = document.querySelector("#todoList");
const todoNovoItem = document.querySelector("#newItem");

const getBanco = () => JSON.parse(localStorage.getItem("todoList")) ?? [];
const setBanco = (banco) =>
  localStorage.setItem("todoList", JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
  const item = document.createElement("label");
  item.classList.add("todo__item");
  item.innerHTML = `
  <input type="checkbox" ${status} data-indice =${indice}>
    <div>${tarefa}</div>
  <input type="button" value="X" data-indice =${indice}>
  `;
  todoList.appendChild(item);
};

const limparTarefas = () => {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
};

const atualizarTela = () => {
  limparTarefas();
  const banco = getBanco();
  banco.forEach(({ tarefa, status }, indice) =>
    criarItem(tarefa, status, indice)
  );
};

const limparTarefaNova = (evento) => {};

const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;

  if (tecla === "Enter") {
    const banco = getBanco();
    banco.push({ tarefa: texto, status: "" });
    setBanco(banco);
    atualizarTela();
    evento.target.value = "";
  }
};

const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice(indice, 1);
  setBanco(banco);
  atualizarTela();
};

const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === "" ? "checked" : "";
  setBanco(banco);
  atualizarTela();
};

const clickItem = (evento) => {
  const elemento = evento.target;
  const indice = elemento.dataset.indice;

  if (elemento.type === "button") {
    removerItem(indice);
  } else if (elemento.type === "checkbox") {
    atualizarItem(indice);
  }
};

todoNovoItem.addEventListener("keypress", inserirItem);
todoList.addEventListener("click", clickItem);

atualizarTela();
