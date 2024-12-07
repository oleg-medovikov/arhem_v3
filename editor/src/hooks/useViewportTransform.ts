import { FederatedWheelEvent } from '@pixi/events';
import { useApp } from '@pixi/react';
import { useEffect } from 'react';

import { EDITOR_PADDING } from '@/config';
import { EventButton } from '@/constants';
import { useEditorViewport } from '@/store/editor/viewport';

import { usePointerDrag } from './usePointerDrag';

export function useViewportTransform() {
  const app = useApp();
  const { tx, ty, translate, setMaxTranslate } = useEditorViewport();

  useEffect(() => {
    setMaxTranslate(
      app.stage.width - app.screen.width + EDITOR_PADDING,
      app.stage.height - app.screen.height + EDITOR_PADDING
    );
    // Callback can be safely omitted.
    // Stage dimensions increase on scroll and should be omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.screen.width, app.screen.height]);

  useEffect(() => {
    const stage = app.stage;
    if (!stage) {
      return;
    }
    const handleWheel = ({ deltaX, deltaY, shiftKey }: FederatedWheelEvent) => {
      const [dx, dy] =
        Math.abs(deltaX) > Math.abs(deltaY) ? [-deltaX, 0] : [0, -deltaY];
      if (shiftKey) {
        translate(dy, dx);
      } else {
        translate(dx, dy);
      }
    };
    stage.on('wheel', handleWheel);
    return () => {
      stage.off('wheel', handleWheel);
    };
    // Callback can be safely omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app.stage]);

  usePointerDrag(
    {
      handlePointerDown(e, setState) {
        if (e.button !== EventButton.Middle || e.defaultPrevented) {
          return;
        }
        e.preventDefault();
        setState(true);
      },
      handlePointerMove(e) {
        if (e.defaultPrevented) {
          return;
        }
        e.preventDefault();
        translate(e.movementX, e.movementY);
      },
    },
    []
  );

  return { tx, ty };
}
