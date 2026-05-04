export function statusClass(status) {
  if (status === 'Candidate') {
    return 'inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap bg-[#40189d] text-white'
  }

  if (status === 'On-Hold') {
    return 'inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap border border-amber-400 text-amber-600'
  }

  return 'inline-flex items-center justify-center px-3.5 py-1 rounded-full text-[0.7rem] font-semibold whitespace-nowrap border border-gray-300 text-gray-500'
}
