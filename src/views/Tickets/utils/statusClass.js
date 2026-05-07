export function statusClass(status) {
  if (status === 'Candidate') {
    return 'inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap bg-[#40189d] text-white dark:bg-[#7252D3]'
  }

  if (status === 'On-Hold') {
    return 'inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap border border-amber-400 text-amber-600 dark:border-amber-500/70 dark:bg-amber-500/10 dark:text-amber-300'
  }

  return 'inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap border border-gray-300 text-gray-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300'
}
