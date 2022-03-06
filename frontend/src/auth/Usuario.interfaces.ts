export interface IUsuario {
    id: string;
    username: string;
    enabled: number;
    rango: string;
}
export interface IUsuarioContextProps {
    usuario: IUsuario;
    setUsuario: Function;
    loadUsuario: boolean;
}

export interface UserRequest {
    token?: string;
    user?: IUsuario,
    success?: string;
    error?: string;
}