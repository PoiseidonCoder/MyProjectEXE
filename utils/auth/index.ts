import {
    ChangePasswordSchema,
    ForgotPasswordSchema,
    LoginSchema,
    OtpSchema,
    SignUpSchema,
} from "@/schemas";
import { z } from "zod";

export const handleSetNewPassword = async (
    data: z.infer<typeof ChangePasswordSchema>
) => {
    const { password } = data;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/reset-password`,
            {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const handleChangePassword = async (
    data: z.infer<typeof ChangePasswordSchema>,
    sessionToken: string
) => {
    const { password } = data;
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/change-password`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({ password }),
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const handleResetPassCode = async (data: z.infer<typeof OtpSchema>) => {
    const { pin } = data;
    try {
         await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/resetPasscode?code=${pin}`,
            {
                method: "POST",
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
    } catch (error) {
        console.log(error);
    }
};
export const handleSendResetCode = async (
    data: z.infer<typeof ForgotPasswordSchema>
) => {
    const { email } = data;
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/forgot-password?email=${email}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return result;
    } catch (error) {
        console.log(error);
    }
};

export const handleVerifyCode = async (data: z.infer<typeof OtpSchema>) => {
    const { pin } = data;
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/verify?code=${pin}`,
            {
                method: "POST",
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        const resultFromSv = await fetch("/api/auth/", {
            method: "POST",
            body: JSON.stringify(result.payload),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
        return resultFromSv;
    } catch (error) {
        console.log("Error while creating account",error);
    }
};

export const handleRegister = async (data: z.infer<typeof SignUpSchema>) => {
    const { ...registerData } = data;
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...registerData, role: "USER" }),
                credentials: "include",
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return result;
    } catch (error) {
        console.log("Error while creating account",error);
    }
};

export const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        const resultFromSv = await fetch("/api/auth/", {
            method: "POST",
            body: JSON.stringify(result.payload),
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
        return resultFromSv;
    } catch (error) {
        console.log("Error while creating account",error);
    }
};

export const handleLogout = async () => {
    try {
            await fetch(`${process.env.NEXT_PUBLIC_API}/auth/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(async (res) => {
            const payload = await res.json();
            const datas = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return datas;
        });
    } catch (error) {
        console.log("Error While Logout",error);
    }
};

export const getAuth = async (sessionToken: string) => {
    try {
        const result = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/login`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
            }
        ).then(async (res) => {
            const payload = await res.json();
            const data = {
                status: res.status,
                payload,
            };
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return data;
        });
        return result;
    } catch (error) {
        console.log("Error While Get Authentication",error);
    }
};
