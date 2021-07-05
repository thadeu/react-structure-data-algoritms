import { useEffect } from "react";
import { ButtonClose, Pagehead, Box, Button } from "@primer/components";
import { useQueue } from "@/shared/queue";

function metadata(props) {
  return {
    screen: props?.screen,
    timestamp: new Date().toJSON(),
  };
}

export default function Stacks(props) {
  const [{ items }, { enqueue, dequeue, remove, size }] = useQueue();

  useEffect(() => {
    if (size > 0) {
      let tid = setInterval(async () => {
        const item = await dequeue();

        if (item) {
          console.log(`send item: ${item.screen}`);
        }
      }, 500);

      return () => clearInterval(tid);
    }
  }, [size, dequeue]);

  return (
    <Box mb="2rem">
      <Pagehead>Queue ({size})</Pagehead>

      {Object.keys(items).map((key, index) => {
        const item = items[key];

        return (
          <div key={key}>
            {key} - {item?.screen}:{" "}
            {new Date(item.timestamp).toLocaleString("pt-br")}
            <ButtonClose onClick={() => remove(key)} />
          </div>
        );
      })}

      <Button onClick={() => enqueue(metadata({ screen: "waiting" }))}>
        Adicionar Item
      </Button>
    </Box>
  );
}
