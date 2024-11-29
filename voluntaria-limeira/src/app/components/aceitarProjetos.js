import style from "@/app/style/aceitarProjetos.module.css";
function AceitarProjetos() {
  return (
    <div className={style.containerProjetos}>
      <div className={style.projetos}>
        <div className={style.imagemProjeto}>
          <img src="" alt="" />
        </div>
        <div className={style.informacoes}>
          <h4 className={style.titulo}></h4>
          <p className={style.descricao}></p>
          <div className={style.infoUsuario}>
            <p className={style.email}></p>
            <p className={style.telefone}></p>
          </div>
          <p className={style.endereco}></p>

          <div className={style.aprovacao}>
            <p className={style.categoria}></p>
            <div className={style.acoes}>
              <button className={style.reprovar}>X</button>
              <button className={style.aprovar}>✓</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AceitarProjetos;
