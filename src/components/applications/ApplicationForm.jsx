import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS } from '../../utils/constants';
import { toInputDate } from '../../utils/dateHelpers';

const schema = yup.object().shape({
  company: yup.string().required('Company name is required').min(2, 'Min 2 characters'),
  role: yup.string().required('Role is required').min(2, 'Min 2 characters'),
  location: yup.string(),
  salary: yup
    .number()
    .transform((value, original) => (original === '' ? undefined : value))
    .nullable()
    .positive('Salary must be positive')
    .typeError('Enter a valid number'),
  platform: yup.string(),
  status: yup.string().required('Status is required'),
  appliedDate: yup.string().required('Applied date is required'),
  interviewDate: yup.string(),
  notes: yup.string().max(500, 'Max 500 characters'),
});

const ApplicationForm = ({ defaultValues, onSubmit, isEdit = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: '',
      role: '',
      location: '',
      salary: '',
      platform: '',
      status: '',
      appliedDate: '',
      interviewDate: '',
      notes: '',
      ...defaultValues,
      appliedDate: defaultValues?.appliedDate
        ? toInputDate(defaultValues.appliedDate)
        : '',
      interviewDate: defaultValues?.interviewDate
        ? toInputDate(defaultValues.interviewDate)
        : '',
    },
  });

  const handleFormSubmit = async (data) => {
    const formatted = {
      ...data,
      salary: data.salary ? Number(data.salary) : null,
      appliedDate: data.appliedDate ? new Date(data.appliedDate).toISOString() : new Date().toISOString(),
      interviewDate: data.interviewDate ? new Date(data.interviewDate).toISOString() : '',
    };
    await onSubmit(formatted);
    if (!isEdit) reset();
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Company Name *"
          placeholder="e.g. Google"
          error={errors.company?.message}
          {...register('company')}
        />
        <Input
          label="Role *"
          placeholder="e.g. Frontend Developer"
          error={errors.role?.message}
          {...register('role')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Select
          label="Location Type"
          placeholder="Select type"
          options={LOCATION_OPTIONS}
          error={errors.location?.message}
          {...register('location')}
        />
        <Input
          label="Salary (₹ / Year)"
          type="number"
          placeholder="e.g. 1200000"
          error={errors.salary?.message}
          {...register('salary')}
        />
        <Select
          label="Platform"
          placeholder="Select platform"
          options={PLATFORM_OPTIONS}
          error={errors.platform?.message}
          {...register('platform')}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Select
          label="Status *"
          options={STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />
        <Input
          label="Applied Date *"
          type="date"
          error={errors.appliedDate?.message}
          {...register('appliedDate')}
        />
        <Input
          label="Interview Date"
          type="date"
          error={errors.interviewDate?.message}
          {...register('interviewDate')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-surface-700 mb-1.5">
          Notes
        </label>
        <textarea
          {...register('notes')}
          placeholder="Any additional notes about this application..."
          rows={3}
          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all duration-200 outline-none resize-none
            ${
              errors.notes
                ? 'border-danger-500 bg-danger-100/30'
                : 'border-surface-200 bg-white focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300'
            }
            placeholder:text-surface-400`}
        />
        {errors.notes && (
          <p className="text-xs text-danger-500 font-medium mt-1">{errors.notes.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? 'Update Application' : 'Add Application'}
        </Button>
        {!isEdit && (
          <Button variant="secondary" onClick={() => reset()}>
            Reset
          </Button>
        )}
      </div>
    </motion.form>
  );
};

export default ApplicationForm;
