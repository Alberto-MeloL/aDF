"use client";

import Link from "next/link";
import style from "@/app/style/header.module.css";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../SDK_FIREBASE";

function Header() {
  const router = useRouter();
  const [usuarioLogado, setUsuarioLogado] = useState(null); // Definindo o estado
  const [hasShadow, setHasShadow] = useState(false);

  // Criando efeito header
  useEffect(()=>{
    const handleScroll = () =>{
      if (window.scrollY > 0) {
        setHasShadow(true);
      }else{
        setHasShadow(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return()=>{
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Monitore o estado de autenticação do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuarioLogado(user); // Atualiza o estado quando o usuário está logado
      } else {
        setUsuarioLogado(null); // Reseta o estado quando não há usuário logado
      }
    });

    // Limpa o listener quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // Função de logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logout realizado com sucesso!");
        router.push("/"); // Redireciona o usuário para a página inicial
      })
      .catch((error) => {
        console.error("Erro ao realizar logout:", error);
      });
  };

  // Função para mudar de página com base no valor selecionado no select
  const mudarPagina = (event) => {
    const value = event.target.value;
    if (value === "entrar") {
      router.push("/home-empresa");
    } else if (value === "registrar") {
      router.push("/home-empresa");
    } else if (value === "administrador-login") {
      router.push("/administrador-login");
    } else if (value === "empresa-login") {
      router.push("/empresa-login");
    } else if (value === "empresa-cadastro") {
      router.push("/empresa-cadastro");
    } else if (value === "usuario") {
      router.push("/usuario");
    }
  };

  return (
    <header className={`${style.header} ${hasShadow? style.shadow :''}`}>
      <nav className={style.nav}>
        <div className={style.linksNavegacao}>
          {/* Usando Link para navegação */}
          <Link href="/">Início</Link>
          <Link href="/projetos">Projetos</Link>
          <Link href="/listar-recompensas">Recompensas</Link>
        </div>
        {usuarioLogado ? (
          // Fragmento React para agrupar múltiplos elementos sem criar um nó no DOM
          <>
            <p>Bem-vindo, {usuarioLogado.email}</p>
            <button onClick={logout}>Sair</button>
          </>
        ) : (
          <div className={style.autenticacao}>
            {/* Select para navegação */}
            <select className={`${style.btnLogin} ${style.btnCadLog}`} onChange={mudarPagina}>
              <option value="entrar">Entrar</option>
              <option value="empresa-login">Empresa</option>
              <option value="administrador-login">Administrador</option>
              <option value="usuario">Usuário</option>
            </select>

            {/* Select para registro */}
            <select className={`${style.btnCadastro} ${style.btnCadLog}`} onChange={mudarPagina}>
              <option value="registrar">Registrar</option>
              <option value="empresa-cadastro">Empresa</option>
              <option value="usuario">Usuário</option>
            </select>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
