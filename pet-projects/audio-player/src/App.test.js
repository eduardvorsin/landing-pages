import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe('App Component tests', () => {
  test('when you click on the prev track button, the audio track changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    const initialSrc = screen.getByTitle('audio').src;
    await user.click(screen.getByRole('button', { name: 'prev track' }));

    expect(screen.getByTitle('audio').src).not.toBe(initialSrc);
  });

  test('If the track speed is not equal to 1x, then when you click on the prev track button, it should become 1', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'current playback rate' }));
    await user.click(screen.getByRole('button', { name: 'current playback rate' }));
    expect(screen.getByTitle('audio').playbackRate).toBe(1.5);
    await user.click(screen.getByRole('button', { name: 'prev track' }));
    expect(screen.getByTitle('audio').playbackRate).toBe(1);
  });

  test('when you click on the next track button, the audio track changes', async () => {
    const user = userEvent.setup();
    render(<App />);

    const initialSrc = screen.getByTitle('audio').src;
    await user.click(screen.getByRole('button', { name: 'next track' }));

    expect(screen.getByTitle('audio').src).not.toBe(initialSrc);
  });

  test('If the track speed is not equal to 1x, then when you click on the next track button, it should become 1', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: 'current playback rate' }));
    await user.click(screen.getByRole('button', { name: 'current playback rate' }));
    expect(screen.getByTitle('audio').playbackRate).toBe(1.5);
    await user.click(screen.getByRole('button', { name: 'next track' }));
    expect(screen.getByTitle('audio').playbackRate).toBe(1);
  });
});
