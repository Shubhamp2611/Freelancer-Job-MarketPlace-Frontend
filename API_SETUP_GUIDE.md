# API Configuration & Setup Guide

## Updated API Files

### 1. **axiosConfig.js**
✅ **Updated to match backend port (8080)**

Changes:
- Changed API base URL from `http://localhost:10000/api` to `http://localhost:8080/api`
- Added environment variable support: `process.env.REACT_APP_API_URL`
- Maintains request/response interceptors for token management
- Handles 401 unauthorized responses with automatic logout

```javascript
// How to use different API URLs
Development: REACT_APP_API_URL=http://localhost:8080/api
Production: REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

### 2. **authAPI.js**
✅ **Added refreshToken method**

Endpoints:
- `login(credentials)` - Authenticate user
- `register(userData)` - Create new account
- `forgotPassword(email)` - Request password reset
- `resetPassword(data)` - Reset password with token
- `refreshToken(refreshToken)` - Get new access token
- `getCurrentUser()` - Get authenticated user profile

---

### 3. **jobAPI.js**
✅ **Enhanced search with sort parameters**

Endpoints:
- `getOpenJobs()` - Public jobs
- `getMyJobs()` - Client's posted jobs
- `getAllJobs()` - All jobs (admin)
- `getJobById(id)` - Single job details
- `createJob(data)` - Post new job
- `updateJob(id, data)` - Edit job
- `deleteJob(id)` - Remove job
- `searchJobs(keyword, page, size, sortBy, direction)` - Search with sorting

---

### 4. **proposalAPI.js**
✅ **Complete and verified**

Endpoints:
- `submitProposal(data)` - Submit proposal for job
- `getProposalById(id)` - Get single proposal
- `getProposalsForJob(jobId)` - Get all proposals for job
- `getMyProposals()` - Get freelancer's proposals
- `acceptProposal(id, message)` - Accept proposal (creates contract)
- `rejectProposal(id, message)` - Reject proposal
- `withdrawProposal(id)` - Withdraw proposal

---

### 5. **contractAPI.js**
✅ **Complete with milestone tracking**

Endpoints:
- `getMyContracts()` - Get user's contracts
- `createContract(data)` - Create contract from proposal
- `getContractById(id)` - Get contract details
- `fundEscrow(id)` - Client funds job budget
- `getMilestones(id)` - Get contract milestones
- `submitMilestone(milestoneId, deliverables)` - Freelancer submits work
- `approveMilestone(milestoneId, feedback)` - Client approves
- `requestRevision(milestoneId, feedback)` - Request changes
- `completeContract(id, rating, review)` - Finalize contract
- `submitReview(id, rating, review)` - Submit review
- `sendMessage(id, message)` - Send contract message
- `getMessages(id)` - Get conversation history

---

### 6. **paymentAPI.js**
✅ **Added releaseMilestone method**

Endpoints:
- `createEscrowPayment(contractId, clientId)` - Fund escrow
- `releaseMilestone(contractId, milestoneId, clientId)` - Release milestone payment
- `getPaymentHistory(userId)` - Get payment history
- `withdrawEarnings(freelancerId, amount)` - Withdraw freelancer earnings

---

### 7. **adminAPI.js**
✅ **Verified and updated**

Endpoints:
- `getDashboardStats()` - Platform overview
- `getFinancialReport()` - Revenue and financial data
- `getUsers()` - All users list

---

## Environment Setup

### .env File
Created `.env` file in frontend root:

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_DEBUG=false
REACT_APP_ENV=development
```

### To use in your React code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## Test Credentials

All credentials are initialized by your backend's DatabaseInitializer:

### Admin Account
- **Email**: admin@marketplace.com
- **Password**: admin123
- **Role**: ADMIN
- **Access**: Full platform management

### Client Account
- **Email**: client@example.com
- **Password**: client123
- **Role**: CLIENT
- **Access**: Post jobs, manage proposals, handle payments

### Freelancer Account
- **Email**: freelancer@example.com
- **Password**: freelancer123
- **Role**: FREELANCER
- **Access**: Browse jobs, submit proposals, track contracts

---

## Testing Your Setup

### 1. Quick Connection Test

Run in browser console or in a component:

```javascript
import { testBackendConnection } from './api/testConnection';

// Run the test
testBackendConnection().then(results => {
  console.log('Connection test results:', results);
});
```

### 2. Test Specific Endpoints

```javascript
import { testEndpoint, debugAPICall } from './api/testConnection';

// Test jobs endpoint
testEndpoint('GET', '/jobs/open').then(result => {
  console.log(result);
});

// Debug login
debugAPICall('POST', '/auth/login', {
  email: 'client@example.com',
  password: 'client123'
});
```

### 3. Using Test Credentials

```javascript
import TEST_CREDENTIALS from './api/TEST_CREDENTIALS';

// Access credentials
console.log(TEST_CREDENTIALS.client.email);
console.log(TEST_CREDENTIALS.freelancer.password);
```

---

## Typical Testing Workflow

### Step 1: Post a Job (Client)
1. Login with client@example.com / client123
2. Go to Dashboard → Post New Job
3. Fill in job details and post

### Step 2: Submit Proposal (Freelancer)
1. Login with freelancer@example.com / freelancer123
2. Go to Browse Jobs
3. Find the posted job and submit proposal

### Step 3: Accept Proposal (Client)
1. Go back to client account
2. View pending proposals
3. Accept freelancer's proposal (creates contract)

### Step 4: Fund Escrow (Client)
1. Go to active contracts
2. Fund escrow with job budget

### Step 5: Submit Milestone (Freelancer)
1. Go to active contracts
2. Submit milestone deliverables

### Step 6: Approve Milestone (Client)
1. Review deliverables
2. Approve milestone (releases payment)

### Step 7: Complete Contract (Both)
1. Freelancer completes work
2. Client approves and completes contract
3. Both submit reviews and ratings

---

## Common Issues & Solutions

### Issue: "Cannot find API URL"
**Solution**: Make sure `.env` file is in frontend root directory and restart React dev server

### Issue: "401 Unauthorized"
**Solution**: 
- Login again to refresh token
- Check localStorage for `token` key
- Ensure backend token endpoint is working

### Issue: "CORS Error"
**Solution**:
- Backend must have CORS enabled for `http://localhost:3000`
- Check backend `@CrossOrigin` annotations

### Issue: "POST/PUT requests failing"
**Solution**:
- Check request header `Content-Type: application/json`
- Verify query parameters are URL encoded
- Check backend expects multipart or formdata vs JSON

---

## API Request Examples

### Login Request
```javascript
POST /auth/login
Content-Type: application/json

{
  "email": "client@example.com",
  "password": "client123"
}

Response:
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "email": "client@example.com"
}
```

### Create Job Request
```javascript
POST /jobs
Content-Type: application/json
Authorization: Bearer {accessToken}

{
  "title": "Build a Mobile App",
  "description": "I need iOS and Android apps",
  "budget": 5000,
  "deadline": "2026-03-15",
  "category": "Mobile Development",
  "type": "FIXED_PRICE"
}
```

### Submit Proposal Request
```javascript
POST /proposals
Content-Type: application/json
Authorization: Bearer {accessToken}

{
  "jobId": 1,
  "proposedAmount": 4500,
  "timeline": "30 days",
  "coverLetter": "I have 5 years of mobile app experience..."
}
```

---

## Files Created/Updated

✅ Created:
- `.env` - Environment variables
- `src/api/testConnection.js` - Connection testing utilities
- `src/api/TEST_CREDENTIALS.js` - Test account documentation

✅ Updated:
- `src/api/axiosConfig.js` - Port changed to 8080
- `src/api/authAPI.js` - Added refreshToken
- `src/api/jobAPI.js` - Enhanced search parameters
- `src/api/paymentAPI.js` - Added releaseMilestone
- `src/api/adminAPI.js` - Standardized method names

✅ Verified (No changes needed):
- `src/api/proposalAPI.js`
- `src/api/contractAPI.js`

---

## Next Steps

1. **Start your backend**: `java -jar your-app.jar` (port 8080)
2. **Start your frontend**: `npm start` (port 3000)
3. **Test connection**: Run `testBackendConnection()` in console
4. **Login**: Use any of the test credentials
5. **Test workflow**: Follow the testing workflow above

---

## Support

For issues:
1. Check console errors
2. Run `testBackendConnection()` to diagnose
3. Verify backend is running on port 8080
4. Check `.env` file is configured correctly
5. Inspect network tab in DevTools for request/response details
