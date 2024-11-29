import style from "@/app/style/usuario.module.css";
import Header from "../components/header";
import Footer from "../components/footer";

function Usuario(){
    return (
      <>
        <Header />
        <div className={style.alerta}>
          <h3 className={style.titulo}>Para "Usuários" !</h3>
          <p className={style.informacao}>
            Para fazer login ou cadastro você deve instalar o nosso App
            "VoluntariaLimeiraApp". A web está disponivel apenas para
            <strong> empresas/administradores</strong>.
          </p>
        </div>
        <Footer />
      </>
    );
}

export default Usuario;