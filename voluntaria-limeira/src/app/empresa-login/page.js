"use client";

import style from "@/app/style/loginEmpresa.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginUsuario from "../service/loginEmpresa";
function EmpresaLogin() {
  // entender isso
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  // porque nao fazer uma funcao direta, ao inves de uma const
  // async
  const fazerLogin = async (e) => {
    e.preventDefault();
    try {
      const usuarioLogado = await loginUsuario(email, senha);
      console.log(`Usuário logado com sucesso ${usuarioLogado}`);
      setMensagem(`Logado como ${usuarioLogado.email}`);
      router.push("/");
    } catch (err) {
      setMensagem(
        "Houve um erro ao fazer o login, verifique suas credenciais."
      );
      console.error(`Houve um erro ao fazer o login ${err}`);
    }
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.containerFormulario}>
          <form className={style.formulario}>
            <div className={style.inputLogin}>
              <p className={style.mensagem} >{mensagem}</p>
              <h3>Torne-se um Parceiro</h3>
              <input
                type="email"
                value={email}
                placeholder="E-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                value={senha}
                placeholder="Senha"
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <button className={style.btnLogin} onClick={fazerLogin}>
              Entrar
            </button>
          </form>
          <div className={style.cadastro}>
            <p>Quer se tornar um parceiro?</p>

            <button className={style.btnLogin}>Registrar</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EmpresaLogin;
