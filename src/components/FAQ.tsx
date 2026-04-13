import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from "./tailgrids/core/accordion";


export function FaqAccordion() {
    return (
        <AccordionRoot variant="style_four">
            <AccordionItem>
                <AccordionTrigger>Est-ce qu’une application est nécessaire pour scanner le Tag ?</AccordionTrigger>
                <AccordionContent>
                    We offer a 30-day return policy on all unused items in their original
                    packaging.
                </AccordionContent>
            </AccordionItem>

            <AccordionItem>
                <AccordionTrigger>Que se passe t-il lorsque quelqu’un scanne mon Tag ?</AccordionTrigger>
                <AccordionContent>
                    Standard shipping typically takes 5-7 business days. Express options
                    are available at checkout.
                </AccordionContent>
            </AccordionItem>
        </AccordionRoot>
    );
}
