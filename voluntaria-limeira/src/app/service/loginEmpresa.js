import { auth } from "../SDK_FIREBASE";
import { signInWithEmailAndPassword } from "firebase/auth";

async function loginUsuario(email, senha) {
  try {
    // Autenticação do usuário no Firebase Authentication
    const usuarioDados = await signInWithEmailAndPassword(auth, email, senha);

    if (usuarioDados != null) {
      // Retorna os dados do usuário autenticado
      console.log(`Usuário logado com sucesso: ${email}`);
      return usuarioDados.user;
    }
  } catch (err) {
    console.error("Erro ao fazer login: ", err);
    throw err;
  }
}

export default loginUsuario;
