  "use client";
import { useState } from "react";
import style from "@/app/style/recompensa.module.css";
import { cadastroRecompensa } from "../service/cadastroRecompensa";
import { useRouter } from "next/navigation";

function Recompensa() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [inicio, setInicio] = useState("");
  const [termino, setTermino] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const router = useRouter()
  const criarNova = async (e) => {
    e.preventDefault();

    try {
      // await verificarRecompensasExpiradas(); // Verifica recompensas expiradas antes de cadastrar
      await cadastroRecompensa(titulo, descricao, inicio, termino, quantidade); // Cadastra nova recompensa
      setMensagem("Recompensa cadastrada com sucesso!");
    } catch (err) {
      router.push("/empresa-login")
      console.error("Erro ao criar recompensa: ", err);
      setMensagem("Erro ao cadastrar recompensa.");
    }
  };


  // Função para alternar a visibilidade do formulário usando display
  const alternarFormulario = () => {
    const formulario = document.getElementById("formRecompensa");
    const botao = document.getElementById("botaoAlternar");

    // Observa o estado/estilo atual da div
    const estiloForm = window.getComputedStyle(formulario);

    // Verifica o estado atual de visibilidade do formulário e alterna
    if (estiloForm.display === "none") {
      formulario.style.display = "flex";
      botao.textContent = "x";
      
    } else {
      formulario.style.display = "none";
      botao.textContent = "+";
    }
  };


  return (
    <>
      <div className={style.sectionRecompensa}>
        <form id="formRecompensa" className={style.form}>
          <h2 style={{ margin: 0 }}>Cadastre Recompensa</h2>
          <div className={style.infoForm}>
            <div className={style.containerInput}>
              {/* <label htmlFor="tituloRecompensa">Título da Recompensa</label> */}
              <input
              style={{color:'#797979', outline:'0'}}
                type="text"
                id="tituloRecompensa"
                placeholder="Título Recompensa"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>

            <div className={style.containerInput}>
              {/* <label htmlFor="descricaoRecompensa">Descrição da Recompensa</label> */}
              <textarea
              style={{border: '0', borderBottom: '1.5px solid orange',color:'#797979', outline:'0', fontFamily:'Gill Sans MT' }}
                id="descricaoRecompensa"
                placeholder="Descrição Recompensa"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>

            <div className={style.containerInput}>
              {/* <label htmlFor="dataInicio">Data Início</label> */}
              <input
              style={{color:'#797979', outline:'0'}}
                type="date"
                // placeholder="Início"
                value={inicio}
                onChange={(e) => { setInicio(e.target.value, 0) }}
              // requires
              />
            </div>
            <div className={style.containerInput}>
              {/* <label htmlFor="dataFinal">Data Final</label> */}
              <input
              style={{color:'#797979', outline:'0'}}
                type="date"
                // placeholder="Final"
                value={termino}
                onChange={(e) => { setTermino(e.target.value, 0) }}
              // required
              />
            </div>
            <div className={style.containerInput}>
              {/* <label htmlFor="quantidade">Quantidade</label> */}
              <input
              style={{color:'#797979', outline:'0'}}
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => { setQuantidade(e.target.value, 0) }}
              // required
              />
            </div>

            {mensagem && <p className={style.mensagem}>{mensagem}</p>}

            <button className={style.btnCadastroRecompensa} onClick={criarNova}>Cadastrar</button>
          </div>
        </form>
      </div>

      {/* Botão com id para alternar o formulário */}
      <button id="botaoAlternar" className={style.buttonCadastrarRecompensa} onClick={alternarFormulario}>
        +
      </button>
    </>
  );
}

export default Recompensa;
