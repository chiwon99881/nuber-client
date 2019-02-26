import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, toggleDriving } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries.queries";
import { TOGGLE_DRIVING } from "./MenuQueries.queries";
import { toast } from "react-toastify";

class ProfileQuery extends Query<userProfile> {}
class ToggleDrivingMutation extends Mutation<toggleDriving> {}

class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation
        mutation={TOGGLE_DRIVING}
        update={(cache, { data }) => {
          if (data) {
            const { ToggleDrivingMode } = data;
            if (!ToggleDrivingMode.ok) {
              toast.error(ToggleDrivingMode.error);
              return;
            }
            const query: userProfile | null = cache.readQuery({
              query: USER_PROFILE
            });
            if (query) {
              query.GetMyProfile.user!.isDriving = !query.GetMyProfile.user!
                .isDriving;
            }
            cache.writeQuery({ query: USER_PROFILE, data: query });
          }
        }}
      >
        {toggleDrivingFn => (
          <ProfileQuery query={USER_PROFILE}>
            {({ data, loading }) => (
              <MenuPresenter
                data={data}
                loading={loading}
                toggleDriving={toggleDrivingFn}
              />
            )}
          </ProfileQuery>
        )}
      </ToggleDrivingMutation>
    );
  }
}

export default MenuContainer;
