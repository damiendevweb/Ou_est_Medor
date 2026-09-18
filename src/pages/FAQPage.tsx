import { FaqAccordion } from '../components/FAQ'

export const FAQPage = () => {
    return (
        <div className="max-w-3xl mx-auto px-5 py-12">
            <h1 className="font-unbounded text-3xl md:text-4xl font-bold text-text-primary mb-8">
                Questions fréquentes
            </h1>
            <FaqAccordion />
        </div>
    )
}
