export type User = {
    name: string
    email: string
    handle: string
}

export type RegisterForm = User & {
    password: string
    password_confirmation: string
}