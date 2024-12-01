import { Container } from '@pixi/react';
import { useMemo } from 'react';

import { EditorGridCell } from '@/components/EditorGridCell';
import {
  EDITOR_CELL_HEIGHT,
  EDITOR_CELL_WIDTH,
  EDITOR_GRID_GAP_X,
  EDITOR_GRID_GAP_Y,
  EDITOR_PADDING,
} from '@/config';
import { useEditorGrid } from '@/store/editor/grid';

const colOffset = EDITOR_CELL_WIDTH + EDITOR_GRID_GAP_X;
const rowOffset = EDITOR_CELL_HEIGHT + EDITOR_GRID_GAP_Y;

export function EditorGrid() {
  const grid = useEditorGrid();
  const cells = useMemo(
    () => Array(grid.columns * grid.rows).fill(null),
    [grid.columns, grid.rows]
  );

  return (
    <Container x={EDITOR_PADDING} y={EDITOR_PADDING}>
      {cells.map((c, index) => {
        const colIndex = index % grid.columns;
        const rowIndex = Math.floor(index / grid.rows);
        return (
          <EditorGridCell
            key={`${colIndex}/${rowIndex}`}
            x={colIndex * colOffset}
            y={rowIndex * rowOffset}
          />
        );
      })}
    </Container>
  );
}
