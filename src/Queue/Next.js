import { ButtonPrimary, Flex, Box } from "@primer/components";
import { useQueue } from "@/shared/queue";

export default function Next() {
  const [, { shift, head, isBlank }] = useQueue();
  const first = head();

  if (isBlank()) return null;

  return (
    <Box mt="2rem">
      <Box>Proximo da Fila</Box>

      <Flex>
        {first.screen} - {new Date(first.timestamp).toLocaleString("pt-br")}
      </Flex>

      <ButtonPrimary onClick={() => shift()}>Remover</ButtonPrimary>
    </Box>
  );
}
