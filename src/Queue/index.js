import { Box } from "@primer/components";
import { QueueProvider } from "@/shared/queue";

import Next from "@/Queue/Next";
import Last from "@/Queue/Last";
import List from "@/Queue/List";

export default function StackObject() {
  return (
    <QueueProvider>
      <List />
      <Next />
      <Last />
    </QueueProvider>
  );
}
