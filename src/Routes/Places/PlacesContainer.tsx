import React from "react";
import { getPlaces } from "src/types/api";
import { Query } from "react-apollo";
import { GET_PLACES } from "src/sharedQueries.queries";
import PlacesPresenter from "./PlacesPresenter";

class PlacesQuery extends Query<getPlaces> {}

class PlacesContainer extends React.Component {
  public render() {
    return (
      <PlacesQuery query={GET_PLACES}>
        {({ data, loading }) => (
          <PlacesPresenter data={data} loading={loading} />
        )}
      </PlacesQuery>
    );
  }
}

export default PlacesContainer;
