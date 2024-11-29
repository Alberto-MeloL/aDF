"use client";

import Footer from "../components/footer";
import Header from "../components/header";
import style from "@/app/style/projetos.module.css";
import ListarProjetos from "../components/listarProjetos";

function Projetos() {

  return (
    <>
      <Header />
      <div className={style.container}>
      <ListarProjetos/>
        <hr />
      </div>
      <Footer />
    </>
  );
}

export default Projetos;
