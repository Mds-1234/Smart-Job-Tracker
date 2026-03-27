import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';

const SearchBar = ({ value, onChange, placeholder = 'Search applications...' }) => {
  return (
    <div className="relative w-full max-w-md">
      <HiOutlineSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-surface-200 text-sm bg-white outline-none
          focus:border-primary-400 focus:ring-2 focus:ring-primary-500/10
          hover:border-surface-300 transition-all duration-200 placeholder:text-surface-400"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md hover:bg-surface-100 transition-colors cursor-pointer"
        >
          <HiOutlineX className="w-3.5 h-3.5 text-surface-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
