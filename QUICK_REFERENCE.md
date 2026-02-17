# 🚀 QUICK REFERENCE CARD

## 🎯 Backend API Configuration - At a Glance

### API Base URL
```
http://localhost:8080/api
```

### Environment Variables (.env)
```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_DEBUG=false
REACT_APP_ENV=development
```

---

## 🔐 Test Credentials (Login)

```
┌─ ADMIN ──────────────────────────┐
│ Email: admin@marketplace.com      │
│ Pass:  admin123                   │
│ Role:  Full Platform Access       │
└───────────────────────────────────┘

┌─ CLIENT ─────────────────────────┐
│ Email: client@example.com         │
│ Pass:  client123                  │
│ Role:  Post & Manage Jobs         │
└───────────────────────────────────┘

┌─ FREELANCER ──────────────────────┐
│ Email: freelancer@example.com     │
│ Pass:  freelancer123              │
│ Role:  Browse & Apply Jobs        │
└────────────────────────────────────┘
```

---

## 📡 API Endpoints Summary

### 🔓 Auth (No auth required)
```
POST   /auth/login              (email, password)
POST   /auth/register           (userData)
POST   /auth/forgot-password    (email)
POST   /auth/reset-password     (token, newPassword)
GET    /profile/me              - Get current user
```

### 💼 Jobs
```
GET    /jobs/open               - Public jobs
GET    /jobs/my-jobs            - Client's jobs
POST   /jobs                    - Create job
GET    /jobs/{id}               - Job details
PUT    /jobs/{id}               - Edit job
DELETE /jobs/{id}               - Delete job
GET    /jobs/search             - Search jobs
```

### 📝 Proposals
```
POST   /proposals               - Submit proposal
GET    /proposals/my-proposals  - My proposals
GET    /proposals/{id}          - Proposal details
GET    /proposals/job/{jobId}   - Job proposals
PUT    /proposals/{id}/accept   - Accept proposal
PUT    /proposals/{id}/reject   - Reject proposal
PUT    /proposals/{id}/withdraw - Withdraw proposal
```

### 📋 Contracts
```
GET    /contracts/my-contracts  - My contracts
POST   /contracts               - Create contract
GET    /contracts/{id}          - Contract details
PUT    /contracts/{id}/fund-escrow           - Fund job
GET    /contracts/{id}/milestones            - Milestones
PUT    /contracts/milestones/{id}/submit     - Submit work
PUT    /contracts/milestones/{id}/approve    - Approve work
PUT    /contracts/milestones/{id}/request-revision - Request changes
PUT    /contracts/{id}/complete              - Complete job
PUT    /contracts/{id}/review                - Submit review
POST   /contracts/{id}/messages              - Send message
GET    /contracts/{id}/messages              - Get chat
```

### 💳 Payments
```
POST   /payments/escrow/{contractId}         - Fund escrow
POST   /payments/release/{contractId}        - Release payment
GET    /payments/history/{userId}            - Payment history
POST   /payments/withdraw/{freelancerId}     - Withdraw earnings
```

### 👨‍💼 Admin
```
GET    /admin/dashboard         - Platform stats
GET    /admin/financials        - Financial report
GET    /admin/users             - All users
```

---

## 💻 Sample API Calls (JavaScript)

### Login
```javascript
const response = await authAPI.login({
  email: 'client@example.com',
  password: 'client123'
});
localStorage.setItem('token', response.data.accessToken);
```

### Create Job
```javascript
const job = await jobAPI.createJob({
  title: 'Build a Website',
  description: 'I need a responsive website',
  budget: 2500,
  deadline: '2026-03-15',
  category: 'Web Development',
  type: 'FIXED_PRICE'
});
```

### Submit Proposal
```javascript
const proposal = await proposalAPI.submitProposal({
  jobId: 1,
  proposedAmount: 2200,
  timeline: '20 days',
  coverLetter: 'I can help with this...'
});
```

### Accept Proposal (Creates Contract)
```javascript
const contract = await proposalAPI.acceptProposal(
  proposalId,
  'Thanks! Looking forward to working with you.'
);
```

### Fund Escrow
```javascript
await contractAPI.fundEscrow(contractId);
```

### Submit Milestone
```javascript
await contractAPI.submitMilestone(
  milestoneId,
  'Here are the deliverables...'
);
```

### Approve Milestone
```javascript
await contractAPI.approveMilestone(
  milestoneId,
  'Looks great! Payment released.'
);
```

---

## 🧪 Testing in Browser Console

```javascript
// Test connection
import { testBackendConnection } from './api/testConnection';
testBackendConnection();

// Get access credentials
import TEST_CREDENTIALS from './api/TEST_CREDENTIALS';
console.log(TEST_CREDENTIALS);

// Test specific endpoint
import { testEndpoint } from './api/testConnection';
testEndpoint('GET', '/jobs/open');

// Check token
console.log(localStorage.getItem('token'));
```

---

## 🚀 Quick Start Commands

### Windows
```bash
# Run setup script
start.bat

# Or manually
npm install
npm start
```

### macOS / Linux
```bash
# Run setup script
chmod +x start.sh
./start.sh

# Or manually
npm install
npm start
```

---

## 📊 Complete Workflow Example

```
1️⃣  Login
    ↓
    const response = await authAPI.login({
      email: 'client@example.com',
      password: 'client123'
    });
    localStorage.setItem('token', response.data.accessToken);

2️⃣  Client Posts Job
    ↓
    const job = await jobAPI.createJob({ title: '...', ... });

3️⃣  Freelancer Views Jobs
    ↓
    const jobs = await jobAPI.getOpenJobs();

4️⃣  Freelancer Submits Proposal
    ↓
    const proposal = await proposalAPI.submitProposal({
      jobId: job.id,
      proposedAmount: 2200,
      timeline: '20 days',
      coverLetter: '...'
    });

5️⃣  Client Accepts Proposal
    ↓
    const contract = await proposalAPI.acceptProposal(
      proposal.id,
      'Great! Let\'s work together.'
    );

6️⃣  Client Funds Escrow
    ↓
    await contractAPI.fundEscrow(contract.id);

7️⃣  Freelancer Submits Milestone
    ↓
    const milestone = await contractAPI.submitMilestone(
      milestoneId,
      'Completed deliverables'
    );

8️⃣  Client Approves Milestone
    ↓
    await contractAPI.approveMilestone(
      milestone.id,
      'Looks perfect!'
    );

9️⃣  Complete & Review
    ↓
    await contractAPI.completeContract(contractId, 5, 'Great work!');
    await contractAPI.submitReview(contractId, 5, 'Excellent freelancer!');
```

---

## ⚡ Debug Tips

### Check Backend Connection
```javascript
// In browser console:
await fetch('http://localhost:8080/api/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

### View All API Calls
```javascript
// DevTools Network tab
// Filter by XHR/Fetch
// Check headers for Authorization: Bearer {token}
```

### Check Stored Data
```javascript
// In console:
console.log('Token:', localStorage.getItem('token'));
console.log('User:', localStorage.getItem('user'));
```

### Check API Configuration
```javascript
import axiosInstance from './api/axiosConfig';
console.log('API URL:', axiosInstance.defaults.baseURL);
console.log('Headers:', axiosInstance.defaults.headers);
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| Cannot connect to API | Check backend running on :8080 |
| 401 Unauthorized | Login again, check token in localStorage |
| CORS Error | Verify @CrossOrigin in backend |
| 404 Not Found | Check endpoint spelled correctly |
| Changes not loading | Restart npm start, clear cache |
| .env not working | Restart React dev server after editing |

---

## 📚 Full Documentation Files

- **API_SETUP_GUIDE.md** - Complete API reference
- **INTEGRATION_EXAMPLES.js** - 12 working code examples
- **SETUP_COMPLETE.md** - Setup checklist
- **TEST_CREDENTIALS.js** - Credentials documentation
- **testConnection.js** - Connection testing utilities

---

## ✅ Verification Checklist

- [ ] Backend running on http://localhost:8080
- [ ] Frontend .env configured
- [ ] Can run `testBackendConnection()` successfully
- [ ] Can login with test credentials
- [ ] Token appears in localStorage
- [ ] API requests visible in DevTools Network tab

---

## 🎮 Full Feature Checklist

### Core Features
- ✅ User authentication (3 roles)
- ✅ Job management (CRUD)
- ✅ Proposals system
- ✅ Contract creation & management
- ✅ Milestone tracking
- ✅ Escrow payments
- ✅ Message/chat system
- ✅ Reviews & ratings
- ✅ Admin dashboard

### Frontend Features  
- ✅ Dark/light mode
- ✅ Toast notifications
- ✅ Loading skeletons
- ✅ Error handling
- ✅ Protected routes
- ✅ Redux state management
- ✅ React Query integration
- ✅ Dashboard pages

---

## 📞 Need Help?

1. **Connection Issues**: Run `testBackendConnection()`
2. **API Responses**: Check Network tab (DevTools → Network)
3. **Debugging**: Use `debugAPICall()` from testConnection.js
4. **Examples**: See INTEGRATION_EXAMPLES.js
5. **Full Docs**: Read API_SETUP_GUIDE.md

---

**Last Updated:** February 15, 2026
**Status:** ✅ Ready for Development
