import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AdditionalControls } from "./AdditionalControls";

describe('AdditionalControls component tests', () => {
  test('renders correctly', () => {
    const mockFn = jest.fn();
    render(<AdditionalControls
      showDownloadControl
      showPlaybackRateControl
      showLoopControl
      changePlaybackRate={mockFn}
      changeLooping={mockFn}
    />);

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('renders without passed props', () => {
    render(<AdditionalControls />);

    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  test('when the playback rate button is clicked, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    render(<AdditionalControls
      showPlaybackRateControl
      changePlaybackRate={mockFn}
    />);

    await user.click(screen.getByRole('button'));

    expect(mockFn).toBeCalledTimes(1);
  });

  test('when the loop button is clicked, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    render(<AdditionalControls
      showLoopControl
      changeLooping={mockFn}
    />);

    await user.click(screen.getByRole('button'));

    expect(mockFn).toBeCalledTimes(1);
  });


  test('when the isLooped prop is passed, the text in the loop button changes to don\'t repeat the song', () => {
    render(<AdditionalControls
      isLooped
      showLoopControl
    />);

    expect(screen.getByRole('button')).toHaveTextContent('don\'t repeat the song');
  });
});
