import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VolumeControls } from "./VolumeControls";

describe('Volume Controls component tests', () => {
  test('renders correctly', () => {
    const mockFn = jest.fn();
    render(<VolumeControls
      volume={30}
      onVolumeChange={mockFn}
      toggleMuting={mockFn}
    />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('renders without passed props', () => {
    render(<VolumeControls />);

    expect(screen.getByRole('button')).toHaveTextContent('mute');
    expect(screen.getByRole('slider')).toHaveValue('50');
  });

  test('when the button is clicked, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();
    render(<VolumeControls toggleMuting={mockFn} />);

    await user.click(screen.getByRole('button'));

    expect(mockFn).toBeCalledTimes(1);
  });

  test('when the value of the range slider changed the mock function is triggered', () => {
    const mockFn = jest.fn();
    render(<VolumeControls onVolumeChange={mockFn} />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: 51 } });

    expect(mockFn).toBeCalledTimes(1);
  });

  test('when the isMuted prop is passed, the text in the button changes to unmute', () => {
    render(<VolumeControls isMuted />);

    expect(screen.getByRole('button')).toHaveTextContent('unmute');
  });
});
