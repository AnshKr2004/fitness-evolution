interface StatsCardProps {
    icon: React.ReactNode
    title: string
    value: string
    className?: string
}

export function StatsCard({ icon, title, value, className = "" }: StatsCardProps) {
    return (
        <div className={`rounded-lg p-6 ${className}`}>
            <div className="flex items-center">
                <div className="mr-4">{icon}</div>
                <div>
                    <p className="text-sm font-medium text-white/70">{title}</p>
                    <h3 className="text-2xl font-bold text-white">{value}</h3>
                </div>
            </div>
        </div>
    )
}  