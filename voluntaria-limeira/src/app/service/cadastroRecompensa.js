import { db } from "../SDK_FIREBASE";

import {
  doc,
  setDoc,
  Timestamp,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";


async function cadastroRecompensa(userId, titulo, descricao, inicio, termino, quantidade) {
  try {
    const dataInicio = new Date(inicio);
    const dataExpiracao = new Date(termino);

    // Somando 1 dia (24 horas) à data
    dataInicio.setTime(dataInicio.getTime() + 24 * 60 * 60 * 1000);
    dataExpiracao.setTime(dataExpiracao.getTime() + 24 * 60 * 60 * 1000);

    // // Referencia a coleção do usuário
    // const userDocRef = doc(db, "Usuarios", userId);

    // // Referencia a sub-coleção de recompensas
    // const recompensaDocRef = doc(collection( userDocRef, "Recompensas"), titulo)

    await setDoc(doc(db, "Recompensa", userId), {
      titulo: titulo,
      descricao: descricao,
      dataInicio: Timestamp.fromDate(dataInicio),
      dataExpiracao: Timestamp.fromDate(dataExpiracao),
      quantidade: Number(quantidade),
      verificado: false,
    });

    console.log(`Recompensa criada com sucesso: ${titulo}`);
    return { userId, titulo, descricao, dataInicio, dataExpiracao, quantidade};

  } catch (err) {
    console.error("Erro ao criar recompensa: ", err);
    throw err;
  }
}



async function verificarRecompensasExpiradas() {
  try {
    const colecaoRecompensas = collection(db, "Recompensas");
    const snapshot = await getDocs(colecaoRecompensas);

    snapshot.forEach(async (documento) => {
      const dados = documento.data();


      if (dados.dataExpiracao && dados.dataExpiracao.toDate() > new Date()) {
        await deleteDoc(documento.ref);
        console.log(`Recompensa ${documento.id} deletada por expiração.`);
      }
    });
  } catch (err) {
    console.error("Erro ao verificar recompensas expiradas: ", err);
    throw err;
  }
}

export { cadastroRecompensa, verificarRecompensasExpiradas };

