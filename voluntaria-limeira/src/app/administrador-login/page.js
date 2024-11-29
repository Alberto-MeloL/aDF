"use client"; //para que serve isso
import style from "@/app/style/administradorLogin.module.css";
import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import loginAdministrador from "../service/loginAdministrador";

function AdministradorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState(""); //me explique isso
  const [senha, setSenha] = useState("");

  const loginUsuario = async (e) => {
    e.preventDefault();
    try {
      const administradorLogado = await loginAdministrador(email, senha);
      console.log(`Login realizado com sucesso ${administradorLogado.email}`);

      router.push("/");
      // validar que e adm, para mostrar as funcionalidades
    } catch (err) {
      console.error(`Houve um erro ao realizar o login ${err}`);
    }
  };
  return (
    <>
      <Header />

      <div className={style.container}>
        <div className={style.containerFormulario}>
          <form className={style.formulario}>
            <div className={style.imagem}>
              <img
                src="/loginAdm.png"
                alt="Imagem de tela de login do administrador"
              />
            </div>
            <div className={style.containerFormulario}>
              <h4 className={style.titulo}>Login</h4>
              <input
                className={style.inputAdm}
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={style.inputAdm}
                type="password"
                placeholder="SENHA"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <p className={style.recuperarSenha} /*onClick={recuperarSenha}*/>
                Esqueceu sua senha?
              </p>
              <button className={style.btnLogin} type="submit" onClick={loginUsuario}>
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdministradorLogin;
