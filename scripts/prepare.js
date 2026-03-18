import fs from 'fs'
import { execSync } from 'child_process'
import ora from 'ora'
import path from 'path'
import prompts from 'prompts'

function run(command, description) {
  const spinner = ora(description).start()
  try {
    execSync(command, { stdio: 'ignore' })
    spinner.succeed(`${description} - done`)
  } catch (error) {
    spinner.fail(`${description} - failed`)

    console.error(error.message)
  }
}

async function setup() {
  console.log('\n📦 Setting up your repository...\n')

  const huskyPath = path.join(process.cwd(), '.husky/_')

  if (!fs.existsSync(huskyPath)) {
    run('husky', 'Installing Husky')
  } else {
    console.log('✅ Husky is already installed, skipping.')
  }

  const response = await prompts({
    type: 'multiselect',
    name: 'tasks',
    message: 'Select the setup steps you want to perform:',
    hint: 'Press Space to select, Enter to confirm.',
    choices: [
      { title: 'Install Turbo CLI globally', value: 'installTurbo', selected: false },
      { title: 'Install NestJS CLI globally', value: 'installNestCLI', selected: false },
      { title: 'Install Commitizen globally', value: 'installCommitizen', selected: false },
      { title: 'Disable Turbo telemetry', value: 'disableTelemetry', selected: false },
    ],
    instructions: false,
  })

  if (response.tasks.includes('installTurbo')) {
    run('npm install -g turbo', 'Installing Turbo CLI')
  }

  if (response.tasks.includes('installNestCLI')) {
    run('npm install -g @nestjs/cli', 'Installing NestJS CLI')
  }

  if (response.tasks.includes('installCommitizen')) {
    run('npm install -g commitizen', 'Installing Commitizen globally')
  }

  if (response.tasks.includes('disableTelemetry')) {
    run('npx turbo telemetry disable', 'Disabling Turbo telemetry')
  }

  console.log('\n🎉 Repository setup is complete!\n')
}

setup()
