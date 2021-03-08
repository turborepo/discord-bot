/* eslint-disable no-unused-vars */
const path = require('path')
const Discord = require('discord.js')
const {cleanupGuildOnInterval} = require('./utils')

require('dotenv').config({
  path: path.join(__dirname, '..', `/.env.${process.env.NODE_ENV || 'local'}`),
})

const {onboarding, commands, clubApplication, admin} = require('.')
const {setup} = require('./')
const intents = new Discord.Intents([
  Discord.Intents.NON_PRIVILEGED,
  'GUILD_MEMBERS',
])
const client = new Discord.Client({fetchAllMembers: true, ws: {intents}})

console.log('logging in')
client.login(process.env.DISCORD_BOT_TOKEN)

const getKcdGuild = () =>
  client.guilds.cache.find(({name}) => name === 'Turborepo')
const getKent = () =>
  getKcdGuild().members.cache.find(({user: {username, discriminator}}) => {
    return username === 'jaredpalmer'
  })
const getMembers = () => getKcdGuild().members.cache

client.once('ready', () => {
  console.log('ready to go')
  // setup(client)
  // console.log(getKent())
  // console.log(getMembers())

  // console.log(getKcdGuild().members)

  // clubApplication.setup(client)
  // admin.setup(client)
  // onboarding.setup(client)
  // const kent = await getKent()
  // client.on('guildMemberUpdate', admin.handleGuildMemberUpdate)
  // client.on('message', onboarding.handleNewMessage)
  // client.on('messageUpdate', onboarding.handleUpdatedMessage)

  // onboarding.handleNewMember(kent)
  client.on('message', onboarding.handleNewMessage)
  client.on('messageUpdate', onboarding.handleUpdatedMessage)
  client.on('guildMemberAdd', onboarding.handleNewMember)
  cleanupGuildOnInterval(client, guild => onboarding.cleanup(guild), 5000)
})
