import { styled } from "styled-components";
import { IoClose } from "react-icons/io5";
import { AiOutlineCheck } from "react-icons/ai";

export default function Table({ data }) {
  return (
    <Container>
      <TableContent>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Validações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => {
            return (
              <tr>
                <td>
                  <DescriptionProduct>
                    [{p.code}] {p.name}
                  </DescriptionProduct>
                  <DescriptionProduct>Preço Atual: {p.sales_price}</DescriptionProduct>
                  <DescriptionProduct> Novo Preço: {p.new_price}</DescriptionProduct>
                </td>
                <td>
                  <ErrorDescription>
                    {p.error_validations.products_exists ? <CloseIcon /> : <CheckIcon />}O código de produto informados existe
                  </ErrorDescription>
                  <ErrorDescription>
                    {p.error_validations.price_correct_format ? <CloseIcon /> : <CheckIcon />}O preço esta preenchido e é valor numérico valido
                  </ErrorDescription>
                  <ErrorDescription>
                    {p.error_validations.sales_lower_than_cost ? <CloseIcon /> : <CheckIcon />}
                    Preço de venda dos produtos está acima do custo dele
                  </ErrorDescription>
                  <ErrorDescription>
                    {p.error_validations.price_adjustment_perc ? <CloseIcon /> : <CheckIcon />}
                    Porcentagem de reajuste menor do que 10% do preço atual
                  </ErrorDescription>
                  <ErrorDescription>
                    {p.error_validations.pack_products_adjustment ? <CloseIcon /> : <CheckIcon />}
                    Se houve reajuste do pacote, houve reajuste do preço dos componentes
                  </ErrorDescription>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TableContent>
    </Container>
  );
}

const Container = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`;

const TableContent = styled.table`
  border-collapse: collapse;

  thead,
  tbody {
    width: 100%;
  }

  th {
    width: 500px;
  }

  tr {
    &:hover {
      background: #f4f4f4;

      td {
        color: #555;
      }
    }
  }
  th,
  td {
    color: #999;
    border: 1px solid #eee;
    padding: 12px 35px;
    border-collapse: collapse;
  }
  th {
    background: #00cccc;
    color: #fff;
    text-transform: uppercase;
    font-size: 12px;
    &.last {
      border-right: none;
    }
  }
`;

const DescriptionProduct = styled.p`
  margin-bottom: 10px;
`;

const ErrorDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 10px;

  svg {
    font-size: 20px;
  }
`;

const CheckIcon = styled(AiOutlineCheck)`
  color: green;
`;

const CloseIcon = styled(IoClose)`
  color: red;
`;
