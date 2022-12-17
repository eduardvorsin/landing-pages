import { render, screen } from "@testing-library/react";
import React from "react";
import { Image } from "./Image";

describe('Image component tests', () => {

  test('renders correctly', () => {
    render(<Image
      src='https://via.placeholder.com/350x150'
      alt='placeholder image'
    />);
    expect(screen.getByAltText(/placeholder image/i)).toBeInTheDocument();
  });

  test('the image is rendered with a specific width', () => {
    render(<Image
      src='https://via.placeholder.com/200x200'
      width={200}
      alt='placeholder image'
    />);

    expect(screen.getByAltText(/placeholder image/i)).toHaveStyle('width:200');
  });

  test('the image is rendered with a specific height', () => {
    render(<Image
      src='https://via.placeholder.com/150x150'
      height={150}
      alt='placeholder image'
    />);

    expect(screen.getByAltText(/placeholder image/i)).toHaveStyle('width:150');
  });

  test('the image is rendered with a specific alt text', () => {
    render(<Image
      src='https://via.placeholder.com/200x200'
      width={200}
      height={200}
      alt='placeholder image'
    />);

    expect(screen.getByAltText(/placeholder image/i)).toBeInTheDocument();
  });
});
