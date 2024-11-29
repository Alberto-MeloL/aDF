// EmpresaCadastro.js

"use client";

import style from "@/app/style/cadastroEmpresa.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import criarUsuario from "../service/criarUsuarioEmpresa";

function EmpresaCadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarDados = async (e) => {
    e.preventDefault();
    try {
      // Chamada da função criarUsuario para cadastrar e armazenar dados no Firestore
      await criarUsuario(nome, email, cnpj, senha);
      setMensagem(`Usuário criado com sucesso: ${email}`);
    } catch (err) {
      setMensagem(`Erro ao criar usuário: ${err.message}`);
    }
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.containerFormulario}>
          <form className={style.formulario} onSubmit={enviarDados}>
            <div className={style.inputCadastro}>
              <h3>Torne-se um Parceiro</h3>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                placeholder="Nome"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="E-mail"
              />
              <input
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                required
                placeholder="CNPJ"
              />
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="Senha"
              />
            </div>
            <button className={style.btnCadastro} type="submit">
              Cadastrar
            </button>
          </form>
          <div className={style.login}>
            <p>Já criou sua conta?</p>
            <p>Então faça seu login</p>
            <button className={style.btnLogin}>Entrar</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmpresaCadastro;
