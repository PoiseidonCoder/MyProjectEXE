import {  z } from "zod";
export const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address!" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long!" }),
    isRemember: z.boolean(),
});

export const SignUpSchema = z
    .object({
        firstName: z.string({
            message: "Please enter your first name!",
        }),
        lastName: z.string({
            message: "Please enter your last name!",
        }),
        email: z
            .string()
            .email({ message: "Please enter valid email address!" }),
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long!",
        }),
        confirmPassword: z.string().min(6),

        isSendMail: z.boolean(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });
export const OtpSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});
export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Please enter valid email address!" }),
});

export const ChangePasswordSchema = z
    .object({
        password: z.string().min(6, {
            message: "Password must be at least 6 characters long!",
        }),
        confirmPassword: z.string().min(6),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ["confirmPassword"],
            });
        }
    });