import { TransactionModel } from "../Models/TransactionModel";
import { UserStockModel } from "../Models/UserStockModel";
import globals from "../Services/Globals";
import tokenAxios from "../Services/InterceptorAxios";

export async function getStocks() {
    return await tokenAxios.get<UserStockModel[]>(globals.urls.user);
}

export async function getStock(id: number) {
    return await tokenAxios.get<UserStockModel>(globals.urls.user + id);
}

export async function makeTransaction(transaction: TransactionModel){
    return await tokenAxios.post<UserStockModel>(globals.urls.user + "transaction", transaction); 
}