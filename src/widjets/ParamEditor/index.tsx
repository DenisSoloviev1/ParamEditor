import React, { useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 2px solid #adb5bd;
  border-radius: 30px;

  h1 {
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;

export const Flex = styled.div<{
  $justify?: string;
  $align?: string;
  $direction?: string;
  $gap?: number;
  $shadow?: boolean;
  $wrap?: boolean;
  $width?: string;
  $height?: string;
  $position?: string;
}>`
  width: ${(props) => props.$width ?? ""};
  height: ${(props) => props.$height ?? ""};
  display: flex;
  flex-direction: ${(props) => props.$direction ?? "column"};
  justify-content: ${(props) => props.$justify ?? "flex-start"};
  align-items: ${(props) => props.$align ?? "start"};
  gap: ${(props) => (props.$gap ? `${props.$gap}px` : "5px")};
  ${(props) => props.$shadow && `box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);`}
  flex-wrap: ${(props) => props.$wrap && `wrap`};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 20px;
`;

const CustomInput = styled.input`
  padding: 5px 10px;
  border: 2px solid #adb5bd;
  border-radius: 10px;
`;

const CustomButton = styled.button`
  width: 50%;
  padding: 10px;
  border-radius: 10px;
  color: #f4f4f4;
  background-color: #166ff6;
  font-size: 20px;

  &:hover {
    background-color: #167ff6;
  }
`;

export interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}

interface Props {
  params: Param[];
  model: Model;
}

const ParamEditor: React.FC<Props> = ({ params, model }) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(
    model.paramValues
  );

  const handleChange = (paramId: number, value: string) => {
    setParamValues((prevValues) =>
      prevValues.map((pv) => (pv.paramId === paramId ? { ...pv, value } : pv))
    );
  };

  //выводит сохранённую модель в консоль
  const getModel = (): Model => ({
    paramValues,
  });

  return (
    <Card>
      <h1>Редактор параметров</h1>
      <Flex>
        {params.map((param) => {
          const paramValue =
            paramValues.find((pv) => pv.paramId === param.id)?.value || "";
          return (
            <Container>
              <label key={param.id} style={{ marginBottom: "10px" }}>
                {param.name}
                <CustomInput
                  type="text"
                  value={paramValue}
                  onChange={(e) => handleChange(param.id, e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
              </label>
            </Container>
          );
        })}
      </Flex>
      <CustomButton onClick={() => console.log(getModel())}>
        Сохранить модель
      </CustomButton>
    </Card>
  );
};

export default ParamEditor;
