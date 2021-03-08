const Discord = require('discord.js')
const {makeFakeClient, waitUntil} = require('test-utils')
const {handleNewMessage} = require('..')

test('handles incoming messages', async () => {
  const {client, defaultChannels, kody} = await makeFakeClient()

  const message = new Discord.Message(
    client,
    {id: 'help_test', content: '?help', author: kody.user},
    defaultChannels.talkToBotsChannel,
  )

  await handleNewMessage(message)
  await waitUntil(() =>
    expect(
      Array.from(defaultChannels.talkToBotsChannel.messages.cache.values()),
    ).toHaveLength(1),
  )
  const messages = Array.from(
    defaultChannels.talkToBotsChannel.messages.cache.values(),
  )
  expect(messages[0].content).toMatchInlineSnapshot(`
    "Here are the available commands:

    - help: Lists available commands
    - roles: Add or remove yourself from these roles: \\"Notify: Live\\" and \\"Notify: Office Hours\\"
    - info: Gives information about the bot (deploy date etc.)
    - private-chat: Create a private channel with who you want. This channel is temporary."
  `)
})
