import { PreviewCarousel } from '@showcase/components/preview-carousel';
import { Stack, useLocalSearchParams } from 'expo-router';
import { badgePreviews } from '@showcase/previews/badge';
import { buttonPreviews } from '@showcase/previews/button';
import { cardPreviews } from '@showcase/previews/card';
import { checkboxPreviews } from '@showcase/previews/checkbox';
import { dialogPreviews } from '@showcase/previews/dialog';
import { inputPreviews } from '@showcase/previews/input';
import { selectPreviews } from '@showcase/previews/select';
import { separatorPreviews } from '@showcase/previews/separator';
import { switchPreviews } from '@showcase/previews/switch';
import { textPreviews } from '@showcase/previews/text';

const PREVIEWS: Record<string, { name: string; component: () => React.JSX.Element }[]> = {
  badge: badgePreviews,
  button: buttonPreviews,
  card: cardPreviews,
  checkbox: checkboxPreviews,
  dialog: dialogPreviews,
  input: inputPreviews,
  select: selectPreviews,
  separator: separatorPreviews,
  switch: switchPreviews,
  text: textPreviews,
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
