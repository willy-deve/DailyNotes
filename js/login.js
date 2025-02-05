let email = document.getElementById('input-email');
let senha = document.getElementById('input-senha');
let btnLogin = document.getElementById('login');
let btnCadastro = document.getElementById('cadastro');
let formulario = document.getElementById('form-login');
let vaiParaCadastro = document.getElementById('cadastro');
let erro = document.getElementById('erro')




formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  login();

})



function login() {

  let listaUsuario = buscarUsuarioNoStorage();

  if (email.value === "" || senha.value === "") {
    erro.setAttribute('style', 'display: block')
    erro.innerHTML = 'Preencha todos os campos'
    limparCampos();
    return;
  }

  let usuarioEncontrado = listaUsuario.findIndex((usuario) => {
    if (usuario.email == email.value) {

      let senhaDescriptografada = CryptoJS.TripleDES.decrypt(usuario.senha, 'hash12345').toString(CryptoJS.enc.Utf8);
      return senhaDescriptografada === senha.value;
    }
  });

  if (usuarioEncontrado !== -1) {
    sessionStorage.setItem('usuarioLogado', usuarioEncontrado);
    erro.setAttribute('style', 'display: block; color: green')
    erro.innerHTML = 'Sucesso'
    setTimeout(() => {
      window.location.href = "recados.html";
    }, 2000)


  } else {
    limparCampos();
    erro.setAttribute('style', 'display: block')
    erro.innerHTML = 'Dados incorretos'
  }
}

vaiParaCadastro.addEventListener('click', irParaCadastro);

function irParaCadastro() {
  window.location.href = 'cadastro.html'
}

function limparCampos() {
  email.value = '';
  senha.value = '';
}


function buscarUsuarioNoStorage() {
  return JSON.parse(localStorage.getItem('setUsuario')) || [];
}
