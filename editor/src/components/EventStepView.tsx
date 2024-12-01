import { Container, Graphics, Text } from '@pixi/react';

type StepId = string;

type Props = {
  id: string;
  text: string;
  next?: StepId;
  answers?: Array<{
    text: string;
    next?: StepId;
  }>;
  position: [number, number];
};

// TODO
const width = 200;
const height = 75;
const answerHeight = 25;

export function EventStepView({ text, answers, position: [x, y] }: Props) {
  return (
    <Container x={x} y={y}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill('#666');
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
      />
      <Text text={text} />
      {answers &&
        answers.map(({ text }, index) => (
          <Container y={height + answerHeight * index} key={text}>
            <Graphics
              draw={(g) => {
                g.clear();
                g.beginFill('#666');
                g.drawRect(0, 0, width, answerHeight);
                g.endFill();
              }}
            />
          </Container>
        ))}
    </Container>
  );
}
