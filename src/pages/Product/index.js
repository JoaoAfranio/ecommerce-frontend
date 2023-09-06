import { styled } from "styled-components";
import UpdatePrice from "./UpdatePrice";

export default function Product() {
  return (
    <Container>
      <UpdatePrice />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #ff9966, #ff5e62);
`;
