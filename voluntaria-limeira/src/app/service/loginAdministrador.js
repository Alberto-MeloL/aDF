import { auth } from "../SDK_FIREBASE"; // Firebase Auth importado do SDK
import { signInWithEmailAndPassword } from "firebase/auth"; // Função para autenticar
import { doc, getDoc } from "firebase/firestore"; // Para trabalhar com Firestore
import { db } from "../SDK_FIREBASE"; // Referência ao Firestore
// Função para login do administrador
async function loginAdministrador(email, senha) {
  try {
    // Verificar se o email está na coleção de administradores antes de autenticar
    const isAdmin = await verificarEmailAdmin(email);

    if (!isAdmin) {
      throw new Error("O email fornecido não está registrado como administrador.");
    }

    // Realizar o login com o Firebase Authentication
    const usuarioDados = await signInWithEmailAndPassword(auth, email, senha);
    console.log("Usuário autenticado:", usuarioDados);

    // Verificar se o usuário logado é um administrador (por segurança extra)
    const usuarioLogado = usuarioDados.user;

    if (!isAdmin) {
      throw new Error("O usuário autenticado não está registrado como administrador.");
    }

    // Retorna o usuário autenticado se ele for administrador
    console.log("Usuário é Administrador");
    // setTipoUsuario não está definido no seu código, certifique-se de chamar isso no contexto apropriado
    // setTipoUsuario("Administrador");
    return usuarioLogado;
  } catch (err) {
    console.error(`Houve um erro ao realizar o login: ${err.message}`);
    // Resetar dados de autenticação
    signOut(auth).catch(signOutError => {
      console.error("Erro ao realizar logout:", signOutError);
    });
    throw err; // Lança o erro para ser tratado onde a função for chamada
  }
}

// Função para verificar se o email pertence a um administrador no Firestore
async function verificarEmailAdmin(email) {
  const docRef = doc(db, "Administradores", email); // Buscando pelo email do usuário autenticado
  const docSnap = await getDoc(docRef); // Obtém os dados do documento

  if (docSnap.exists()) {
    console.log("Dados encontrados:", docSnap.data());
    return true; // Email encontrado no Firestore como administrador
  } else {
    console.error("Nenhum dado foi encontrado.");
    return false; // Não encontrado como administrador
  }
}

export default loginAdministrador;
