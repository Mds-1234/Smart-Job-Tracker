import { STATUS_OPTIONS, PLATFORM_OPTIONS, LOCATION_OPTIONS, SORT_OPTIONS } from '../../utils/constants';

const FilterBar = ({
  statusFilter,
  onStatusFilterChange,
  platformFilter,
  onPlatformFilterChange,
  locationFilter,
  onLocationFilterChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-surface-200 text-xs font-medium bg-white outline-none
          focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300
          transition-all duration-200 appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">All Status</option>
        {STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {/* Platform Filter */}
      <select
        value={platformFilter}
        onChange={(e) => onPlatformFilterChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-surface-200 text-xs font-medium bg-white outline-none
          focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300
          transition-all duration-200 appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">All Platforms</option>
        {PLATFORM_OPTIONS.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>

      {/* Location Filter */}
      <select
        value={locationFilter}
        onChange={(e) => onLocationFilterChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-surface-200 text-xs font-medium bg-white outline-none
          focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300
          transition-all duration-200 appearance-none cursor-pointer min-w-[120px]"
      >
        <option value="">All Locations</option>
        {LOCATION_OPTIONS.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 rounded-xl border border-surface-200 text-xs font-medium bg-white outline-none
          focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10 hover:border-surface-300
          transition-all duration-200 appearance-none cursor-pointer min-w-[140px] ml-auto"
      >
        {SORT_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
