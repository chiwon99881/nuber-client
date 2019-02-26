import React from "react";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import styled from "../../typed-components";
import Form from "src/Components/Form";
import Input from "../../Components/Input";
import { Link } from "react-router-dom";
import Button from "src/Components/Button";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
  address: string;
  name: string;
  loading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({
  address,
  name,
  onChange,
  loading,
  onSubmit,
  pickedAddress
}) => (
  <>
    <Helmet>
      <title>AddPlace | Nuber</title>
    </Helmet>
    <Header title={"Add Place"} backTo={"/places"} />
    <Container>
      <Form onSubmitFn={onSubmit}>
        <ExtendedInput
          placeholder={"Name"}
          type={"text"}
          onChange={onChange}
          value={name}
          name={"name"}
        />
        <ExtendedInput
          placeholder={"Address"}
          type={"text"}
          onChange={onChange}
          value={address}
          name={"address"}
        />
        <ExtendedLink to={"/find-address"}>Pick place from Map</ExtendedLink>
        {pickedAddress && (
          <Button
            onClick={null}
            value={loading ? "Adding Place" : "Add Place"}
          />
        )}
      </Form>
    </Container>
  </>
);

export default AddPlacePresenter;
