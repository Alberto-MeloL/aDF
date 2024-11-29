import { db } from "../SDK_FIREBASE"; // Configuração do Firebase
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; // Métodos do Firestore
import React, { useEffect, useState } from "react";
import style from "@/app/style/listarProjetos.module.css"; // Estilo CSS
import { useAuth } from "../service/authContext"; // Contexto de autenticação

function ListarProjetos() {
  const [projetos, setProjetos] = useState([]); // Estado para armazenar os projetos
  const [carregando, setCarregando] = useState(true); // Estado para controle do carregamento
  const [mensagem, setMensagem] = useState("");
  const { tipoUsuario } = useAuth() || {};

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const usuariosRef = collection(db, "Usuarios"); // Referência à coleção de usuários
        const usuariosSnapshot = await getDocs(usuariosRef); // Busca todos os usuários

        let todosProjetos = []; // Lista para armazenar todos os projetos
        for (const usuarioDoc of usuariosSnapshot.docs) {
          const usuarioData = usuarioDoc.data(); // Dados do usuário
          const projetosRef = collection(
            db,
            `Usuarios/${usuarioDoc.id}/Projetos`
          ); // Referência à subcoleção `Projetos`
          const projetosSnapshot = await getDocs(projetosRef);

          // Mapeia os projetos dessa subcoleção e adiciona na lista geral
          todosProjetos = [
            ...todosProjetos,
            ...projetosSnapshot.docs.map((projetoDoc) => ({
              id: projetoDoc.id,
              ...projetoDoc.data(),
              usuario: { id: usuarioDoc.id, ...usuarioData }, // Adiciona dados do usuário relacionado
            })),
          ];
        }

        setProjetos(todosProjetos); // Atualiza o estado com todos os projetos
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      } finally {
        setCarregando(false); // Finaliza o carregamento
      }
    };

    fetchProjetos();
  }, []);

  const aceitarProjeto = async (id) => {
    try {
      const projeto = projetos.find((p) => p.id === id);
      const projetoRef = doc(db, `Usuarios/${projeto.usuario.id}/Projetos`, id);
      const valor = prompt("Digite o valor que os usuários vão receber");
      if (!valor) return;

      // Atualiza o projeto no Firestore
      await updateDoc(projetoRef, {
        verificado: true,
        recompensa: Number(valor), // Atualiza os campos necessários
      });

      // Atualiza o estado local
      setProjetos((prevProjetos) =>
        prevProjetos.filter((projeto) => projeto.id !== id)
      );

      alert("Projeto aprovado com sucesso!");
    } catch (error) {
      console.error("Erro ao aceitar o projeto:", error);
    }
  };

  const reprovarProjeto = async (id) => {
    try {
      const projeto = projetos.find((p) => p.id === id);
      const projetoRef = doc(db, `Usuarios/${projeto.usuario.id}/Projetos`, id);
      await deleteDoc(projetoRef); // Exclui o projeto do Firestore

      // Atualiza o estado local
      setProjetos((prevProjetos) =>
        prevProjetos.filter((projeto) => projeto.id !== id)
      );

      alert("Projeto recusado e excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir o projeto:", error);
    }
  };

  const copiarTexto = (texto) => {
    const textarea = document.createElement("textarea");
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setMensagem("Texto copiado para a área de transferência!");
  };

  if (carregando) {
    return <div>Carregando projetos...</div>;
  }

  return (
    <div className={style.container}>
      {projetos.length === 0 ? (
        <p>Nenhum projeto encontrado.</p>
      ) : (
        <ul className={style.projetoLista}>
          {projetos.map((projeto) => (
            <li key={projeto.id} className={style.projetoItem}>
              <div className={style.projetos}>
                <div className={style.imagem}>
                  <img src="/logo.png" alt="Imagem do Projeto" />
                </div>
                <div className={style.informacoes}>
                  <h3>{projeto.nome}</h3>
                  <p>
                    <strong>Descrição:</strong> {projeto.descricao}
                  </p>
                  <p>
                    <strong>Local ou Valor:</strong> {projeto.localOuValor}
                  </p>
                  <div className={style.infoUsuario}>
                    <p>
                      <strong>Usuário:</strong> {projeto.usuario.email}{" "}
                      <button title={mensagem}
                        onClick={() => copiarTexto(projeto.usuario.email)}
                        className={style.btnCopiar}
                      >
                       <img src="/copiar.png"/>
                      </button>
                    </p>
                    <p>
                      <strong>Telefone:</strong> {projeto.usuario.telefone}
                    </p>
                  </div>
                  <p>
                    {projeto.vaquinha ? (
                      <p>
                        <strong>R$:</strong> {projeto.localOuValor}
                      </p>
                    ) : (
                      <p>
                        <strong>Local:</strong> {projeto.localOuValor}
                      </p>
                    )}
                  </p>
                  <div className={style.acoes}>
                    <button
                      className={style.btnRecusar}
                      onClick={() => reprovarProjeto(projeto.id)}
                    >
                      Recusar
                    </button>
                    <button
                      className={style.btnAprovar}
                      onClick={() => aceitarProjeto(projeto.id)}
                    >
                      Aceitar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListarProjetos;
