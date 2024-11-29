import React, { useState } from "react";
import style from "@/app/style/cadastroRecompensa.module.css";

function cadastroRecompensaEmpresa() {
  // Estados para armazenar os valores dos inputs
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  // Função para lidar com o clique no botão "Criar"
  const criar = async () => {
    try {
      // Chama a função de cadastro com os valores dos estados
      await cadastroRecompensa(titulo, descricao);
      alert("Recompensa criada com sucesso!");

      // Limpa os campos após a criação do projeto
      setTitulo("");
      setDescricao("");
    } catch (err) {
      console.error("Erro ao criar recompensa:", err);
      alert("Erro ao criar recompensa, tente novamente.");
    }
  };

  return (
    <div className={style.criarProjeto}>
      <div className={style.adicionarImagem}></div>
      <form
        className={style.formularioProjeto}
        onSubmit={(e) => e.preventDefault()} // Evita o comportamento padrão do formulário
      >
        <input
          className={style.inputFormulario}
          placeholder="Titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          className={style.inputFormulario}
          placeholder="Descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <button
          className={style.btnCriarProjeto}
          type="button"
          onClick={criar}
        >
          Criar
        </button>
      </form>
    </div>
  );
}

export default cadastroRecompensaEmpresa;
