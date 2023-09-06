import { useState } from "react";
import { styled } from "styled-components";
import Table from "./Table";
import { FaFileUpload } from "react-icons/fa";
import { updateProductPrice, validateProductPrice } from "../../../services/productApi";
import { toast } from "react-toastify";

export default function UpdatePrice() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState();
  const [hasError, setHasError] = useState(true);

  async function handleUploadCsv() {
    const formData = new FormData();
    formData.append("csvFile", file);
    try {
      const res = await validateProductPrice(formData);
      setData(res.data);

      //validate if some of itens has error
      const errors = res.data.some((product) => product.has_error === true);
      setHasError(errors);

      toast.success("Validação feita com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro ao validar");
    }
  }

  async function handleUpdate() {
    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      await updateProductPrice(formData);
      toast.success("Atualização feita com sucesso!");

      setFile(null);
      setFileName("");
      setHasError(true);
      setData();
    } catch (err) {
      console.log(err);
      toast.error("Ocorreu um erro ao atualizar");
    }
  }

  return (
    <Container>
      <Content>
        <Title>Atualizar Preço</Title>
        <Row>
          <label>
            <input
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0].name);
              }}
              placeholder="Insira o arquivo CSV"
              type="file"
            />

            <span>
              <FaFileUpload />

              {fileName || "Escolha um arquivo CSV..."}
            </span>
          </label>

          <button onClick={handleUploadCsv}>Validar</button>
          <button onClick={handleUpdate} className="update" disabled={hasError}>
            Atualizar
          </button>
        </Row>

        {data && <Table data={data} />}
      </Content>
    </Container>
  );
}

const Container = styled.div`
  margin: auto;

  width: 70%;
  height: 80%;

  background-color: #f9f9f9;
  border-radius: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  gap: 30px;

  margin: 50px;
`;

const Title = styled.div`
  font-size: 22px;
  text-transform: uppercase;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  label {
    max-width: 80%;
    font-size: 16px;
    font-weight: 700;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    padding: 0.625rem 1.25rem;

    color: #ff9966;
    border: 2px solid currentColor;
    border-radius: 3px;

    svg {
      width: 1em;
      height: 1em;
      vertical-align: middle;
      fill: currentColor;
      margin-top: -0.25em;
      margin-right: 0.25em;
    }

    &:hover {
      color: #ff5e62;
      transition: 1s;
    }
  }

  input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  button {
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 12px;
    font-weight: bold;

    border-radius: 3px;
    border: none;
    font-family: "Lexend Deca", sans-serif;

    background-color: #ff9966;
    color: #ffffff;

    cursor: pointer;

    &:hover {
      background-color: #ff5e62;
      transition: 0.5s;
    }

    &.update {
      background-color: #007f00;

      &:hover {
        opacity: 0.7;
      }
    }

    &:disabled {
      background-color: #d3d3d3;
      cursor: initial;
    }
  }
`;
