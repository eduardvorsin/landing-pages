import { render, screen } from "@testing-library/react";
import { TrackInfo } from "./TrackInfo";

describe('Track Info component tests', () => {
  test('renders correctly', () => {
    render(<TrackInfo
      trackName='track'
      trackArtist='artist'
    />);

    expect(screen.getByText('track')).toBeInTheDocument();
    expect(screen.getByText('artist')).toBeInTheDocument();
  });

  test('renders without passed props', () => {
    render(<TrackInfo />);

    expect(screen.getByText('trackName')).toBeInTheDocument();
    expect(screen.getByText('trackArtist')).toBeInTheDocument();
  });
});
