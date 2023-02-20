import axios from "axios";
import { AuthModel } from "../Models/AuthModel";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import globals from "../Services/Globals";

export async function login(credentials: CredentialsModel){
    return await axios.post<AuthModel>(globals.urls.auth + 'login', credentials)
}

export async function userRegister(user: UserModel) {
    return await axios.post<any>(globals.urls.auth + "register", user);
}