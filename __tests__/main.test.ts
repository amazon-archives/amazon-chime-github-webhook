import * as core from '@actions/core';
import { run } from '../src/main';
import chime from 'chime';

jest.mock('@actions/core');
jest.mock('chime');

export type Inputs = {
  [key: string]: string;
};

describe('Send Chime Webhook', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const inputs: Inputs = {
      webhook: 'https://chime.test/12345',
      message: 'Wohooo!'
    };

    jest.spyOn(core, 'getInput').mockImplementation((name: string) => {
      return inputs[name];
    });
  });

  test('sends a message to the chat room', async () => {
    await run();

    expect(core.setFailed).toHaveBeenCalledTimes(0);
    expect(chime.sendMessage).toHaveBeenCalledTimes(1);
    expect(chime.sendMessage).toHaveBeenNthCalledWith(
      1,
      'Wohooo!',
      'https://chime.test/12345',
      { markdown: true }
    );
    expect(core.setOutput).toHaveBeenNthCalledWith(1, 'message-id', undefined);
  });

  test('sets failure upon failure of sending message', async () => {
    jest.spyOn(chime, 'sendMessage').mockImplementation(() => {
      return Promise.reject({ statusCode: 500, message: 'read ETIMEDOUT' });
    });

    await run();

    expect(core.setFailed).toHaveBeenCalledTimes(1);
    expect(chime.sendMessage).toHaveBeenCalledTimes(1);
    expect(chime.sendMessage).toHaveBeenNthCalledWith(
      1,
      'Wohooo!',
      'https://chime.test/12345',
      { markdown: true }
    );
    expect(core.setOutput).toHaveBeenCalledTimes(0);
  });
});
