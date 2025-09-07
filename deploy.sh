#!/bin/bash

echo "🚀 Deploying AWS Amplify Contact Management App"
echo "=============================================="

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ AWS CLI is not installed. Please install it first."
    exit 1
fi

# Check if Amplify CLI is installed
if ! command -v ampx &> /dev/null; then
    echo "❌ AWS Amplify CLI is not installed. Please install it first."
    echo "Run: npm install -g @aws-amplify/cli"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install API dependencies
echo "📦 Installing API dependencies..."
cd amplify/api
npm install
cd ../..

echo "🏗️  Starting Amplify sandbox..."
echo "This will deploy your backend resources to AWS."
echo "Press Ctrl+C to stop the sandbox when you're done testing."

# Start Amplify sandbox
npx ampx sandbox
