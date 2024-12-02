import { auth } from "../SDK_FIREBASE";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Para trabalhar com Firestore
import { db } from "../SDK_FIREBASE"; // Referência ao Firestore

// Função para login de usuário que é empresa
async function loginUsuario(email, senha) {
  try {
    // Autenticação do usuário no Firebase Authentication
    const usuarioDados = await signInWithEmailAndPassword(auth, email, senha);

    if (usuarioDados != null) {
      const usuarioLogado = usuarioDados.user;

      // Verificar se o usuário logado é uma empresa
      const isEmpresa = await verificarEmpresa(usuarioLogado.uid);

      if (!isEmpresa) {
        throw new Error(
          "O usuário autenticado não está registrado como empresa."
        );
      }

      // Retorna os dados do usuário autenticado se for empresa
      console.log(`Usuário logado com sucesso: ${email}`);
      return usuarioLogado;
    }
  } catch (err) {
    console.error("Erro ao fazer login: ", err);
    throw err;
  }
}

// Função para verificar se o UID pertence a uma empresa no Firestore
async function verificarEmpresa(uid) {
  const docRef = doc(db, "Empresa", uid); // Buscando pelo UID do usuário autenticado
  const docSnap = await getDoc(docRef); // Obtém os dados do documento

  if (docSnap.exists()) {
    console.log("Dados encontrados:", docSnap.data());
    return true; // UID encontrado no Firestore como empresa
  } else {
    console.error("Nenhum dado foi encontrado.");
    return false; // Não encontrado como empresa
  }
}

export default loginUsuario;
