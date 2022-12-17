import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import { AudioPlayer } from "./AudioPlayer";

describe('AudioPlayer component tests', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = jest.fn(() => Promise.resolve());
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  test('renders correctly', () => {
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showDownloadControl
      showPlaybackRateControl
      showLoopControl
      showNextAndPreviousControls
    />);

    expect(screen.getAllByRole('button')).toHaveLength(6);
  });

  test('renders without passed props', () => {
    render(<AudioPlayer />);

    expect(screen.queryAllByRole('button')).toHaveLength(2);
  });

  test('when you press the play button, the audio track is played', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      sources={['b.ogg', 'c.mp3']}
      src='c.mp3'
    />);
    const mockPlay = window.HTMLMediaElement.prototype.play;

    await user.click(screen.getByRole('button', { name: 'play' }));

    expect(mockPlay).toHaveBeenCalledTimes(1);
  });

  test('when you click on the play button, the text in the button changes to pause', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      sources={['b.ogg', 'c.mp3']}
      src='a.mp3'
    />);

    await user.click(screen.getByRole('button', { name: 'play' }));

    expect(screen.queryByRole('button', { name: 'play' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'pause' })).toBeInTheDocument();

  });

  test('when you press the mute button, the audio track becomes mute', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    expect(screen.queryByTitle('audio').muted).toBeFalsy();
    await user.click(screen.getByRole('button', { name: 'mute' }));
    expect(screen.getByTitle('audio').muted).toBeTruthy();
  });

  test('when you click on the mute button, the text in the button changes to unmute', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    await user.click(screen.getByRole('button', { name: 'mute' }));
    expect(screen.queryByRole('button', { name: 'mute' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'unmute' })).toBeInTheDocument();
  });

  test('when you click on the loop button, the audio track is infinitely produced', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showLoopControl
    />);

    expect(screen.queryByTitle('audio').loop).toBeFalsy();
    await user.click(screen.getByRole('button', { name: 'repeat song infinite' }));
    expect(screen.getByTitle('audio').loop).toBeTruthy();
  });

  test('when you click on the loop button, the text inside the button changes to don\'t repeat the song', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showLoopControl
    />);

    await user.click(screen.getByRole('button', { name: 'repeat song infinite' }));
    expect(screen.queryByRole('button', { name: 'repeat song infinite' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'don\'t repeat the song' })).toBeInTheDocument();
  });

  test('volume range slider changes the audio volume when the value changes', () => {
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);
    const volumeSlider = screen.getAllByRole('slider')[1];

    expect(screen.getByTitle('audio').volume).toBe(0.5);
    fireEvent.change(volumeSlider, { target: { value: 80 } });
    expect(screen.getByTitle('audio').volume).toBe(0.8);
  });

  test('when the value of the volume range slider changes to 0 , the text of the button changes to unmute', () => {
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);
    const volumeSlider = screen.getAllByRole('slider')[1];

    expect(screen.queryByRole('button', { name: 'unmute' })).not.toBeInTheDocument();
    fireEvent.change(volumeSlider, { target: { value: 0 } });
    expect(screen.getByRole('button', { name: 'unmute' })).toBeInTheDocument();
  });

  test('progress range slider changes the current audio playback progress when the value is changed', () => {
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showLoopControl
    />);
    const progressSlider = screen.getAllByRole('slider')[0];

    expect(screen.getByTitle('audio').currentTime).toBe(0);
    fireEvent.change(progressSlider, { target: { value: 34 } });
    expect(screen.getByTitle('audio').currentTime).toBe(34);
  });

  test('when changing the value in the progress range slider, the current time in the timeBar changes', () => {
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showLoopControl
    />);
    const progressSlider = screen.getAllByRole('slider')[0];

    expect(screen.getByTitle('time')).toHaveTextContent(/0:00.+/);
    fireEvent.change(progressSlider, { target: { value: 34 } });
    expect(screen.getByTitle('time')).toHaveTextContent(/0:34.+/);
  });


  test('when you press the playback rate button, the audio track speed increases by 0.25x', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showPlaybackRateControl
    />);

    expect(screen.queryByTitle('audio').playbackRate).toBe(1);
    await user.click(screen.getByRole('button', { name: 'current playback rate' }));
    expect(screen.getByTitle('audio').playbackRate).toBe(1.25);
  });

  test('if the track speed is 2x then when you click on playbackRate it should become 0.25x', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
      showPlaybackRateControl
    />);

    screen.queryByTitle('audio').playbackRate = 2;
    await user.click(screen.getByRole('button', { name: 'current playback rate' }));
    expect(screen.getByTitle('audio').playbackRate).toBe(0.25);
  });

  test('when you press the Enter or Space button on the keyboard, the track is played', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    expect(screen.getByTitle('audio').play).toHaveBeenCalledTimes(0);
    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{Enter}');
    expect(screen.getByTitle('audio').play).toHaveBeenCalledTimes(1)
    await user.keyboard('{ }');
    expect(screen.getByTitle('audio').pause).toHaveBeenCalledTimes(1);
  });

  test('when you press the Arrow Up button on the keyboard, the volume of the track increases by 1', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    expect(screen.queryByTitle('audio').volume).toBe(0.5);
    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{ArrowUp}');
    expect(screen.queryByTitle('audio').volume).toBe(0.51);
  });

  test('when you press the ArrowDown button on the keyboard, the volume of the track decreases by 1', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    expect(screen.queryByTitle('audio').volume).toBe(0.5);
    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{ArrowDown}');
    expect(screen.queryByTitle('audio').volume).toBe(0.49);
  });

  test('When you press the Arrow Left button on the keyboard, the track progress decreases by 1', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='b.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    const progressSlider = screen.getAllByRole('slider')[0];
    fireEvent.change(progressSlider, { target: { value: 10 } });

    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{ArrowLeft}');
    expect(screen.queryByTitle('audio').currentTime).toBe(9);
  });

  test('when you press the Arrow Right button on the keyboard, the track progress does not change when the duration is less than currentTime', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='a.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{ArrowRight}');
    expect(screen.queryByTitle('audio').currentTime).toBe(0);
  });

  test('when you press the m button on the keyboard, the track becomes silent', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='c.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    expect(screen.queryByTitle('audio').muted).toBeFalsy();
    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{m}');
    expect(screen.getByTitle('audio').muted).toBeTruthy();
  });

  test('when you press the l button on the keyboard, the track is infinitely played', async () => {
    const user = userEvent.setup();
    render(<AudioPlayer
      src='c.mp3'
      sources={['b.ogg', 'c.mp3']}
    />);

    expect(screen.queryByTitle('audio').loop).toBeFalsy();
    await user.click(screen.getByTitle('audio-player'));
    await user.keyboard('{l}');
    expect(screen.getByTitle('audio').loop).toBeTruthy();
  });
});
