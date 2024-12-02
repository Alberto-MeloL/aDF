import { auth, createUserWithEmailAndPassword } from "../SDK_FIREBASE"; // Firebase Auth importado do SDK
import { doc, setDoc, getDoc } from "firebase/firestore"; // Para trabalhar com Firestore
import { db } from "../SDK_FIREBASE"; // Referência ao Firestore


// Função para criar um novo usuário
async function loginUsuario(nome, email, cnpj, senha) {
  try {
    // Verificar se o email está na coleção de administradores antes de criar o usuário
    const isAdmin = await verificarEmailAdmin(email);

    if (isAdmin) {
      throw new Error("O email fornecido está registrado como administrador. Não é possível criar usuário.");
    }

    // Criação do usuário autenticado no Firebase Authentication
    const usuarioDados = await createUserWithEmailAndPassword(auth, email, senha);

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

    // Resetar dados de autenticação se houver um erro
    signOut(auth).catch(signOutError => {
      console.error("Erro ao realizar logout:", signOutError);
    });

    throw err;
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

export default loginUsuario;
