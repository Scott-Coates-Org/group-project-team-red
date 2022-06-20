[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=8035947&assignment_repo_type=AssignmentRepo)
# React Redux Firebase Starter

## Getting Started

1. Install yarn. `npm install -g yarn`
2. `yarn install`
3. `yarn dev`

### Hosting

1. `npm install -g firebase-tools`
2. `firebase login`
3. `yarn deploy`

### Stuck?

<details>
<summary>
Try This
</summary>

1. Navigate to: <https://console.firebase.google.com/> (make sure you are using the same account as you used for login)
1. Open your project, and navigate to 'Project Overview > Project settings'
1. Scroll down to 'Your apps' section and click on the web-app symbol (</>)
1. Follow the prompts and in the 2nd step, copy down the `const firebaseConfig` section as you will need it soon
1. Navigate to 'Build > Authentication', click 'Get started', and then follow the prompts to setup 'email/password' and 'Google' providers
1. Navigate to 'Build > Firestore Database', click 'Create database', and select 'Start in test mode'
1. Navigate to 'Build > Storage', click 'Get started', and select 'Start in test mode'
1. In the root folder, **copy** `env.local.example` and rename to `env.local` and open it
1. Enter the `authDomain`, `apiKey`, `projectId`, `storageBucket` into `env.local` to their respective variables
1. `yarn dev`
1. Once you can run locally, run `yarn deploy`

</details>

<!---
*** WHEN YOU ARE UP AND RUNNING, DELETE EVERYTHING ABOVE ME EXCEPT THE VERY TOP LINE. ***
*** RENAME THE TOP LINE WITH YOUR PROJECT NAME. ***
-->

## Sprint Progress

We **will** be using issues for the group project. Go to the issues list to manage your progress.
