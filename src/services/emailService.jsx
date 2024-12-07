import React from 'react';
import toast from 'react-hot-toast';

const ToastContent = ({ email, passwordSetupLink }) => (
  <div className="p-4">
    <p className="font-medium mb-2">Development Mode:</p>
    <p className="text-sm mb-2">Password setup link would be emailed to: {email}</p>
    <a 
      href={passwordSetupLink}
      className="text-primary hover:text-primary-light text-sm underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      View Password Setup Link
    </a>
  </div>
);

export const emailService = {
  sendInvitation: async (user) => {
    try {
      // In a real application, this would make an API call to your backend
      console.log('Sending invitation email to:', user.email);
      
      const token = Math.random().toString(36).substring(2);
      const passwordSetupLink = `${window.location.origin}/set-password/${token}`;
      
      const emailContent = {
        to: user.email,
        subject: 'Welcome to DSM.Promo Portal - Set Up Your Account',
        body: `
          Hello ${user.name},

          You have been invited to join DSM.Promo Portal as an ${user.role.replace('_', ' ')}.
          Please click the link below to set up your password and activate your account:

          ${passwordSetupLink}

          This link will expire in 24 hours.

          Best regards,
          DSM.Promo Team
        `
      };

      // Show success notification
      toast.success('Invitation sent successfully!');
      
      // Show development mode information
      toast(
        (t) => (
          <ToastContent 
            email={user.email} 
            passwordSetupLink={passwordSetupLink} 
          />
        ),
        { duration: 10000 }
      );

      return true;
    } catch (error) {
      console.error('Error sending invitation:', error);
      toast.error('Failed to send invitation email');
      return false;
    }
  }
};