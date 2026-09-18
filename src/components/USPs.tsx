export const USPs = () => {
    const items = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H18.375a1.875 1.875 0 001.875-1.875V6.75A1.875 1.875 0 0018.375 4.875h-8.25A1.875 1.875 0 008.25 6.75v11.25m0 0H5.625a1.125 1.125 0 01-1.125-1.125V14.25" />
                </svg>
            ),
            title: 'Livraison offerte',
            desc: 'Pour toutes les commandes',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                </svg>
            ),
            title: 'Retours gratuits',
            desc: 'Sous 30 jours',
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
            ),
            title: 'Paiement 100% sécurisé',
            desc: 'Stripe, crypté et sans danger',
        },
    ]

    return (
        <section className="my-12 lg:my-20">
            <div className="max-w-5xl mx-auto px-5">
                <h2 className="text-center text-2xl md:text-3xl font-bold text-text-primary mb-10 lg:mb-14 font-unbounded">
                    Les avantages Où est Médor ?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.title}
                            className="flex flex-col items-center text-center gap-3 p-6"
                        >
                            <div className="text-accent">
                                {item.icon}
                            </div>
                            <div>
                                <p className="font-semibold text-text-primary">{item.title}</p>
                                <p className="text-sm text-text-secondary mt-0.5">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
