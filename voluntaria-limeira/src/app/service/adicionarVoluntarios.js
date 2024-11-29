import { db } from "../SDK_FIREBASE";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

async function adicionarVoluntarios(projetoId, voluntarios) {
  try {
    // Referência ao documento do projeto com base no projetoId
    const projetoRef = doc(db, "Projetos", projetoId);

    // Atualiza o documento do projeto, adicionando os voluntários ao campo "voluntarios"
    await updateDoc(projetoRef, {
      voluntarios: arrayUnion(...voluntarios), // Adiciona os voluntários sem duplicar
    });

    console.log(`Voluntários adicionados ao projeto: ${projetoId}`);
  } catch (err) {
    console.error("Erro ao adicionar voluntários ao projeto: ", err);
    throw err;
  }
}

export default adicionarVoluntarios;
