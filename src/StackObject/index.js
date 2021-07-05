import {
  ButtonClose,
  ButtonDanger,
  ButtonPrimary,
  Flex,
  Pagehead,
  Box,
  Button,
} from "@primer/components";
import { StackObjectProvider, useStackObject } from "@/shared/stack-object";

function metadata(props) {
  return {
    screen: props?.screen,
    timestamp: new Date().toJSON(),
  };
}

function Stacks(props) {
  const [stack, { push, remove, size }] = useStackObject();

  return (
    <Box mb="2rem">
      <Pagehead>StackObject ({size})</Pagehead>

      {Object.keys(stack.items).map((key, index) => {
        const item = stack.items[key];

        return (
          <div key={key}>
            {key} - {item?.screen}:{" "}
            {new Date(item.timestamp).toLocaleString("pt-br")}
            <ButtonClose onClick={() => remove(key)} />
          </div>
        );
      })}

      <Button onClick={() => push(metadata({ screen: "waiting" }))}>
        Adicionar Item
      </Button>
    </Box>
  );
}

function First() {
  const [, { shift, head, isBlank }] = useStackObject();
  const first = head();

  if (isBlank()) return null;

  return (
    <Flex mt="2rem">
      <Flex>
        {first.screen}
        {new Date(first.timestamp).toLocaleString("pt-br")}
      </Flex>

      <ButtonPrimary onClick={() => shift()}>Remover</ButtonPrimary>
    </Flex>
  );
}

function Last() {
  const [, { pop, peek, isBlank }] = useStackObject();
  const peeked = peek();

  if (isBlank()) return null;

  return (
    <Flex mt="2rem">
      <Flex>
        {peeked.screen}
        {new Date(peeked.timestamp).toLocaleString("pt-br")}
      </Flex>

      <ButtonPrimary onClick={() => pop()}>Remover</ButtonPrimary>
    </Flex>
  );
}

export default function StackObject() {
  return (
    <StackObjectProvider>
      <Box>
        <Stacks />
        <First />
        <Last />
      </Box>
    </StackObjectProvider>
  );
}
