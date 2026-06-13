import { Icon } from '@/registry/nativewind/components/ui/icon';
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/registry/nativewind/components/ui/toolbar';
import { Bold, Italic, Underline } from 'lucide-react-native';

function ToolbarPreview() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarButton>
          <Icon as={Bold} className="size-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Icon as={Italic} className="size-4" />
        </ToolbarButton>
        <ToolbarButton>
          <Icon as={Underline} className="size-4" />
        </ToolbarButton>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <ToolbarButton>
          <Icon as={Bold} className="size-4" />
        </ToolbarButton>
      </ToolbarGroup>
    </Toolbar>
  );
}

export const toolbarPreviews = [{ name: 'Default', component: ToolbarPreview }];
