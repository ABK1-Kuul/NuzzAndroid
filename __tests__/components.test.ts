import {
  Toggle,
  ListRow,
  SectionLabel,
  EmptyState,
  ProgressBar,
  Skeleton,
  Header,
  Button,
} from '../src/components';

describe('Shared Design System Components', () => {
  it('exports all expected shared components', () => {
    expect(Toggle).toBeDefined();
    expect(ListRow).toBeDefined();
    expect(SectionLabel).toBeDefined();
    expect(EmptyState).toBeDefined();
    expect(ProgressBar).toBeDefined();
    expect(Skeleton).toBeDefined();
    expect(Header).toBeDefined();
    expect(Button).toBeDefined();
  });
});
