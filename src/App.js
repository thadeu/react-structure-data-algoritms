import { BaseStyles } from "@primer/components";
import { Box } from "@primer/components";
import StackArray from "@/StackArray";
import StackObject from "@/StackObject";
import Queue from "@/Queue";

function App() {
  return (
    <BaseStyles>
      <Box padding="1rem">
        <StackArray />
      </Box>

      <Box padding="1rem">
        <StackObject />
      </Box>

      <Box padding="1rem">
        <Queue />
      </Box>
    </BaseStyles>
  );
}

export default App;
