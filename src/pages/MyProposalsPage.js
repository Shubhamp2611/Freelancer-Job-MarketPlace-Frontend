import React from 'react';
import FreelancerProposals from '../components/proposals/FreelancerProposals';
import ClientProposalsList from '../components/proposals/ClientProposalsList';

const MyProposalsPage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Show appropriate component based on user role
  if (user.role === 'CLIENT') {
    return <ClientProposalsList />;
  }

  return <FreelancerProposals />;
};

export default MyProposalsPage;