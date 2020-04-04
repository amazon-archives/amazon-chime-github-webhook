import * as core from '@actions/core';
import chime from 'chime';

export async function run(): Promise<void> {
  try {
    // Get inputs
    const webhook = core.getInput('webhook', { required: true });
    const message = core.getInput('message', { required: true });
    const noMarkdown = !!+core.getInput('no-markdown', {
      required: false
    });

    // Post message to Chime Webhook
    core.debug('Post message to Amazon Chime Webhook');

    // send the request
    const msg = await chime.sendMessage(message, webhook, {
      markdown: !noMarkdown
    });

    core.setOutput('message-id', msg?.messageId);
  } catch (err) {
    core.setFailed(err.message);
    core.debug(err.stack);
  }
}

/* istanbul ignore next */
if (require.main === module) {
  run();
}
