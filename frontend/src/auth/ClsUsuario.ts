import { ReactText } from 'react';

// Toast
import { toast, ToastOptions } from 'react-toastify';

//Services
import { logIn, publico, register, whoAmI } from './Auth.service'

// initialStateUser
import { initialStateUser } from './initialState';

// Interfaces
import { IUsuario } from './Usuario.interfaces';

class ClsUsuario {

    private toastId: ReactText;
    private configToast: ToastOptions;
    constructor() {
        this.toastId = "";
        this.configToast = {
            autoClose: 2000,
            closeButton: true,
            draggable: true
        }
    }

    async logIn(username: string, password: string): Promise<IUsuario | undefined> {
        try {
            this.toastId = toast.loading("Por favor espere...");
            const res = await logIn(username, password);
            const { data } = res;
            const { token, user, success, error } = data;
            localStorage.setItem("token", `${token}`);
            if (success) {
                toast.update(this.toastId, Object.assign({ render: success, type: "success", isLoading: false }, this.configToast));
                return user;
            }
            toast.update(this.toastId, Object.assign({ render: `No se pudo iniciar sesión: ${error}`, type: "error", isLoading: false }, this.configToast));
        } catch (error: any) {
            toast.update(this.toastId, Object.assign({ render: `No se pudo iniciar sesión: ${error.message}`, type: "error", isLoading: false }, this.configToast));
        }
        return initialStateUser;
    }
    async register(username: string, password: string): Promise<IUsuario> {
        try {
            this.toastId = toast.loading("Por favor espere...");
            const res = await register(username, password);
            const { data } = res;
            const { token, user, success, error } = data;
            localStorage.setItem("token", `${token}`);
            if (success) {
                toast.update(this.toastId, Object.assign({ render: success, type: "success", isLoading: false }, this.configToast));
                return user || initialStateUser;
            }
            toast.update(this.toastId, Object.assign({ render: `No se pudo registrar: ${error}`, type: "error", isLoading: false }, this.configToast));
        } catch (error: any) {
            toast.update(this.toastId, Object.assign({ render: `No se pudo registrar: ${error.message}`, type: "error", isLoading: false }, this.configToast));
        }
        return initialStateUser;
    }
    async whoAmI(): Promise<IUsuario> {
        const res = await whoAmI();
        const { data } = res;
        const { user } = data;
        return user || initialStateUser;
    }
    async logOut() {
        this.toastId = toast.loading("Por favor espere...");
        await localStorage.removeItem('token');
        toast.update(this.toastId, Object.assign({ render: "Sesión Cerrada", type: "success", isLoading: false }, this.configToast));
    }
    async publico(): Promise<IUsuario> {
        const res = await publico();
        const { data } = res;
        const { token } = data;
        localStorage.setItem("token", `${token}`);
        return initialStateUser;
    }
}

export default new ClsUsuario();