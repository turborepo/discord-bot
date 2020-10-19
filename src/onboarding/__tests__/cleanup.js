const Discord = require('discord.js')
const {makeFakeClient} = require('test-utils')
const {getRole, welcomeChannelPrefix} = require('../utils')
const {cleanup} = require('../cleanup')

beforeEach(() => {
  jest.useFakeTimers('modern')
})

afterEach(() => {
  jest.runOnlyPendingTimers()
  jest.useRealTimers()
})

test('keeps members with welcome channel', async () => {
  const {guild, createUser, createChannel} = await makeFakeClient()
  const member = await createUser('user')
  const {
    user: {username, discriminator},
  } = member
  const welcomeChannel = await createChannel(
    `${welcomeChannelPrefix}${username}_${discriminator}`,
    {
      topic: `Membership application for ${username}#${discriminator} (Member ID: "${member.id}")`,
    },
  )
  jest.spyOn(welcomeChannel, 'delete')
  jest.spyOn(member, 'kick')

  const promise = cleanup(guild)
  jest.runOnlyPendingTimers()
  await promise
  jest.runOnlyPendingTimers()

  expect(member.kick).not.toHaveBeenCalled()
  expect(welcomeChannel.delete).not.toHaveBeenCalled()
})

// test('removes the right members', async () => {
//   const {guild, createUser, channels} = await makeFakeClient()
//   const memberRole = getRole(guild, {name: 'Member'})
//   const unconfirmedMemberRole = getRole(guild, {name: 'Unconfirmed Member'})
//   const epicReactRole = getRole(guild, {name: 'EpicReact Dev'})
//   const moderatorRole = getRole(guild, {name: 'Moderator'})

//   await newUser.roles.add(memberRole)
//   const keepMember = await createUser('keep-member')
//   const removeMember = await createUser('remove-member')
//   await removeMember.roles.remove(memberRole)
//   await removeMember.roles.add(unconfirmedMemberRole)

//   const keepUnconfirmed = createUser('keep-unconfirmed')
//   await cleanup(guild)
// })
