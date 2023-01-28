import axios from "axios";
import { AuthModel } from "../Models/AuthModel";
import { CredentialsModel } from "../Models/CredentialsModel";
import globals from "../Services/Globals";

export async function login(credentials: CredentialsModel){
    return await axios.post<AuthModel>(globals.urls.auth + 'login', credentials)
}