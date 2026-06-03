import { useState } from 'react'

type AccordionItem = {
    name: string
    label: string
    content: React.ReactNode
}

type Props = {
    items: AccordionItem[]
}

export const ProductAccordion = ({ items }: Props) => {
    const [open, setOpen] = useState<string | null>(null)
    const toggle = (name: string) => setOpen(open === name ? null : name)

    return (
        <div className="pt-2">
            {items.map((item) => (
                <div key={item.name} className="border-b border-gray-200">
                    <button
                        onClick={() => toggle(item.name)}
                        className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-dark-grey hover:text-orange-400 transition-colors"
                    >
                        {item.label}
                        <svg className={`w-4 h-4 transition-transform ${open === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {open === item.name && (
                        <div className="pb-4 text-sm text-text-secondary leading-relaxed">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
