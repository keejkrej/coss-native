import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/registry/nativewind/components/ui/accordion';
import { Text } from '@/registry/nativewind/components/ui/text';

function AccordionPreview() {
  return (
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-sm">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <Text>Is it accessible?</Text>
        </AccordionTrigger>
        <AccordionContent>
          <Text>Yes. It follows WAI-ARIA design patterns.</Text>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const accordionPreviews = [{ name: 'Default', component: AccordionPreview }];
