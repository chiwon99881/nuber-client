import React from "react";
import { Link } from "react-router-dom";
import styled from "../../typed-components";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

const ToggleDriving = styled<IToggleProps, any>("button")`
  -webkit-appearance: none;
  background-color: ${props =>
    props.isDriving ? props.theme.yellowColor : props.theme.greenColor};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: any;
  loading: boolean;
  toggleDriving: MutationFn;
}

const MenuPresenter: React.SFC<IProps> = ({ data, loading, toggleDriving }) => (
  <Container>
    {!loading && data.GetMyProfile.user && data.GetMyProfile.user.fullName && (
      <>
        <Header>
          <Grid>
            <Link to={"/edit-account"}>
              <Image
                src={
                  data.GetMyProfile.user.profilePhoto ||
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAACXCAMAAAAvQTlLAAAAY1BMVEUAAAD////u7u5ERETp6elkZGRra2s1NTU4ODifn5/Ozs7c3Nx0dHSjo6Pm5ub6+vr09PS4uLgsLCzExMRKSkpPT09VVVWqqqqOjo6ysrJ7e3uUlJQkJCRdXV0TExMYGBiGhoZ5lassAAAEDklEQVR4nO2ZyWKrIBRA45hGFFAcokaT///KhwyKSJLSl3Z1z4rKLRwGGczpBAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAJ7hP+ULtyqvSJWu4LWmZvP+Z1xcKFgpXXkpFnnCWya+/88pEhRenVyjyoiUtk2fwAi/wAi/w+g2ve50PQ562t+flztGUD2lSv9q5brfqafYPvJqeIUoIDRHrU3epUcEyTEkYI1YkZkbdlZwLb1A9loxlw8e8IhYHG2HmMKsZNkNYs2Ulohx0Po0xWVLOfdnfqzpdSGDR2f/2oIeQdbgS0Sh0ZyrHWa+/V8vsKjl4d0iqXCEs2nt1OuNDXkiXRzEO11qpMZZRZoTgtefw2fTa+NA4qhrLMZ+mfOz1Q9yuvVWqR1kxTNM0dLol7H7wQp+b97KNk54ubadmG9IL2ygf0Kt+UF+p2TObV5nWVXV+utJ4e5HcDBlUraP8s1HDPRkhtVSNk53X9ZnQD73wtI9J1JIguzCzhlWKSZd+NryezvcfetHcDsrJNkxfskcfVshDhNBp86LvtHy9+mNUv9V0EcnMjqhkHY/N690o+nqR6hg1y5xkDTruAHIxLufVqz0W819ezBWGdE/eZJ86KhGTML5pr/D9fc/Py7lND/Id5FNNvRqxDZZz8Lyu9+/PS35eznbW2msMXhP9mpfzuBRJr/lUvPFqPLzUNuvcp9SiaXg5i/i2V+vhdZMbmlj0bK7E9nKOYyu9+DolEjR8AvXxmuWRI3PVWAa21+t5n4oEflXdt73UZCWOGtXUM70OS+aCDOPrRBU8H2xvr1xOosOpk/cDOXgRx/5fbQ2TRY0f8VIHOXIYyEqf8Mx9yPF+yH2ILEk5J9CLa9L3vfQsOgzRNXB4hYd9W27KcuM8P5GP1lni4dWqo0e5f5wGLq8AWVtbuzvnyDYSa1vmPY/8vXSHBcyIrtbess+F2OyxeVBa+3NhcDUX4HqZEHEy+3pV+raXPVRnRIN5qbHO0aRYu2zS95pMnzPUVkTKVC+I1UPu62Hq62UMGS774lKU2e6SeLh3oHJMmiYZS92geLt36AZRduEx/OKh356s8fbSc1e1dUsd1nttR2KM4zXQPMR+rfe0IOQx60UNyffdz2svpmEptr3q0hEXN2ZRc+8ICbAaVk8v4zq6trY71Qev6tTZl3xa2mU9wsCOWZdaXy9+1kVmjTHjU6Y1zjnr7wp1aX4UwdlhQeOTrEBm/6N+61D53QT7fEerho6J8ggqC/HynMeC04l3TSbFSj51pWgDRewyuc4hvPsfvCyuQOOsH83PF5Eo5/piR3CqNUmep0n97t9u9fKrUlI7biEr52ZK02SK3OIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHyYf6+QNY9Koqr3AAAAAElFTkSuQmCC"
                }
              />
            </Link>
            <Text>
              <Name>{data.GetMyProfile.user.fullName}</Name>
              <Rating>💗</Rating>
            </Text>
          </Grid>
        </Header>
        <SLink to="/trips">Your Trips</SLink>
        <SLink to="/settings">Settings</SLink>
        <ToggleDriving
          onClick={toggleDriving}
          isDriving={data.GetMyProfile.user.isDriving}
        >
          {data.GetMyProfile.user.isDriving ? "Stop driving" : "Start driving"}
        </ToggleDriving>
      </>
    )}
  </Container>
);

export default MenuPresenter;
