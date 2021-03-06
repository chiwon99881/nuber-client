import React from "react";
import RidePresenter from "./RidePresenter";
import { RouteComponentProps } from "react-router-dom";
import { Query, Mutation } from "react-apollo";
import {
  getRide,
  getRideVariables,
  userProfile,
  updateRide,
  updateRideVariables
} from "src/types/api";
import {
  GET_RIDE,
  RIDE_SUBSCRIPTION,
  UPDATE_RIDE_STATUS
} from "./RideQueries.queries";
import { USER_PROFILE } from "src/sharedQueries.queries";
import { SubscribeToMoreOptions } from "apollo-boost";

class RideQuery extends Query<getRide, getRideVariables> {}
class ProfileQuery extends Query<userProfile> {}
class RideUpdate extends Mutation<updateRide, updateRideVariables> {}

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.rideId) {
      props.history.push("/");
    }
  }
  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;
    const parseId = parseInt(rideId, 10);
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <RideQuery query={GET_RIDE} variables={{ rideId: parseId }}>
            {({ data, loading, subscribeToMore }) => {
              const subscribeOptions: SubscribeToMoreOptions = {
                document: RIDE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  const {
                    data: {
                      RideStatusSubscription: { status }
                    }
                  } = subscriptionData;
                  if (status === "FINISHED") {
                    window.location.href = "/";
                  }
                }
              };
              subscribeToMore(subscribeOptions);
              return (
                <RideUpdate
                  mutation={UPDATE_RIDE_STATUS}
                  refetchQueries={[
                    { query: GET_RIDE, variables: { rideId: parseId } }
                  ]}
                >
                  {updateRideFn => (
                    <RidePresenter
                      userData={userData}
                      loading={loading}
                      data={data}
                      updateRideFn={updateRideFn}
                    />
                  )}
                </RideUpdate>
              );
            }}
          </RideQuery>
        )}
      </ProfileQuery>
    );
  }
}

export default RideContainer;
