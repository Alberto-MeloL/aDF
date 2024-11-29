"use client";
import style from "@/app/style/cadastroRecompensa.module.css";
import { useState } from "react";
import {
  cadastroRecompensa,
  verificarRecompensasExpiradas,
} from "../service/cadastroRecompensa";

function Recompensas() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");

  const criarNova = async (e) => {
    e.preventDefault();

    try {
      await verificarRecompensasExpiradas(); // Verifica recompensas expiradas antes de cadastrar
      await cadastroRecompensa(titulo, descricao, inicio, termino); // Cadastra nova recompensa
      alert("Recompensa cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao criar recompensa: ", err);
      alert("Erro ao cadastrar recompensa.");
    }
  };

  return (
    <div className={style.container}>
      <form className={style.formulario}>
        <input
          className={style.inputRecompensa}
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          className={style.inputRecompensa}
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
        <input
          className={style.inputRecompensa}
          type="date"
          value={inicio}
          onChange={(e) => setInicio(e.target.value)}
        />
        <input
          className={style.inputRecompensa}
          type="date"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
        />
        <button className={style.btnCriarRecompensa} onClick={criarNova}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Recompensas;
