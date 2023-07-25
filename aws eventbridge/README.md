# Monthlyt-Credit-Rewards

Welcome! This is a Lambda function project that updates rewards points for every user to 100 on 1st of every month in a MongoDB test database.

## Prerequisites

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org) installed
- [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com) package manager installed
- [AWS CLI](https://aws.amazon.com/cli) installed and configured with appropriate credentials
- [AWS SAM CLI](https://aws.amazon.com/serverless/sam) installed

## Installation

1. Clone the repository:

```bash
git clone <repository_url>

cd <project_directory>

# Please make sure you are in aws eventbridge directory

2.Install dependencies:
bash
npm install
# or if you use Yarn
yarn

3.Set up the environment variables:
Create a .env file in the project directory and add your MongoDB URI:

arduino
MONGOOSE_URI=mongodb://your-mongodb-url

or u can simply copy code from .env.example and Replace mongodb://your-mongodb-url with your actual MongoDB connection URI.

4.Deployment-
bash
sam deploy --guided

Follow the prompts to set up the deployment. The AWS SAM CLI will guide you through the process.


---------------------------------------------PLEASE_NOTE--------------------------------------------

1> After deployment go to your AWS Console Home
2> Open Lambda
3> Select your Function name which you have created and open it
4> After that you will see EventBridge (CloudWatch Events) is automatically in your triggered 
5> Click on Add trigger
6> In Trigger configuration 
    Select a source => EventBridge (CloudWatch Events) => Rule =>Existing rules 
    Now select =>MonthlyUpdateRule
7>Add


Now it will automatically update credites of every user on 1st of every month