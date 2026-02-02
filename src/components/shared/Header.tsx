export function Header({ title }: {
    title: string
}) {
    return (
        <div className="flex items-center text-center sm:text-left">
            <h2 className="text-blue-900 font-semibold lg:text-4xl sm:text-3xl text-2xl">{title}</h2>
        </div>
    )
}