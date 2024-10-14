import api from "../lib/axios";
import { isAxiosError } from "axios";
import { Confirmtoken, ForgotPasswordForm, NewPasswordForm, RequestConfirmationCodeForm, UserLoginForm, UserRegistrationForm, userSchema } from "../types";


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
  try {
    const {data}= await api.get('/auth/user');
    const response = userSchema.safeParse(data);
    if(response.success){
      return response.data;
    }
  } catch (error) {
   if(isAxiosError(error) && error.response) {
     throw new Error(error.response.data.error);
   }
  }
}
