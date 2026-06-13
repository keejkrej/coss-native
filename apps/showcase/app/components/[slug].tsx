import { PreviewCarousel } from '@showcase/components/preview-carousel';
import { Stack, useLocalSearchParams } from 'expo-router';
import { accordionPreviews } from '@showcase/previews/accordion';
import { alertPreviews } from '@showcase/previews/alert';
import { alertDialogPreviews } from '@showcase/previews/alert-dialog';
import { avatarPreviews } from '@showcase/previews/avatar';
import { badgePreviews } from '@showcase/previews/badge';
import { breadcrumbPreviews } from '@showcase/previews/breadcrumb';
import { buttonPreviews } from '@showcase/previews/button';
import { cardPreviews } from '@showcase/previews/card';
import { checkboxPreviews } from '@showcase/previews/checkbox';
import { checkboxGroupPreviews } from '@showcase/previews/checkbox-group';
import { collapsiblePreviews } from '@showcase/previews/collapsible';
import { dialogPreviews } from '@showcase/previews/dialog';
import { emptyPreviews } from '@showcase/previews/empty';
import { fieldPreviews } from '@showcase/previews/field';
import { fieldsetPreviews } from '@showcase/previews/fieldset';
import { formPreviews } from '@showcase/previews/form';
import { framePreviews } from '@showcase/previews/frame';
import { groupPreviews } from '@showcase/previews/group';
import { inputPreviews } from '@showcase/previews/input';
import { inputGroupPreviews } from '@showcase/previews/input-group';
import { kbdPreviews } from '@showcase/previews/kbd';
import { labelPreviews } from '@showcase/previews/label';
import { menuPreviews } from '@showcase/previews/menu';
import { meterPreviews } from '@showcase/previews/meter';
import { paginationPreviews } from '@showcase/previews/pagination';
import { popoverPreviews } from '@showcase/previews/popover';
import { previewCardPreviews } from '@showcase/previews/preview-card';
import { progressPreviews } from '@showcase/previews/progress';
import { radioGroupPreviews } from '@showcase/previews/radio-group';
import { scrollAreaPreviews } from '@showcase/previews/scroll-area';
import { selectPreviews } from '@showcase/previews/select';
import { separatorPreviews } from '@showcase/previews/separator';
import { sheetPreviews } from '@showcase/previews/sheet';
import { skeletonPreviews } from '@showcase/previews/skeleton';
import { sliderPreviews } from '@showcase/previews/slider';
import { switchPreviews } from '@showcase/previews/switch';
import { tablePreviews } from '@showcase/previews/table';
import { tabsPreviews } from '@showcase/previews/tabs';
import { textPreviews } from '@showcase/previews/text';
import { textareaPreviews } from '@showcase/previews/textarea';
import { toastPreviews } from '@showcase/previews/toast';
import { togglePreviews } from '@showcase/previews/toggle';
import { toggleGroupPreviews } from '@showcase/previews/toggle-group';
import { toolbarPreviews } from '@showcase/previews/toolbar';
import { tooltipPreviews } from '@showcase/previews/tooltip';

const PREVIEWS: Record<string, { name: string; component: () => React.JSX.Element }[]> = {
  accordion: accordionPreviews,
  alert: alertPreviews,
  'alert-dialog': alertDialogPreviews,
  avatar: avatarPreviews,
  badge: badgePreviews,
  breadcrumb: breadcrumbPreviews,
  button: buttonPreviews,
  card: cardPreviews,
  checkbox: checkboxPreviews,
  'checkbox-group': checkboxGroupPreviews,
  collapsible: collapsiblePreviews,
  dialog: dialogPreviews,
  empty: emptyPreviews,
  field: fieldPreviews,
  fieldset: fieldsetPreviews,
  form: formPreviews,
  frame: framePreviews,
  group: groupPreviews,
  input: inputPreviews,
  'input-group': inputGroupPreviews,
  kbd: kbdPreviews,
  label: labelPreviews,
  menu: menuPreviews,
  meter: meterPreviews,
  pagination: paginationPreviews,
  popover: popoverPreviews,
  'preview-card': previewCardPreviews,
  progress: progressPreviews,
  'radio-group': radioGroupPreviews,
  'scroll-area': scrollAreaPreviews,
  select: selectPreviews,
  separator: separatorPreviews,
  sheet: sheetPreviews,
  skeleton: skeletonPreviews,
  slider: sliderPreviews,
  switch: switchPreviews,
  table: tablePreviews,
  tabs: tabsPreviews,
  text: textPreviews,
  textarea: textareaPreviews,
  toast: toastPreviews,
  toggle: togglePreviews,
  'toggle-group': toggleGroupPreviews,
  toolbar: toolbarPreviews,
  tooltip: tooltipPreviews,
};

export default function ComponentScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const previews = slug ? PREVIEWS[slug] : undefined;

  if (!previews) {
    return null;
  }

  return (
    <>
      <Stack.Screen options={{ title: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Component' }} />
      <PreviewCarousel previews={previews} />
    </>
  );
}
