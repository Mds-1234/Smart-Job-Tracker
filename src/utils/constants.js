// Status options for job applications
export const STATUS_OPTIONS = [
  { value: 'applied', label: 'Applied', color: 'bg-info-100 text-info-500' },
  { value: 'interview', label: 'Interview', color: 'bg-warning-100 text-warning-500' },
  { value: 'offer', label: 'Offer', color: 'bg-success-100 text-success-500' },
  { value: 'rejected', label: 'Rejected', color: 'bg-danger-100 text-danger-500' },
];

// Platform options
export const PLATFORM_OPTIONS = [
  'LinkedIn',
  'Indeed',
  'Glassdoor',
  'AngelList',
  'Company Website',
  'Referral',
  'Naukri',
  'Internshala',
  'Other',
];

// Location type options
export const LOCATION_OPTIONS = ['Remote', 'On-site', 'Hybrid'];

// Sort options
export const SORT_OPTIONS = [
  { value: 'appliedDate-desc', label: 'Newest First' },
  { value: 'appliedDate-asc', label: 'Oldest First' },
  { value: 'salary-desc', label: 'Salary: High to Low' },
  { value: 'salary-asc', label: 'Salary: Low to High' },
  { value: 'company-asc', label: 'Company: A-Z' },
  { value: 'company-desc', label: 'Company: Z-A' },
];

// Pipeline tabs
export const PIPELINE_TABS = [
  { value: 'all', label: 'All Applications' },
  { value: 'applied', label: 'Applied' },
  { value: 'interview', label: 'Interview Scheduled' },
  { value: 'offer', label: 'Offer Received' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'bookmarked', label: '⭐ Bookmarked' },
];

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
};

// Get status color classes
export const getStatusColor = (status) => {
  const found = STATUS_OPTIONS.find((s) => s.value === status);
  return found ? found.color : 'bg-surface-100 text-surface-500';
};

// Get status label
export const getStatusLabel = (status) => {
  const found = STATUS_OPTIONS.find((s) => s.value === status);
  return found ? found.label : status;
};

// Format currency
export const formatCurrency = (amount) => {
  if (!amount) return '—';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get company logo URL
export const getCompanyLogo = (companyName) => {
  const domain = companyName
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '');
  return `https://logo.clearbit.com/${domain}.com`;
};
