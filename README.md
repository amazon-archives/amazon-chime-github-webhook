## Amazon Chime "Chime Webhook" Action for GitHub Actions

![Package](https://github.com/aws-actions/amazon-chime-github-webhook/workflows/Package/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Send message to Amazon Chime chat rooms.

## Usage

```yaml
- name: Send message to Amazon Chime chat room
  uses: aws-actions/amazon-chime-github-webhook@v1
  with:
    webhook: ${{ secrets.webhook }}
    message: "Whoohoo!" 
```

The action can be passed a `webhook` URL and `message` to be send to a Amazon Chime chat room. `webook` should be defined as an [encrypted secret](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets) and not be exposed directly.

See [action.yml](action.yml) for the full documentation for this action's inputs and outputs.

> You can learn more about creating an [Amazon Chime Webhook](https://docs.aws.amazon.com/chime/latest/dg/webhooks.html) and about [Amazon Chime](https://aws.amazon.com/de/chime/)

## License

[MIT](/LICENSE)
