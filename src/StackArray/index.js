import {
  ButtonClose,
  ButtonDanger,
  ButtonPrimary,
  Flex,
  Pagehead,
} from "@primer/components";
import { Box, Button } from "@primer/components";
import { isEmpty } from "lodash";
import { StackArrayProvider, useStackArray } from "@/shared/stack-array";

function First() {
  const [, { shift, head, isBlank }] = useStackArray();
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
  const [, { pop, peek }] = useStackArray();
  const peeked = peek();

  if (isEmpty(peeked)) return null;

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

function Stacks(props) {
  const [stack, { push, remove, size }] = useStackArray();

  return (
    <Box mb="2rem">
      <Pagehead>StackArray ({size})</Pagehead>

      {stack.map((item, index) => {
        return (
          <div key={index}>
            {index + 1} - {item?.screen}:{" "}
            {new Date(item.timestamp).toLocaleString("pt-br")}
            <ButtonClose onClick={() => remove(index)} />
          </div>
        );
      })}

      <Button
        onClick={() =>
          push({ screen: "waiting", timestamp: new Date().toJSON() })
        }
      >
        Adicionar Item
      </Button>
    </Box>
  );
}

function Clear() {
  const [, { clear, isBlank }] = useStackArray();

  if (isBlank()) return null;

  return <ButtonDanger onClick={() => clear()}>Limpar Stacks</ButtonDanger>;
}

export default function StackArray() {
  return (
    <StackArrayProvider>
      <Box>
        <Stacks />
        <First />
        <Last />
        <Clear />
      </Box>
    </StackArrayProvider>
  );
}
