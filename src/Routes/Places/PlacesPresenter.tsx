import React from "react";
import { getPlaces } from "src/types/api";
import Helmet from "react-helmet";
import Header from "src/Components/Header";
import styled from "../../typed-components";
import { Link } from "react-router-dom";
import PlaceContainer from "src/Components/Place";

const Container = styled.div`
  padding: 0 40px;
`;

const SLink = styled(Link)`
  text-decoration: underline;
  font-size: 20px;
`;

interface IProps {
  data: getPlaces | any;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  data: { GetMyPlaces: { places = null } = {} } = {},
  loading
}) => (
  <>
    <Helmet>
      <title>Places | Nuber</title>
    </Helmet>
    <Header title={"Places"} backTo={"/settings"} />
    <Container>
      {!loading && places && places.length === 0 && "No data"}
      {!loading &&
        places &&
        places.map(place => (
          <PlaceContainer
            key={place.id}
            id={place.id}
            fav={place.isFav}
            name={place.name}
            address={place.address}
          />
        ))}
      <SLink to={"/add-place"}>Add Place</SLink>
    </Container>
  </>
);

export default PlacesPresenter;
