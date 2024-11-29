"use client";

import Footer from "../components/footer";
import Header from "../components/header";
import style from "@/app/style/projetos.module.css";
import ListarRecompensas from "../components/listarRecompensas";

function RecompensasListadas() {
  return (
    <>

      <Header />
      <div className={style.container}>
        <ListarRecompensas/>
        <hr />
      </div>
      <Footer />
    </>
  );
}

export default RecompensasListadas;
