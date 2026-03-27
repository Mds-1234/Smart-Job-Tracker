import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  HiOutlineStar,
  HiStar,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineCurrencyRupee,
} from 'react-icons/hi';
import Badge from '../ui/Badge';
import { getStatusLabel, getCompanyLogo, formatCurrency } from '../../utils/constants';
import { formatDate } from '../../utils/dateHelpers';

const statusVariantMap = {
  applied: 'info',
  interview: 'warning',
  offer: 'success',
  rejected: 'danger',
};

const ApplicationCard = ({ application, onToggleBookmark, onDelete }) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);

  const {
    id,
    company,
    role,
    location,
    salary,
    platform,
    status,
    appliedDate,
    bookmarked,
  } = application;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-surface-100 p-5 cursor-default group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-surface-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-surface-100">
            {!imgError ? (
              <img
                src={getCompanyLogo(company)}
                alt={company}
                className="w-full h-full object-contain p-1"
                onError={() => setImgError(true)}
              />
            ) : (
              <span className="text-sm font-bold text-surface-400">
                {company.charAt(0)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-surface-900 truncate">
              {company}
            </h3>
            <p className="text-xs text-surface-500 truncate">{role}</p>
          </div>
        </div>

        <button
          onClick={() => onToggleBookmark(id)}
          className="p-1 cursor-pointer hover:scale-110 transition-transform"
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          {bookmarked ? (
            <HiStar className="w-5 h-5 text-yellow-400" />
          ) : (
            <HiOutlineStar className="w-5 h-5 text-surface-300 group-hover:text-surface-400" />
          )}
        </button>
      </div>

      {/* Meta */}
      <div className="space-y-1.5 mb-4">
        {location && (
          <div className="flex items-center gap-1.5 text-xs text-surface-500">
            <HiOutlineLocationMarker className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{location}</span>
          </div>
        )}
        {salary && (
          <div className="flex items-center gap-1.5 text-xs text-surface-500">
            <HiOutlineCurrencyRupee className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{formatCurrency(salary)}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <HiOutlineCalendar className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Applied {formatDate(appliedDate)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-surface-100">
        <div className="flex items-center gap-2">
          <Badge variant={statusVariantMap[status] || 'default'}>
            {getStatusLabel(status)}
          </Badge>
          {platform && (
            <span className="text-[11px] text-surface-400 font-medium">
              via {platform}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => navigate(`/applications/${id}`)}
            className="p-1.5 rounded-lg hover:bg-surface-100 transition-colors cursor-pointer"
            title="Edit"
          >
            <HiOutlinePencil className="w-3.5 h-3.5 text-surface-400" />
          </button>
          <button
            onClick={() => onDelete(id)}
            className="p-1.5 rounded-lg hover:bg-danger-100 transition-colors cursor-pointer"
            title="Delete"
          >
            <HiOutlineTrash className="w-3.5 h-3.5 text-surface-400 hover:text-danger-500" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ApplicationCard;
