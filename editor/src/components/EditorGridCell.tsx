import { Container, Graphics } from '@pixi/react';
import { useState } from 'react';

import {
  EDITOR_CELL_HEIGHT,
  EDITOR_CELL_RADIUS,
  EDITOR_CELL_WIDTH,
} from '@/config';
import { useTheme } from '@/hooks/useTheme';

const ICON_SIZE = Math.ceil(EDITOR_CELL_HEIGHT / 2.5);
const ICON_STROKE = Math.ceil(ICON_SIZE / 10);
const STROKE_OFFSET = (ICON_SIZE - ICON_STROKE) / 2;
const ICON_TOP = (EDITOR_CELL_HEIGHT - ICON_SIZE) / 2;
const ICON_LEFT = (EDITOR_CELL_WIDTH - ICON_SIZE) / 2;

type Props = {
  x: number;
  y: number;
};

export function EditorGridCell({ x, y }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { colors } = useTheme();

  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(isHovered ? colors.cell.hover : colors.cell.main);
          g.drawRoundedRect(
            0,
            0,
            EDITOR_CELL_WIDTH,
            EDITOR_CELL_HEIGHT,
            EDITOR_CELL_RADIUS
          );
          g.endFill();
        }}
        cursor="pointer"
        onpointerenter={() => setIsHovered(true)}
        onpointerleave={() => setIsHovered(false)}
      />
      <Graphics
        x={ICON_LEFT}
        y={ICON_TOP}
        draw={(g) => {
          g.clear();
          g.beginFill(colors.cell.icon);
          g.drawRect(STROKE_OFFSET, 0, ICON_STROKE, ICON_SIZE);
          g.drawRect(0, STROKE_OFFSET, ICON_SIZE, ICON_STROKE);
          g.endFill();
        }}
        eventMode="none"
      />
    </Container>
  );
}
