import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export enum SccMsg {
  LOGOUT_SUCCESS = "logout successfully",
  LOGIN_SUCCESS = "login successfully",
}

export enum ErrMsg {
  PLS_LOGIN = "please login",
}

class Notify {
    private notification = new Notyf({
        duration: 6000,
        position: {x: "left", y: "top" },
    })

    public success(message: string) {
        this.notification.success(message);
    }

    public error(err: any) {
        const msg = this.extractMsg(err);
        this.notification.error(msg);
    }

    private extractMsg(err: any) : string {

        if (typeof err === 'string') {
            return err;
        }

        if (typeof err?.response?.data?.value === "string") {
            return err?.response?.data?.value;
        }

        return "An error occurred, please try again.";
        }
    }

    const notify = new Notify();
    export default notify;