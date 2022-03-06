import { createContext, useEffect, useState } from "react";

// Class
import ClsUsuario from "./ClsUsuario";

// Interfaces
import { IUsuario, IUsuarioContextProps } from "./Usuario.interfaces";

// initialState
import { initialStateUser } from "./initialState";

// Context
export const UsuarioContext = createContext({} as IUsuarioContextProps);

const UsuarioProvider = ({ children }: any) => {
  const [usuario, setUsuario] = useState<IUsuario>(initialStateUser);
  const [loadUsuario, setLoadUsuario] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await ClsUsuario.whoAmI();
      setUsuario(res);
    } catch (error) {
      const res = await ClsUsuario.publico();
      setUsuario(res);
    }
    setLoadUsuario(true);
  };

  useEffect(() => {
    getData();
    return () => setUsuario(initialStateUser);
  }, []);

  return <UsuarioContext.Provider value={{ usuario, setUsuario, loadUsuario }}>{children}</UsuarioContext.Provider>;
};

export default UsuarioProvider;
