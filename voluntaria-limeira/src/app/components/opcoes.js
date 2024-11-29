import style from "@/app/style/opcoes.module.css";

function MobileWeb() {
  return (
    <div className={style.opcoes}>
      <div className={style.publico}>
        <div className={style.apresentacao}>
          <img
            src="/app.png"
            className={style.imagem}
            alt="Voluntaria Limeira App"
          />
          <div className={style.informacoes}>
            <h1 className={style.titulo}>Baixe o Aplicativo !</h1>
            <p className={style.explicacao}>
              O Aplicativo <span className={style.app}>Voluntaria Limeira</span>
              , te dará uma experiência intuitiva e simples para ajudar o
              próximo, possibilitando o ganho de recompendsas.
            </p>
          </div>
        </div>
      </div>
      <div className={style.empresas}></div>
    </div>
  );
}
export default MobileWeb;
