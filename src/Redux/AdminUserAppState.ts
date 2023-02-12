import { UserModel } from "../Models/UserModel";

export class AdminUserAppState {
  public users: UserModel[] = [];
}

export enum UserActionType {
  UsersDownloaded = "UsersDownloaded",
  UserAdded = "UserAdded",
  UserUpdated = "UserUpdated",
  UserDeleted = "UserDeleted",
  UsersClear = "UsersClear",
}

export interface UserAction {
  type: UserActionType;
  payload?: any;
}

export function usersDownloadedAction(users: UserModel[]): UserAction {
  return { type: UserActionType.UsersDownloaded, payload: users };
}

export function userAddedAction(user: UserModel): UserAction {
  return { type: UserActionType.UserAdded, payload: user };
}

export function userUpdateAction(user: UserModel): UserAction {
  return { type: UserActionType.UserUpdated, payload: user };
}

export function userDeleteAction(id: number): UserAction {
  return { type: UserActionType.UserDeleted, payload: id };
}

export function usersClearAction(): UserAction {
  return { type: UserActionType.UsersClear, payload: {} };
}

export function adminUsersReducer(
  currentState: AdminUserAppState = new AdminUserAppState(),
  action: UserAction
): AdminUserAppState {
  const newState = { ...currentState};
  switch (action.type) {
    case UserActionType.UsersDownloaded:
        newState.users = action.payload;
        break;
    case UserActionType.UserAdded:
        newState.users.push(action.payload);
        break;
    case UserActionType.UserUpdated:
        const idx = newState.users.findIndex(user => user.id === action.payload.id);
        newState.users[idx] = action.payload;
        break;
    case UserActionType.UserDeleted:
        newState.users = newState.users.filter(user => user.id !== action.payload);
        break;
    case UserActionType.UsersClear:
        newState.users = [];
        break;
  }
  return newState;
}
