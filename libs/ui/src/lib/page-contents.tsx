import { Container } from '@chakra-ui/layout';

export function PageContents({ children }) {
  return (
    <Container w="100%" maxW={{ base: '100%', md: '62em' }} pt="40px">
      {children}
    </Container>
  );
}
