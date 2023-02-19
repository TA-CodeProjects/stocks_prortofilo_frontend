import { StockModel } from "../Models/StockModel";
import { UserModel } from "../Models/UserModel";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getStocks() {
  return await tokenAxios.get<StockModel[]>(globals.urls.admin +"stock")
}

export async function addStock(stock: StockModel) {
  return await tokenAxios.post<StockModel>(globals.urls.admin +"stock", stock);
}

export async function deleteStock(id: number) {
  return await tokenAxios.delete<any>(globals.urls.admin + "stock/" + id);
}

export async function getUsers() {
    return await tokenAxios.get<UserModel[]>(globals.urls.admin + "user");
}

export async function getUser(id: number) {
  return await tokenAxios.get<UserModel>(globals.urls.admin + "user/" + id);
}

export async function addUser(user: UserModel) {
  return await tokenAxios.post<UserModel>(globals.urls.admin + "user" , user);
}

export async function deleteUser(id: number) {
  return await tokenAxios.delete<any>(globals.urls.admin + "user/" + id);
}

export async function updateUser(id: number, user: UserModel) {
  return await tokenAxios.put<UserModel>(globals.urls.admin + "user/" + id, user );
}