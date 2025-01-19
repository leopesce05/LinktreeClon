
type ErrorMessageProps = {
    children: React.ReactNode; // El tipo correcto para children
}

export default function ErrorMessage({children}: ErrorMessageProps) {
    return (
        <p className="text-red-500 p-3 text-sm uppercase bg-red-100 rounded-lg text-center">
            {children}
        </p>
    )
}
