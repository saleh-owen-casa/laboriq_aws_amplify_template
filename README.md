# AWS Amplify Angular Contact Management App

This is a complete Angular.js/NodeJS application using AWS Amplify v2, DynamoDB, Lambda, and REST API for contact management.

## Features

- **Contact Management**: Create, view, and manage contact records
- **DynamoDB Storage**: Non-SQL database using AWS DynamoDB
- **REST API**: Anonymous/guest access endpoints for contact operations
- **Modern UI**: Responsive Angular interface with forms and modals
- **Real-time Updates**: Live contact list updates using Amplify Data

## Architecture

### Backend (AWS Amplify v2)
- **DynamoDB Table**: Stores contact records with the following schema:
  - `id` (primary key, auto-generated)
  - `firstName` (required)
  - `lastName` (required)
  - `dateOfBirth` (required)
  - `emailAddress` (required)
  - `phoneNumber` (optional)
  - `homeAddress` (optional)
  - `favoriteColor` (optional)

- **Lambda Functions**:
  - `subscriber-post`: Handles POST requests to create new contacts
  - `subscriber-get`: Handles GET requests to retrieve contact by ID

- **REST API**: Anonymous access endpoints at `/subscriber`

### Frontend (Angular)
- **Contact List**: Displays all contacts with first name, last name, and email
- **Create Contact Form**: Modal form for adding new contacts
- **Contact Details Modal**: Shows complete contact information when clicked
- **Success/Error Messages**: User feedback for operations

## Setup Instructions

### Prerequisites
- Node.js (v18 or later)
- AWS CLI configured
- AWS Amplify CLI installed

### Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Install API Dependencies**:
   ```bash
   cd amplify/api
   npm install
   cd ../..
   ```

3. **Deploy Backend**:
   ```bash
   npx ampx sandbox
   ```

4. **Start Development Server**:
   ```bash
   npm start
   ```

### API Endpoints

#### POST /subscriber
Creates a new contact record.

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "emailAddress": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "homeAddress": "123 Main St, City, State",
  "favoriteColor": "Blue"
}
```

**Response**:
```json
{
  "message": "Contact created successfully",
  "id": "generated-uuid",
  "contact": { ... }
}
```

#### GET /subscriber?id={contactId}
Retrieves a contact by ID.

**Query Parameters**:
- `id`: The contact ID to retrieve

**Response**:
```json
{
  "id": "contact-id",
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "emailAddress": "john.doe@example.com",
  "phoneNumber": "+1234567890",
  "homeAddress": "123 Main St, City, State",
  "favoriteColor": "Blue"
}
```

## Usage

1. **View Contacts**: The main page displays all contacts in a list format
2. **Create Contact**: Click "Create Contact" button to open the form
3. **View Details**: Click on any contact in the list to see full details
4. **Form Validation**: Required fields are marked with asterisks (*)

## File Structure

```
├── amplify/
│   ├── api/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── resource.ts
│   │   ├── subscriber-post.ts
│   │   └── subscriber-get.ts
│   ├── auth/
│   │   └── resource.ts
│   ├── data/
│   │   └── resource.ts
│   └── backend.ts
├── src/
│   └── app/
│       ├── contact/
│       │   ├── contact.ts
│       │   ├── contact.html
│       │   └── contact.css
│       └── ...
└── package.json
```

## Technologies Used

- **Frontend**: Angular 17, TypeScript, HTML5, CSS3
- **Backend**: AWS Amplify v2, AWS Lambda, AWS DynamoDB
- **SDK**: AWS Amplify JavaScript SDK v6
- **Deployment**: AWS Amplify CLI

## Development Notes

- The application uses AWS Amplify Data for real-time contact list updates
- Lambda functions are written in TypeScript and deployed via Amplify
- The UI is fully responsive and includes form validation
- All API endpoints support CORS for cross-origin requests

## Troubleshooting

1. **TypeScript Errors**: Some AWS SDK import errors may appear in the IDE but won't affect runtime functionality
2. **Deployment Issues**: Ensure AWS CLI is properly configured and Amplify sandbox is running
3. **CORS Issues**: The Lambda functions include proper CORS headers for cross-origin requests

## License

This project is licensed under the MIT License.