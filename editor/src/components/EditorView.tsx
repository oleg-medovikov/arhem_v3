import { Container } from '@pixi/react';

import { EditorGrid } from '@/components/EditorGrid';
import { useViewportTransform } from '@/hooks/useViewportTransform';

export function EditorView() {
  const { tx, ty } = useViewportTransform();

  return (
    <Container x={tx} y={ty}>
      <EditorGrid />
    </Container>
  );
}
