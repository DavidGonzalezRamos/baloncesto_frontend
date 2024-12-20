import api from "../lib/axios";
import { isAxiosError } from "axios";
import { CheckPasswordForm, Confirmtoken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";


export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = '/auth/create-account'
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function confirmAccount(formData: Confirmtoken) {
  try {
    const url = '/auth/confirm-account'
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function requestConfirmationCode(formData: RequestConfirmationCodeForm) {
  try {
    const url = '/auth/request-code'
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function loginUser(formData: UserLoginForm) {
  try {
    const url = '/auth/login'
    const {data} = await api.post<string>(url, formData);
    localStorage.setItem('AUTH_TOKEN', data);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
  try {
    const url = '/auth/forgot-password'
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function validateToken(formData: Confirmtoken) {
  try {
    const url = '/auth/validate-token'
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function updatePasswordWithToken({formData, token}: {formData: NewPasswordForm, token: Confirmtoken['token']}) {
  try {
    const url = `/auth/update-password/${token}`
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}

export async function getUser() {
  // Verificar si el token está en localStorage
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) {
    throw new Error("No autorizado"); // Lanza un error si no hay token
  }

  try {
    // Realizar la solicitud solo si hay un token
    const { data } = await api.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}` // Asegurarse de que se envía el token en la cabecera
      }
    });

    // Validar la respuesta con `safeParse`
    const response = userSchema.safeParse(data);
    if (response.success) {
      return response.data;
    } else {
      throw new Error("Error en los datos del usuario"); // Error si la validación falla
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al obtener el usuario");
  }
}

export async function checkPassword(formData: CheckPasswordForm){
  try {
    const url = '/auth/check-password'
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if(isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
