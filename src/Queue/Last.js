import { ButtonPrimary, Flex, Box } from "@primer/components";
import { useQueue } from "@/shared/queue";

export default function Last() {
  const [, { pop, tail, isBlank }] = useQueue();
  const latest = tail();

  if (isBlank()) return null;

  return (
    <Box mt="2rem">
      <Box>Ultimo da fila</Box>
      <Flex>
        {latest.screen} - {new Date(latest.timestamp).toLocaleString("pt-br")}
      </Flex>

      <ButtonPrimary onClick={() => pop()}>Remover</ButtonPrimary>
    </Box>
  );
}
