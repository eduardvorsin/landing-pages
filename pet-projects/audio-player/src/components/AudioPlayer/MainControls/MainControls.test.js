import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MainControls } from "./MainControls";

describe('Volume Controls component tests', () => {
  test('renders correctly', () => {
    const mockFn = jest.fn();
    render(<MainControls
      togglePlaying={mockFn}
      onClickPrevious={mockFn}
      onClickNext={mockFn}
      showNextAndPreviousControls
      isPlayed
    />);

    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

  test('renders without passed props', () => {
    render(<MainControls />);

    expect(screen.getAllByRole('button')).toHaveLength(1);
  });

  test('when the play button is clicked, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    render(<MainControls togglePlaying={mockFn} />);

    await user.click(screen.getByRole('button'));

    expect(mockFn).toBeCalledTimes(1);
  });

  test('when the prev button is clicked, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    render(<MainControls
      onClickPrevious={mockFn}
      showNextAndPreviousControls
    />);

    await user.click(screen.getByRole('button', { name: 'prev track' }));

    expect(mockFn).toBeCalledTimes(1);
  });

  test('when the next button is clicked, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    render(<MainControls
      onClickNext={mockFn}
      showNextAndPreviousControls
    />);

    await user.click(screen.getByRole('button', { name: 'next track' }));

    expect(mockFn).toBeCalledTimes(1);
  });

  test('when the isPlayed prop is passed, the text in the button changes to pause', () => {
    render(<MainControls isPlayed />);

    expect(screen.getByRole('button')).toHaveTextContent('pause');
  });
});
