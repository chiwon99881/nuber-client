import React from "react";
import PlacePresenter from "./PlacePresenter";
import { Mutation } from "react-apollo";
import { editPlace, editPlaceVariables } from "src/types/api";
import { EDIT_PLACE } from "./PlaceQueries.queries";
import { GET_PLACES } from "src/sharedQueries.queries";

interface IProps {
  address: string;
  fav: boolean;
  name: string;
  id: number;
}

class FavMutation extends Mutation<editPlace, editPlaceVariables> {}

class PlaceContainer extends React.Component<IProps> {
  public render() {
    const { id, fav, name, address } = this.props;
    return (
      <FavMutation
        mutation={EDIT_PLACE}
        variables={{ isFav: !fav, placeId: id }}
        refetchQueries={[{ query: GET_PLACES }]}
      >
        {editPlaceFn => (
          <PlacePresenter
            onStarPress={editPlaceFn}
            fav={fav}
            name={name}
            address={address}
          />
        )}
      </FavMutation>
    );
  }
}

export default PlaceContainer;
