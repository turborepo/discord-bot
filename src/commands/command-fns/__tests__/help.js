const Discord = require('discord.js')
const {makeFakeClient} = require('test-utils')
const help = require('../help')

test('prints help for all commands', async () => {
  const {client, defaultChannels, kody} = await makeFakeClient()
  const message = new Discord.Message(
    client,
    {id: 'help_test', content: '?help', author: kody.user},
    defaultChannels.talkToBotsChannel,
  )
  await help(message)

  const messages = Array.from(
    defaultChannels.talkToBotsChannel.messages.cache.values(),
  )
  expect(messages).toHaveLength(1)
  expect(messages[0].content).toMatchInlineSnapshot(`
    "Here are the available commands:

    - help: Lists available commands
    - roles: Add or remove yourself from these roles: \\"Notify: Live\\" and \\"Notify: Office Hours\\"
    - info: Gives information about the bot (deploy date etc.)
    - private-chat: Create a private channel with who you want. This channel is temporary."
  `)
})

test('help with a specific command', async () => {
  const {client, defaultChannels} = await makeFakeClient()
  const message = new Discord.Message(
    client,
    {id: 'help_test', content: '?help info'},
    defaultChannels.talkToBotsChannel,
  )
  await help(message)

  const messages = Array.from(
    defaultChannels.talkToBotsChannel.messages.cache.values(),
  )
  expect(messages).toHaveLength(1)
  expect(messages[0].content).toMatchInlineSnapshot(
    `"Gives information about the bot (deploy date etc.)"`,
  )
})
