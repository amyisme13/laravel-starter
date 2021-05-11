/* eslint-disable */

export {};

import ziggy from 'ziggy-js';

declare global {
  interface Window {
    route: typeof ziggy;
  }

  namespace Inertia {
    interface User {
      id: number;
      name: string;
      email: string;
      profile_photo_path: string;
      profile_photo_url: string;
      two_factor_enabled: boolean;
    }

    // Shared page props
    interface PageProps {
      jetstream: {
        canManageTwoFactorAuthentication: boolean;
        canUpdatePassword: boolean;
        canUpdateProfileInformation: boolean;
        flash?: {
          banner?: string;
          bannerStyle?: string;
          token?: string;
        };
        hasAccountDeletionFeatures: boolean;
        hasApiFeatures: boolean;
        hasTermsAndPrivacyPolicyFeature: boolean;
        managesProfilePhotos: boolean;
      };
      errorBags?: Record<string, Record<string, string[]>> | [];
      errors: Record<string, Record<string, string> | string>;
      user?: User;
    }
  }
}
