# E-ommerce-ArmadaLogics
Armada Logics Inc. Final Project ( Front-end E-commerce)

# eCommerce Platform

A front-end responsive eCommerce website.

# Features

1. Product Display
   Each product should have:
   An image
   A title
   A price
   A short description
   An "Add to Cart" button
2. Shopping Cart Functionality

Implement a shopping cart that allows users to:
Add products to the cart.
View the number of items in the cart.
See the total price update dynamically.
Remove items from the cart.

3. Interactive Features
   Include JavaScript event handling for adding/removing items from the cart.
   Show a cart dropdown/modal when the cart is clicked.
   Display a "No items in cart" message when the cart is empty.

4. Creativity and Customization
   Use custom styling and animations to make the website visually appealing.
   Allow users to filter or search for products (if you want to challenge yourself!).
   Add any extra features or design elements that make the site unique.

# 🛠️ Tech Stack

- Frontend: HTML, CSS (Bootstrap), JavaScript

# Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ecommerce-platform.git
   cd ecommerce-platform
   ```

## Branchin Instruction:

All developers joining any project on Armada Logics follow these branching instructions for better streamline process and collaboration.
Engineering Leads(EL) /Team Leaders (TL) will have a Forked Repository of the Project from our Armada Logics Github account. They will add team members as collaborators on their Forked Repository and the team members will create their own Fork from their leaders Repository.

Steps on working a project and starting a feature:

1.  Fork the repository

    Clone your project locally from your Forked Repository
    In Github, do a Pull Request (PR) from:

    TL - (Main repo) main:develop branch to your (Forked repo) fork:develop branch.

    Team Members - (TL repo) tl_repo:develop branch to your (Forked repo) fork:develop branch.

    The message “Able to merge. These branches can be automatically merged.” should appear if PR can be merged without conflicts.

    \*Note: PR is just like git merge, the only difference is that you're requesting approval for you to merge your changes.

2.  Create a feature branch

    Locally, create a feature branch from your fork:develop branch to work on a new feature.
    Commands to create a feature branch:

    ```js
    /* Move to develop branch */
    git checkout develop

    /* Update the develop branch of your fork by getting the updated codes from main repo */
    git pull forked_repo develop

    /* Create a new local branch from your develop branch */
    git checkout -b feature_branch_name
    ```

3.  Proceed with the FE/BE development of the feature.

    Code. Code. Code.

4.  Commands to push your added or modified files to the feature branch:

    ```js
    /* Check all the modified files */
    git status

    /* If all modified files should be added */
    git add .
    *Note: Make sure to not add files with sensitive information(keys, password, etc…)

    /* Adding of files one at a time*/
    git add file_directory_and_name

    /* Adding of multiple files (separated by space) */
    git add file_directory_and_name1 file_directory_and_name2 file_directory_and_name3

    /* Double check and review the added files */
    git status

    /* Commit your added files */
    git commit -m "Your commit message"

    /* Push your added files to the feature branch */
    git push forked_repo feature_branch_name
    ```

    If you are working with other devs on the same feature, you can also pull changes from each other's Fork via PR in Github. If both FE and BE engineers are working on a feature, one of them will do the final merging of codes and do the PR to the TL’s Forked Repo. Their codes will be reviewed and approved by the TL or designated code reviewers.

5.  Update your feature branch with latest code base

    One important step before doing a PR to the Main Repo and to make sure you have the latest approved changes from other Devs is to Pull the latest codes. In Github, do a PR from the Develop branch of your TL’s Repo to your Forked Repo Develop branch.

        TL_Repo:develop -> Forked_Repo:develop

    Approve the PR then merge it to your feature branch locally.

    Commands to update your feature branch:

    ```js
    /* Move to develop branch */
    git checkout develop

    /* Update your develop branch by pulling the latest codes */
    git pull forked_repo develop

    /* Move to your current/old feature branch */
    git checkout feature_branch_name

    /* Update your feature branch by merging the develop branch to your feature branch.*/
    git merge develop

    /* Note: If there are merge conflicts after the merge, fix it locally */

    /* To push your latest feature branch to your repo, follow the step 4 */
    ```

    ⚠️ In Github, NEVER EVER PR from the Main Repo develop branch to any of your feature branches. If you want to get the latest codes from the develop branch, follow the steps above.

6.  Pushing the feature branch to the Main Repository

    Once you have pushed your codes to the feature branch or your repo, ask your TL for a branch in his repo where you can PR your branch output.

        Forked_Repo:feature_branch -> TL_Repo:feature_branch

    Your TL will do the initial review. If there are comments or adjustments, you should make your adjustments locally and push it to your fork’s feature branch.Once everything is good, your TL will approve the PR.

    After this, your TL or the EL will create a feature branch in the Main Repo where the feature branch will be PRed.

    \*Note: The name of the feature branch in the Main repo is normally appended with the word develop. E.g. (develop_dashboard_redesign, develop_quiz_improvements)

    Your TL will then create a PR of his/her fork’s feature branch to the Main Repo feature branch.

        TL_Repo:feature_branch -> Main_Repo:feature_branch

    Other TLs will then review this PR before being approved and merged.

7.  Pushing the features to the develop

    Your TL will now create a PR to the develop branch.

        Main_Repo:feature_branch  -> Main_Repo:develop

    The EL will review and approve the PR before being merged. Once merged, the develop branch will be PRed to the Main branch for the launching of the feature

        Main_Repo:develop  -> Main_Repo:main
