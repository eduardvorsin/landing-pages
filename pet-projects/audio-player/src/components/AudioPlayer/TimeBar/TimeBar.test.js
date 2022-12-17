import { render, screen } from "@testing-library/react";
import { TimeBar } from "./TimeBar";

describe('TimeBar component tests', () => {
  test('renders correctly', () => {
    render(<TimeBar
      currentTime={'2:43'}
      duration={'5:21'}
    />);

    expect(screen.getByText('2:43/5:21')).toBeInTheDocument();
  });

  test('renders without passed props', () => {
    render(<TimeBar />);

    expect(screen.getByText((content) => {
      return content === '00:00/00:00';
    })).toBeInTheDocument();
  });
});
