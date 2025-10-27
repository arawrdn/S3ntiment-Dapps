import React from "react";

export default function VoteCard({ questionData, onVoteYes, onVoteNo, loading }) {
  return (
    <div className="rounded-xl p-6 bg-white/95 shadow-lg">
      <div className="text-xs text-gray-500 mb-2">Question #{questionData.id}</div>
      <h2 className="text-lg font-extrabold leading-snug mb-4">{questionData.question || 'No active question'}</h2>

      <div className="flex items-center gap-4">
        <button onClick={() => onVoteYes()} className="flex-1 py-3 rounded-lg font-bold shadow" style={{ background: 'linear-gradient(90deg,#ff9ccf,#95ffd1)' }}>
          {loading ? 'Waiting...' : 'Yes'}
        </button>
        <button onClick={() => onVoteNo()} className="flex-1 py-3 rounded-lg font-bold shadow" style={{ background: 'linear-gradient(90deg,#d1ffd9,#ffd1e6)' }}>
          {loading ? 'Waiting...' : 'No'}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-600 flex gap-4">
        <div>✅ Yes: <span className="font-semibold">{questionData.yes}</span></div>
        <div>❌ No: <span className="font-semibold">{questionData.no}</span></div>
      </div>
    </div>
  );
}
