let inputEmail = document.getElementById('input-email');
let inputSenha = document.getElementById('input-senha');
let inputRepeteSenha = document.getElementById('input-repete-senha');
let btnCadastro = document.getElementById('cadastro');
let login = document.getElementById('login');
let formulario = document.getElementById('form-cadastro');
let vaiParaLogin = document.getElementById('login');
let sucesso = document.getElementById('sucesso');
let erro = document.getElementById('erro');
let mensagemSucesso = document.getElementById('mensagem-sucesso');
let iconeCarregando = document.getElementById('icone-carregando');



formulario.addEventListener('submit', (e) => {
  e.preventDefault()

  cadastroUsuario();
})

let listaUsuarios = buscarNoStorage();

function cadastroUsuario() {

  let email = inputEmail.value;
  let senha = inputSenha.value;
  let repeteSenha = inputRepeteSenha.value;

  let existe = listaUsuarios.some((usuario) => usuario.email === email);


  if (inputEmail.value === "" || inputSenha.value === "" || inputRepeteSenha.value === "") {
    alert('Preencha todos os campos');
    limparCampos();
    return;
  }

  if (senha != repeteSenha) {
    alert('As senhas não sao iguas')
    limparCampos();
    return;

  }

  if (existe) {
    alert('Esse email ja esta cadastrado')
    limparCampos();
    return;

  }

  let senhaCriptografada = CryptoJS.TripleDES.encrypt(senha, 'hash12345').toString();

  let usuarios = {
    email,
    senha: senhaCriptografada,
    recadosDoUsuario: []
  }

  sucesso.setAttribute('style', 'display: flex; justify-content: center; align-items: center;');
  mensagemSucesso.innerHTML = 'Cadastrando usuário...';
  iconeCarregando.style.display = 'inline-block';


  listaUsuarios.push(usuarios)
  salvarNoStorage(listaUsuarios);
  console.log(listaUsuarios);
  limparCampos();
  setTimeout(() => {
    window.location.href = 'login.html'
  }, 30500)


}

vaiParaLogin.addEventListener('click', irParaLogin)

function irParaLogin() {
  window.location.href = 'login.html'
}

//STORAGE

function salvarNoStorage(lista) {
  localStorage.setItem('setUsuario', JSON.stringify(lista))
}

function buscarNoStorage() {
  let listaUsuariosStorage = JSON.parse(localStorage.getItem('setUsuario')) || [];
  return listaUsuariosStorage;
}



//FUNÇÔES AUXILIARES

function limparCampos() {
  inputEmail.value = '';
  inputSenha.value = '';
  inputRepeteSenha.value = '';
}


