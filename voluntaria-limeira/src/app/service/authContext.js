"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../SDK_FIREBASE"; // Certifique-se de que as importações estão corretas
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Criação do contexto de autenticação
const AuthContext = createContext();

// Função para prover o contexto de autenticação
export function AuthProvider({ children }) {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUsuarioLogado(user);
        try {
          setCarregando(true);

          const refEmpresa = doc(db, "Empresa", user.uid);
          const docEmpresa = await getDoc(refEmpresa);

          if (docEmpresa.exists()) {
            setTipoUsuario("Empresa");
          } 

          const refAdministrador = doc(db, "Administradores", user.email);
          const docAdministrador = await getDoc(refAdministrador);

          if (docAdministrador.exists()) {
            console.log("Usuário é Administrador");
            setTipoUsuario("Administrador");
          } 

        } catch (err) {
          console.error(`Erro ao buscar dados do usuário: ${err}`);
        } finally {
          setCarregando(false);
        }
      } else {
        setUsuarioLogado(null);
        setTipoUsuario("");
        setCarregando(false);
      }
    });

    return () => unsubscribe();
  }, []);

  console.log("AuthProvider:", { usuarioLogado, tipoUsuario, carregando });

  return (
    <AuthContext.Provider value={{ usuarioLogado, tipoUsuario, carregando }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook para usar o contexto de autenticação
export function useAuth() {
  return useContext(AuthContext);
}
