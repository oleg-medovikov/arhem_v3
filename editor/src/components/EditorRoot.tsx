import { Sprite, Stage } from '@pixi/react';
import { Texture } from 'pixi.js';

import { EditorView } from '@/components/EditorView';
import { useElementSize } from '@/hooks/useResizeObserver';
import { useTheme } from '@/hooks/useTheme';

export function EditorRoot() {
  const { ref, width, height } = useElementSize();
  const { colors } = useTheme();

  return (
    <div
      className="grow overflow-hidden bg-slate-200 dark:bg-slate-800"
      ref={ref}
    >
      <Stage
        width={width}
        height={height}
        options={{
          antialias: true,
          eventMode: 'static',
        }}
      >
        <Sprite
          width={width}
          height={height}
          texture={Texture.WHITE}
          tint={colors.bg}
        />
        <EditorView />
      </Stage>
    </div>
  );
}
