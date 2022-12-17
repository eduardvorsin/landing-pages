import { render, screen } from "@testing-library/react";
import { AudioControls } from "./AudioControls";

describe('AudioControls component tests', () => {
  beforeEach(() => {
    window.innerWidth = 1024;
  });

  test('renders correctly', () => {
    render(<AudioControls
      showDownloadControl
      showPlaybackRateControl
      showLoopControl
    />);

    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  test('renders without passed props', () => {
    render(<AudioControls />);

    expect(screen.queryAllByRole('button')).toHaveLength(2);
  });

  test('when the screen size is less than 769 px volume controls are not rendered', () => {
    window.innerWidth = 576;
    render(<AudioControls />);

    expect(screen.queryByRole('button', { name: 'mute' })).not.toBeInTheDocument();
  });
});
