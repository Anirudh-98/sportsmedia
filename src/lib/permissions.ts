export type UserRole = 'student' | 'coach' | 'school' | 'sponsor' | 'admin';

export type PermissionAction = 'read' | 'write' | 'update' | 'delete';

export type PermissionResource =
  | 'profile'
  | 'courses'
  | 'assignments'
  | 'articles'
  | 'athletes'
  | 'performance'
  | 'events'
  | 'achievements'
  | 'media'
  | 'school_management'
  | 'coach_management'
  | 'sponsorships'
  | 'approvals'
  | 'settings';

export interface RoleResourcePermission {
  read: boolean;
  write: boolean; // Create new records
  update: boolean; // Modify existing records
  delete: boolean; // Remove records
  scope?: string;
  description?: string;
}

/**
 * Complete PRD Role Permission Matrix:
 * Enforces Read, Write (Create), Update, and Delete capabilities per role.
 */
export const ROLE_PERMISSION_MATRIX: Record<
  UserRole,
  Record<PermissionResource, RoleResourcePermission>
> = {
  // 1. STUDENT (Journalist Education & Talent Development)
  student: {
    profile: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'View and edit own profile only',
    },
    courses: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'Learn and view enrolled courses and video materials',
    },
    assignments: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Submit assignments and edit own pending submissions',
    },
    articles: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own_drafts',
      description: 'Write drafts and submit for moderation; view published',
    },
    athletes: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View talent profiles for journalism and reporting',
    },
    performance: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View performance data for analysis and articles',
    },
    events: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View upcoming competitions to apply for media coverage',
    },
    achievements: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View verified records and medals',
    },
    media: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Upload match photos, interview videos, and portfolio items',
    },
    school_management: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No access',
    },
    coach_management: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No access',
    },
    sponsorships: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View sponsorship initiatives and opportunities',
    },
    approvals: {
      read: false,
      write: true,
      update: false,
      delete: false,
      scope: 'submit_only',
      description: 'Submit articles and assignments for admin review',
    },
    settings: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No platform settings access',
    },
  },

  // 2. COACH (Athlete Roster, Performance, Achievements & Media)
  coach: {
    profile: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Manage personal coaching credentials and academy affiliations',
    },
    courses: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No journalism course access',
    },
    assignments: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No journalism assignment access',
    },
    articles: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'Read published sports media coverage',
    },
    athletes: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'coached',
      description: 'Enroll athletes and manage roster and contact details',
    },
    performance: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'coached',
      description: 'Log and update timing, medals, scores, and readiness stats',
    },
    events: {
      read: true,
      write: true,
      update: true,
      delete: false,
      description: 'Register athletes for events and submit participation schedules',
    },
    achievements: {
      read: true,
      write: true,
      update: true,
      delete: false,
      description: 'Record tournament podiums, medals, and state selections',
    },
    media: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Upload athlete action photos, certificates, and proof videos',
    },
    school_management: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No institutional management access',
    },
    coach_management: {
      read: true,
      write: false,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Update own coaching bio and sports disciplines',
    },
    sponsorships: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No direct sponsor program creation',
    },
    approvals: {
      read: false,
      write: true,
      update: false,
      delete: false,
      scope: 'submit_only',
      description: 'Submit athlete enrollments and certificates for admin verification',
    },
    settings: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No platform settings access',
    },
  },

  // 3. SCHOOL (Institutional Sports Management, Coaches, Teams & Stories)
  school: {
    profile: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Manage school profile, contact persons, and sports infrastructure',
    },
    courses: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No journalism course access',
    },
    assignments: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No journalism assignment access',
    },
    articles: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'school_stories',
      description: 'Publish and update school sports press releases and stories',
    },
    athletes: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'school_enrolled',
      description: 'Manage school student athletes roster across all standards',
    },
    performance: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'school_enrolled',
      description: 'Track inter-school performance metrics and discipline breakdown',
    },
    events: {
      read: true,
      write: true,
      update: true,
      delete: false,
      description: 'Host and schedule inter-school tournaments and sports meets',
    },
    achievements: {
      read: true,
      write: true,
      update: true,
      delete: false,
      description: 'Record institutional sports trophies and state honors',
    },
    media: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Upload school tournament galleries and ceremony videos',
    },
    school_management: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Configure sports curriculum, facility hours, and team rosters',
    },
    coach_management: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'school_coaches',
      description: 'Appoint, assign, and evaluate PET masters and sports coaches',
    },
    sponsorships: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View grassroots sponsorship opportunities for school teams',
    },
    approvals: {
      read: false,
      write: true,
      update: false,
      delete: false,
      scope: 'submit_only',
      description: 'Submit institutional verification and inter-school events for review',
    },
    settings: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No platform settings access',
    },
  },

  // 4. SPONSOR (Discover Talent, Support Programs & Track Measurable Impact)
  sponsor: {
    profile: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Manage CSR/Brand profile, logo, and sponsorship focus areas',
    },
    courses: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No access',
    },
    assignments: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No access',
    },
    articles: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'Read published media featuring sponsored talent',
    },
    athletes: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'Discover emerging athletes by sport, state, and achievement tier',
    },
    performance: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'Audit verified athlete progress and tournament statistics',
    },
    events: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View calendar of sponsored competitions and tournaments',
    },
    achievements: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'Review medals won by supported athletes',
    },
    media: {
      read: true,
      write: false,
      update: false,
      delete: false,
      description: 'View athlete training and competition media proofs',
    },
    school_management: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No access',
    },
    coach_management: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No access',
    },
    sponsorships: {
      read: true,
      write: true,
      update: true,
      delete: false,
      scope: 'own',
      description: 'Pledge funding, sponsor athletes, and update grant allocations',
    },
    approvals: {
      read: false,
      write: true,
      update: false,
      delete: false,
      scope: 'submit_only',
      description: 'Submit sponsorship agreements and fund allocations for admin clearance',
    },
    settings: {
      read: false,
      write: false,
      update: false,
      delete: false,
      description: 'No platform settings access',
    },
  },

  // 5. ADMIN (Super Admin Ecosystem Control, Moderation, Approvals & Full Access)
  admin: {
    profile: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Full ecosystem profile access and user role adjustments',
    },
    courses: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Manage curriculum, lessons, modules, and instructors',
    },
    assignments: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Review submissions, assign grades, and provide feedback',
    },
    articles: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Full moderation: approve, reject, edit, publish, or remove articles',
    },
    athletes: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Full athlete database management and verification',
    },
    performance: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Full audit and override of performance metrics and rankings',
    },
    events: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Create, sanction, publish, and delete sports tournaments',
    },
    achievements: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Certify and audit national/state/district sports records',
    },
    media: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Moderate uploaded media, flag copyright/guideline breaches',
    },
    school_management: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Verify school registrations and accreditation status',
    },
    coach_management: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Verify coach credentials, licenses, and background checks',
    },
    sponsorships: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Oversee CSR programs, audit escrow disbursements, approve sponsors',
    },
    approvals: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Live queue: approve, reject, or request changes on all platform items',
    },
    settings: {
      read: true,
      write: true,
      update: true,
      delete: true,
      description: 'Full platform settings, roles, security, and integration control',
    },
  },
};

/**
 * Checks whether a given role has permission to perform an action on a resource.
 */
export function checkPermission(
  role: UserRole | null | undefined,
  resource: PermissionResource,
  action: PermissionAction
): boolean {
  if (!role) {
    // Unauthenticated public visitors can only read public content
    if (action === 'read') {
      return [
        'articles',
        'courses',
        'events',
        'athletes',
        'achievements',
        'media',
        'sponsorships',
      ].includes(resource);
    }
    // Allow initial account registration and submitting approval requests
    if (action === 'write') {
      return ['profile', 'approvals'].includes(resource);
    }
    return false;
  }

  const roleConfig = ROLE_PERMISSION_MATRIX[role];
  if (!roleConfig) return false;

  const resPerm = roleConfig[resource];
  if (!resPerm) return false;

  return !!resPerm[action];
}

/**
 * Returns the human-readable summary of permissions for a role.
 */
export function getRolePermissionSummary(role: UserRole): {
  role: UserRole;
  canRead: PermissionResource[];
  canWrite: PermissionResource[];
  canUpdate: PermissionResource[];
  canDelete: PermissionResource[];
} {
  const config = ROLE_PERMISSION_MATRIX[role];
  const canRead: PermissionResource[] = [];
  const canWrite: PermissionResource[] = [];
  const canUpdate: PermissionResource[] = [];
  const canDelete: PermissionResource[] = [];

  (Object.keys(config) as PermissionResource[]).forEach((res) => {
    if (config[res].read) canRead.push(res);
    if (config[res].write) canWrite.push(res);
    if (config[res].update) canUpdate.push(res);
    if (config[res].delete) canDelete.push(res);
  });

  return { role, canRead, canWrite, canUpdate, canDelete };
}
