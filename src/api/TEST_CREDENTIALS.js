// Test Credentials Documentation
// These credentials match your backend DatabaseInitializer

/**
 * TEST ACCOUNTS
 * All passwords: {role}123 (e.g., admin123, client123)
 */

export const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@marketplace.com',
    password: 'admin123',
    role: 'ADMIN',
    description: 'Administrator with full platform access'
  },
  client: {
    email: 'client@example.com',
    password: 'client123',
    role: 'CLIENT',
    description: 'Client user for posting jobs and managing projects'
  },
  freelancer: {
    email: 'freelancer@example.com',
    password: 'freelancer123',
    role: 'FREELANCER',
    description: 'Freelancer user for browsing and accepting jobs'
  }
};

/**
 * QUICK REFERENCE
 * 
 * 1. Admin Dashboard: Login with admin@marketplace.com
 *    - View all users, jobs, contracts
 *    - Monitor platform metrics
 *    - Manage platform settings
 * 
 * 2. Client Dashboard: Login with client@example.com
 *    - Post and manage jobs
 *    - Review freelancer proposals
 *    - Manage contracts and payments
 * 
 * 3. Freelancer Dashboard: Login with freelancer@example.com
 *    - Browse available jobs
 *    - Submit proposals
 *    - Manage contracts and milestones
 * 
 * TESTING WORKFLOW:
 * 1. Client: Post a new job
 * 2. Freelancer: Browse jobs and submit a proposal
 * 3. Client: Accept the proposal (creates contract)
 * 4. Client: Fund escrow with job budget
 * 5. Freelancer: Submit milestone deliverables
 * 6. Client: Approve milestone (releases payment)
 * 7. Both: Complete contract and submit reviews
 */

// Export for use in test files
export default TEST_CREDENTIALS;
