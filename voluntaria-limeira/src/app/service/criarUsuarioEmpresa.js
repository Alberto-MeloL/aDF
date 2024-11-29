import { auth, createUserWithEmailAndPassword, db } from "../SDK_FIREBASE";
import { doc, setDoc } from "firebase/firestore";

async function criarUsuario(nome, email, cnpj, senha) {
  try {
    // Criação do usuário autenticado no Firebase Authentication
    const usuarioDados = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    if (usuarioDados != null) {
      // Pegar o UID do usuário recém-criado
      const userId = usuarioDados.user.uid;

      // Criação do documento na coleção "Empresa" com o UID do usuário
      await setDoc(doc(db, "Empresa", userId), {
        nome: nome,
        email: email,
        cnpj: cnpj,
        senha: senha,
      });

      console.log(`Usuário criado com sucesso: ${email}`);
    }
    return usuarioDados.user;
  } catch (err) {
    console.error("Erro ao criar usuário: ", err);
    throw err;
  }
}

export default criarUsuario;
