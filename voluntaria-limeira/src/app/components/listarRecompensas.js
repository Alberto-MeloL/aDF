import { db } from "../SDK_FIREBASE"; // Importa sua configuração do Firebase
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import style from "@/app/style/listarRecompensas.module.css";

function ListarRecompensas() {
  const [recompensas, setRecompensas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchRecompensas = async () => {
      try {
        const recompensasRef = collection(db, "Recompensa");
        const recompensasSnapshot = await getDocs(recompensasRef);

        const listaRecompensas = recompensasSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((rec) => !rec.verificado); // Filtra apenas as recompensas não verificadas

        setRecompensas(listaRecompensas);
      } catch (error) {
        console.error("Erro ao buscar recompensas:", error);
      } finally {
        setCarregando(false);
      }
    };

    fetchRecompensas();
  }, [])  ;

  // Função para aceitar uma recompensa
  const handleAceitar = async (id) => {
    try {
      const recompensaRef = doc(db, "Recompensa", id);
      await updateDoc(recompensaRef, { verificado: true }); // Atualiza o campo 'verificado' para true
      alert("Recompensa aceita com sucesso!");
      setRecompensas((prev) => prev.filter((rec) => rec.id !== id)); // Remove do estado
    } catch (error) {
      console.error("Erro ao aceitar recompensa:", error);
    }
  };

  // Função para recusar (excluir) uma recompensa
  const handleRecusar = async (id) => {
    try {
      const recompensaRef = doc(db, "Recompensa", id);
      await deleteDoc(recompensaRef); // Exclui o documento do Firestore
      alert("Recompensa recusada e excluída com sucesso!");
      setRecompensas((prev) => prev.filter((rec) => rec.id !== id)); // Remove do estado
    } catch (error) {
      console.error("Erro ao excluir recompensa:", error);
    }
  };

  if (carregando) {
    return <div>Carregando recompensas...</div>;
  }

  return (
    <div className={style.container}>
      <h2>Lista de Recompensas Não Aprovadas</h2>
      {recompensas.length === 0 ? (
        <p>Nenhuma recompensa pendente.</p>
      ) : (
        <ul className={style.listaRecompensas}>
          {recompensas.map((recompensa) => (
            <li key={recompensa.id} className={style.itemRecompensa}>
              <h3>{recompensa.titulo}</h3>
              <p>
                <strong>Descrição:</strong> {recompensa.descricao}
              </p>
              <p>
                <strong>Quantidade:</strong>{" "}
                {recompensa.quantidade ?? "Indefinido"}
              </p>
              <p>
                <strong>Data Início:</strong>{" "}
                {new Date(recompensa.dataInicio).toLocaleDateString("pt-BR")}
              </p>
              <p>
                <strong>Data Expiração:</strong>{" "}
                {new Date(recompensa.dataExpiracao).toLocaleDateString("pt-BR")}
              </p>
              <div className={style.botoes}>
                <button
                  className={style.botaoAceitar}
                  onClick={() => handleAceitar(recompensa.id)}
                >
                  Aceitar
                </button>
                <button
                  className={style.botaoRecusar}
                  onClick={() => handleRecusar(recompensa.id)}
                >
                  Recusar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListarRecompensas;
