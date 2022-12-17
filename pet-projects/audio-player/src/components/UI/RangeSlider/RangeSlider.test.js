import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RangeSlider } from "./RangeSlider";

describe('Range slider component tests', () => {

  test('renders correctly', () => {
    render(<RangeSlider />);
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });

  test('at the onChange event, the mock function is triggered', () => {
    const mockFn = jest.fn();
    render(<RangeSlider
      onChange={mockFn}
    />);

    fireEvent.change(screen.getByRole('slider'), { target: { value: 50 } })
    expect(screen.getByRole('slider')).toHaveValue('50');
  });

  test('if the isVertical prop is passed', () => {
    render(<RangeSlider isVertical />);
    expect(screen.getByRole('slider')).toHaveStyle('writing-mode: bt-lr');
  });
});
